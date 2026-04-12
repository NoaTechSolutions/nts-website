import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Load .env.development — handles UTF-8 and UTF-16 LE (Windows default encoding)
try {
  const envPath = resolve(process.cwd(), ".env.development");
  const raw = readFileSync(envPath);
  const text =
    raw[0] === 0xff && raw[1] === 0xfe
      ? raw.slice(2).toString("utf16le")
      : raw.toString("utf-8");
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (match) process.env[match[1].trim()] ??= match[2].trim();
  }
} catch {
  // file may not exist in CI
}

import { LinearClient } from "@linear/sdk";

async function main() {
  const apiKey = process.env.LINEAR_API_KEY;

  if (!apiKey) {
    console.error("❌  LINEAR_API_KEY no está configurada en .env.development");
    process.exit(1);
  }

  console.log("🔌  Conectando con Linear...\n");
  const client = new LinearClient({ apiKey });

  // Verificar identidad
  const me = await client.viewer;
  console.log(`✅  Autenticado como: ${me.name} (${me.email})`);

  // Listar teams
  const teamsResult = await client.teams();
  const teams = teamsResult.nodes;
  console.log(`\n📋  Teams encontrados (${teams.length}):`);
  for (const team of teams) {
    console.log(`     ${team.name} [${team.key}]  →  ID: ${team.id}`);
  }

  // Listar proyectos existentes
  const projectsResult = await client.projects();
  const projects = projectsResult.nodes;
  console.log(`\n📁  Proyectos existentes (${projects.length}):`);
  for (const project of projects) {
    console.log(`     ${project.name}  →  ID: ${project.id}`);
  }

  // Buscar o crear noatechsolutions-web
  const TARGET = "noatechsolutions-web";
  const existing = projects.find(
    (p) => p.name.toLowerCase() === TARGET.toLowerCase()
  );

  if (existing) {
    console.log(`\n✅  Proyecto '${TARGET}' ya existe.`);
    printConfig(teams[0]?.id ?? "", existing.id);
    return;
  }

  if (teams.length === 0) {
    console.error("\n❌  No se encontraron teams. Verificá tu API key.");
    process.exit(1);
  }

  // Usar el primer team disponible (NoaTechSolutions)
  const team = teams[0];
  console.log(`\n🔨  Creando proyecto '${TARGET}' en team '${team.name}'...`);

  const payload = await client.createProject({
    name: TARGET,
    teamIds: [team.id],
    description: "Website principal de NoaTechSolutions — diseño, SEO y conversión",
  });
  const created = await payload.project;

  if (!created) {
    console.error("❌  No se pudo crear el proyecto. Verificá permisos de la API key.");
    process.exit(1);
  }

  console.log(`✅  Proyecto creado: ${created.name}`);
  printConfig(team.id, created.id);
}

function printConfig(teamId: string, projectId: string) {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📝  Actualizá lib/linear-config.ts con estos valores:\n");
  console.log(`  TEAM_ID:    "${teamId}"`);
  console.log(`  PROJECT_ID: "${projectId}"`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("❌  Error:", message);
  process.exit(1);
});
