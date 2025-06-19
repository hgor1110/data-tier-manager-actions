const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
  const metadataInput = core.getInput('metadata');
  const tables = JSON.parse(metadataInput);

  // 🔽 Create folder inside the repo (user project)
  const outputDir = path.join(process.cwd(), 'data-tier-snapshot');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  // 🔽 Group tables by env
  const grouped = { dev: [], stage: [], prod: [] };

  for (const table of tables) {
    const env = table.env.toLowerCase();
    if (grouped[env]) grouped[env].push(table);
  }

  // 🔽 Write one file per environment
  for (const env of Object.keys(grouped)) {
    const filePath = path.join(outputDir, `${env}.json`);
    fs.writeFileSync(filePath, JSON.stringify(grouped[env], null, 2));
    console.log(`✅ Created ${filePath} with ${grouped[env].length} tables`);
  }

  // Optional: set output if you want to use paths in next steps
  core.setOutput('output_dir', outputDir);

} catch (err) {
  core.setFailed(`❌ Failed to generate JSON files: ${err.message}`);
}
