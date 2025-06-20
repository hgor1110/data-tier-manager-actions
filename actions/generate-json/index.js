const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

try {
  // Absolute path to app_config.json in the checked-out repo
  // const configPath = path.join(process.env.GITHUB_WORKSPACE, 'app_config.json');
  // core.info(`🔍 Looking for config at: ${configPath}`);

  // const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  // const appName = config.app_name;

  const environments = ['dev', 'stage', 'prod'];

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

    const filePath = path.join(process.env.GITHUB_WORKSPACE, `${env}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    core.info(`Created ${env}.json`);
  });

} catch (e) {
  core.setFailed(`Error: ${e.message}`);
}
