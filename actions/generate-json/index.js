const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
  const metadataInput = core.getInput('metadata');
  const tables = JSON.parse(metadataInput);

  const outputDir = path.join(process.cwd(), 'data-tier-snapshot');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const grouped = { dev: [], stage: [], prod: [] };

  for (const table of tables) {
    const env = table.env.toLowerCase();
    if (grouped[env]) grouped[env].push(table);
  }

  for (const env of Object.keys(grouped)) {
    const filePath = path.join(outputDir, `${env}.json`);
    fs.writeFileSync(filePath, JSON.stringify(grouped[env], null, 2));
    console.log(`✅ Wrote ${env}.json with ${grouped[env].length} tables`);
  }

} catch (err) {
  core.setFailed(`❌ Failed to generate JSON files: ${err.message}`);
}
