// build-all.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const actionsDir = path.join(__dirname, "actions");
const folders = fs.readdirSync(actionsDir);

folders.forEach((folder) => {
  const indexPath = path.join(actionsDir, folder, "index.js");
  const outputDir = path.join(actionsDir, folder, "dist");

  if (fs.existsSync(indexPath)) {
    console.log(`🔧 Building: ${folder}`);
    execSync(`ncc build ${indexPath} -o ${outputDir}`, { stdio: "inherit" });
  } else {
    console.log(`⚠️ Skipping ${folder}, index.js not found.`);
  }
});