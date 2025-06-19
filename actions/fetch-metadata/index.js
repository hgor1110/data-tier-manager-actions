const core = require('@actions/core');

try {
  const appName = core.getInput('app_name');
  console.log(`📥 Received app_name: ${appName}`);

  // ✅ MOCK DATA - Later replace with real Querybook integration
  const tableMetadata = [
    {
      table_name: "project_occ_data_science.pg_mg_user_events",
      last_accessed: "2025-03-01",
      last_modified: "2025-03-01",
      up_for_delete: false,
      up_for_downgrade: true,
      env: "dev"
    },
    {
      table_name: "project_occ_data_science.pg_mg_order_summary",
      last_accessed: "2025-05-10",
      last_modified: "2025-05-10",
      up_for_delete: false,
      up_for_downgrade: false,
      env: "stage"
    },
    {
      table_name: "project_occ_data_science.pg_mg_legacy_data",
      last_accessed: "2025-02-01",
      last_modified: "2025-01-10",
      up_for_delete: false,
      up_for_downgrade: true,
      env: "prod"
    }
  ];

  core.setOutput("metadata", JSON.stringify(tableMetadata));
  console.log("✅ Fetched metadata:", JSON.stringify(tableMetadata, null, 2));
} catch (error) {
  core.setFailed(`❌ Failed to fetch metadata: ${error.message}`);
}
