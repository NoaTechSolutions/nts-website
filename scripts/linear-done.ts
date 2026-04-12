import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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
} catch {}

import { LinearClient } from "@linear/sdk";

// Usage: npx tsx scripts/linear-done.ts <issueId>
// Example: npx tsx scripts/linear-done.ts LIN-42

async function main() {
  const issueId = process.argv[2];
  if (!issueId) {
    console.error("❌  Uso: npx tsx scripts/linear-done.ts <issueId>");
    console.error("     Ejemplo: npx tsx scripts/linear-done.ts LIN-42");
    process.exit(1);
  }

  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    console.error("❌  LINEAR_API_KEY no configurada");
    process.exit(1);
  }

  const client = new LinearClient({ apiKey });

  // Obtener el issue para conocer el team
  const issue = await client.issue(issueId);
  const team = await issue.team;
  if (!team) {
    console.error(`❌  No se encontró el team del issue ${issueId}`);
    process.exit(1);
  }

  // Obtener el estado "Done" del team
  const statesResult = await team.states();
  const doneState = statesResult.nodes.find(
    (s) => s.type === "completed"
  );

  if (!doneState) {
    console.error(`❌  No se encontró un estado 'Done' en el team ${team.name}`);
    const available = statesResult.nodes.map((s) => `${s.name} (${s.type})`).join(", ");
    console.error(`     Estados disponibles: ${available}`);
    process.exit(1);
  }

  const payload = await client.updateIssue(issueId, { stateId: doneState.id });
  const updated = await payload.issue;

  console.log(`✅  Issue ${issueId} marcado como Done`);
  console.log(`     Título: ${updated?.title}`);
  console.log(`     Estado: ${doneState.name}`);
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error("❌  Error:", message);
  process.exit(1);
});
