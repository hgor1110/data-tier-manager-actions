const core = require('@actions/core');
const fs = require('fs');

try {
  const config = JSON.parse(fs.readFileSync('app_config.json', 'utf-8'));
  const appName = config.app_name;
  if (!appName) throw new Error("app_name missing in app_config.json");
  core.setOutput("app_name", appName);
  console.log(`✅ App name: ${appName}`);
} catch (err) {
  core.setFailed(`❌ ${err.message}`);
}
