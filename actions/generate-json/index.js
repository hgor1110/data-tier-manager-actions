const core = require('@actions/core');
const fs = require('fs');

try {
  const config = JSON.parse(fs.readFileSync('app_config.json', 'utf8'));
  const appName = config.app_name;

  const environments = ['dev', 'stage', 'prod'];
  environments.forEach(env => {
    const data = [
      {
        table_name: `${appName}_${env}_table1`,
        last_accessed: '2024-05-01',
        up_for_downgrade: false
      },
      {
        table_name: `${appName}_${env}_table2`,
        last_accessed: '2024-01-01',
        up_for_downgrade: true
      }
    ];
    fs.writeFileSync(`${env}.json`, JSON.stringify(data, null, 2));
  });

  core.info('✅ JSON files created');
} catch (e) {
  core.setFailed(`Error: ${e.message}`);
}
