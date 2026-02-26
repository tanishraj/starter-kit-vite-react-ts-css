import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDir = path.resolve(rootDir, 'node_modules/lucide-static/icons');
const targetDir = path.resolve(rootDir, 'src/assets/icons/lucide');

rmSync(targetDir, { force: true, recursive: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Synced Lucide icons to ${targetDir}`);
