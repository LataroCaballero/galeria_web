import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const TARGET_RUNTIME = 'nodejs22.x';
const functionsDir = join(process.cwd(), '.vercel', 'output', 'functions');

for (const entry of readdirSync(functionsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const configPath = join(functionsDir, entry.name, '.vc-config.json');
  try {
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    if (config.runtime && config.runtime !== TARGET_RUNTIME) {
      config.runtime = TARGET_RUNTIME;
      writeFileSync(configPath, JSON.stringify(config, null, '\t') + '\n');
      console.log(`Fixed runtime → ${TARGET_RUNTIME} in ${entry.name}`);
    }
  } catch {}
}
