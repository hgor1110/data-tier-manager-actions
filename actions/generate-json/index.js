const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
  const environments = ['dev', 'stage', 'prod'];
  const metadataDir = path.join(process.env.GITHUB_WORKSPACE, 'metadata');

  // Create metadata folder if not exists
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir);
    core.info('📁 Created metadata folder');
  }

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

    const filePath = path.join(metadataDir, `${env}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    core.info(`✅ Created ${env}.json in metadata/`);
  });

} catch (e) {
  core.setFailed(`Error: ${e.message}`);
}
