
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const projectName = "lead-revive-test-11";
const cwd = "/home/ubuntu/ai-builds/lead-revive-test-11";
const aiDir = path.join(cwd, ".ai-build");
const stateFile = path.join(aiDir, "project_state.json");
const jobFile = path.join(aiDir, "active_project_build_job.json");
const logFile = "/home/ubuntu/ai-builds/lead-revive-test-11/.ai-build/logs/build-project-active-20260517183655.log";

function log(message) {
  fs.appendFileSync(logFile, message + "\n");
}

function readState() {
  return JSON.parse(fs.readFileSync(stateFile, "utf8"));
}

function writeState(state) {
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + "\n");
}

function writeJob(update) {
  const current = fs.existsSync(jobFile)
    ? JSON.parse(fs.readFileSync(jobFile, "utf8"))
    : {};
  fs.writeFileSync(jobFile, JSON.stringify({ ...current, ...update }, null, 2) + "\n");
}

function run(command, label) {
  log("");
  log("=== " + label + " ===");
  log(command);

  const result = spawnSync("bash", ["-lc", command], {
    cwd,
    encoding: "utf8",
    env: process.env,
    timeout: 1000 * 60 * 20
  });

  if (result.stdout) log(result.stdout);
  if (result.stderr) log(result.stderr);

  if (result.status !== 0) {
    throw new Error(label + " failed with exit code " + result.status);
  }

  return result;
}

log("BuildProjectActive started");
log("Project: " + projectName);
writeJob({ status: "running", startedAt: new Date().toISOString(), projectName, logFile });

try {
  while (true) {
    const state = readState();
    const features = state.features || [];
    const index = state.currentFeatureIndex || 0;
    const feature = features[index];

    if (!feature) {
      log("No current feature found. Stopping.");
      writeJob({ status: "failed", error: "No current feature found", completedAt: new Date().toISOString() });
      process.exit(1);
    }

    if (feature.status === "completed") {
      const nextIndex = index + 1;

      if (nextIndex >= features.length) {
        log("Roadmap complete.");
        writeJob({ status: "completed", completedAt: new Date().toISOString() });
        process.exit(0);
      }

      state.currentFeatureIndex = nextIndex;
      state.status = "ready_for_" + features[nextIndex].id;
      state.lastCommand = "/buildprojectactive:nextfeature";
      state.updatedAt = new Date().toISOString();
      writeState(state);
      log("Moved to next feature: " + features[nextIndex].id + " - " + features[nextIndex].name);
      continue;
    }

    log("");
    log("Building feature: " + feature.id + " - " + feature.name);
    writeJob({
      status: "running",
      currentFeatureId: feature.id,
      currentFeatureName: feature.name,
      updatedAt: new Date().toISOString()
    });

    const prompt = [
      "You are Claude Code running on the EC2 AI builder.",
      "",
      "Build the current feature for this active project.",
      "",
      "IMPORTANT RULES:",
      "- Build only the current feature.",
      "- Do not build future roadmap items.",
      "- Do not add backend, database, auth, CRM, email, or paid services unless explicitly required by the current feature.",
      "- Keep the implementation simple.",
      "- After coding, write a short build report to .ai-build/last_build_report.md.",
      "",
      "PROJECT NAME: " + state.projectName,
      "PROJECT IDEA: " + state.projectIdea,
      "",
      "CURRENT FEATURE:",
      JSON.stringify(feature, null, 2),
      "",
      "FULL ROADMAP:",
      JSON.stringify(features, null, 2)
    ].join("\n");

    fs.writeFileSync(path.join(aiDir, "ACTIVE_BUILD_PROMPT.md"), prompt);

    run("claude -p --permission-mode bypassPermissions < .ai-build/ACTIVE_BUILD_PROMPT.md", "CLAUDE BUILD");
    run("npm run build", "NPM BUILD");

    const commitMessage = "Build " + feature.id;
    run("git add -A && git commit -m " + JSON.stringify(commitMessage) + " || true && git push || true", "GIT COMMIT/PUSH");
    run("vercel deploy --yes || true", "VERCEL DEPLOY");

    const freshState = readState();
    const updatedFeatures = [...(freshState.features || [])];

    if (updatedFeatures[freshState.currentFeatureIndex]) {
      updatedFeatures[freshState.currentFeatureIndex] = {
        ...updatedFeatures[freshState.currentFeatureIndex],
        status: "completed",
      };
    }

    const updatedState = {
      ...freshState,
      features: updatedFeatures,
      status: "active_feature_completed",
      lastCommand: "/buildprojectactive",
      lastActiveBuild: {
        feature: feature.id,
        featureName: feature.name,
        completedAt: new Date().toISOString()
      },
      updatedAt: new Date().toISOString()
    };

    writeState(updatedState);
    log("Completed feature: " + feature.id + " - " + feature.name);
  }
} catch (error) {
  log("");
  log("BUILDPROJECTACTIVE FAILED");
  log(error.message || String(error));
  writeJob({
    status: "failed",
    error: error.message || String(error),
    completedAt: new Date().toISOString()
  });
  process.exit(1);
}
