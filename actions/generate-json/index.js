const path = require('path');
const fs = require('fs');
const core = require('@actions/core');

const environments = ['dev', 'stage', 'prod'];

try {
  environments.forEach(env => {
    const data = [
      {
        table_name: `${env}_table1`,
        last_accessed: '2024-05-01',
        up_for_downgrade: false
      },
      {
        table_name: `${env}_table2`,
        last_accessed: '2024-01-01',
        up_for_downgrade: true
      }
    ];

    // Write files to 'metadata/' folder in user's repo
    const outputPath = path.join(process.env.GITHUB_WORKSPACE, 'metadata');
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    const filePath = path.join(outputPath, `${env}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    core.info(`Created ${filePath}`);
  });
} catch (e) {
  core.setFailed(`Failed to generate JSON: ${e.message}`);
}