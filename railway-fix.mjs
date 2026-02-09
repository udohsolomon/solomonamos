const RAILWAY_TOKEN = "8e5d6120-e26d-4712-9a12-640f52a6b32c";
const API_URL = "https://backboard.railway.app/graphql/v2";

async function query(gql, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RAILWAY_TOKEN}`,
    },
    body: JSON.stringify({ query: gql, variables }),
  });
  return res.json();
}

async function main() {
  const projectId = "43308974-abfb-40b5-befa-0821c17a4325";
  const serviceId = "6629665f-2ff6-4cce-80fc-d15258859cd7";
  const envId = "6e5641fe-ec6d-47b5-8b56-d872a8e6d099";
  const correctKey = "I2WnPAzwfN7pkVvTrKWOzmQSrZKTLd7ToszTeMbP5SV6jRrjIA1t8Omkha5wqpVR";

  // Step 1: Delete the bad variable (with trailing space in name)
  console.log("=== Step 1: Deleting bad variable 'BEEHIIV_API_KEY ' ===");
  const del = await query(`
    mutation {
      variableDelete(input: {
        projectId: "${projectId}"
        environmentId: "${envId}"
        serviceId: "${serviceId}"
        name: "BEEHIIV_API_KEY "
      })
    }
  `);
  console.log("Delete result:", JSON.stringify(del));

  // Step 2: Create the correct variable (no trailing space)
  console.log("\n=== Step 2: Creating correct 'BEEHIIV_API_KEY' ===");
  const upsert = await query(`
    mutation {
      variableUpsert(input: {
        projectId: "${projectId}"
        environmentId: "${envId}"
        serviceId: "${serviceId}"
        name: "BEEHIIV_API_KEY"
        value: "${correctKey}"
      })
    }
  `);
  console.log("Upsert result:", JSON.stringify(upsert));

  // Step 3: Verify
  console.log("\n=== Step 3: Verifying ===");
  const vars = await query(`
    query {
      variables(projectId: "${projectId}", environmentId: "${envId}", serviceId: "${serviceId}")
    }
  `);

  for (const [key, value] of Object.entries(vars.data.variables)) {
    if (key.includes("BEEHIIV")) {
      const hasTrailingSpace = key !== key.trim();
      console.log(`  "${key}" => value_length: ${value.length}, trailing_space: ${hasTrailingSpace}`);
    }
  }

  // Step 4: Trigger redeploy
  console.log("\n=== Step 4: Triggering redeploy ===");
  const deployments = await query(`
    query {
      deployments(first: 1, input: { projectId: "${projectId}" }) {
        edges { node { id status } }
      }
    }
  `);

  if (deployments.data?.deployments?.edges?.length > 0) {
    const latestId = deployments.data.deployments.edges[0].node.id;
    const redeploy = await query(`
      mutation { deploymentRedeploy(id: "${latestId}") { id status } }
    `);
    if (redeploy.errors) {
      console.error("Redeploy error:", JSON.stringify(redeploy.errors));
    } else {
      console.log("Redeploy triggered!", redeploy.data?.deploymentRedeploy);
    }
  }
}

main().catch(console.error);
