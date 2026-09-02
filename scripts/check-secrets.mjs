import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';

const MAX_FILE_SIZE = 1024 * 1024;
const excludedFiles = new Set(['package-lock.json']);
const patterns = [
  {
    label: 'Google API key',
    expression: new RegExp(['AI', 'za', '[0-9A-Za-z_-]{30,}'].join(''), 'g'),
  },
  {
    label: 'OpenAI API key',
    expression: new RegExp(['s', 'k-', '(?:proj-)?', '[0-9A-Za-z_-]{20,}'].join(''), 'g'),
  },
  {
    label: 'GitHub token',
    expression: new RegExp(['g', 'h[pousr]_', '[0-9A-Za-z]{30,}'].join(''), 'g'),
  },
  {
    label: 'Stripe live secret',
    expression: new RegExp(['s', 'k_live_', '[0-9A-Za-z]{20,}'].join(''), 'g'),
  },
  {
    label: 'Private key',
    expression: new RegExp(['-----BEGIN ', '(?:RSA |EC |OPENSSH )?', 'PRIVATE KEY-----'].join(''), 'g'),
  },
];

const trackedFiles = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
  .filter((file) => !excludedFiles.has(file));

const findings = [];

for (const file of trackedFiles) {
  if (statSync(file).size > MAX_FILE_SIZE) continue;

  const buffer = readFileSync(file);
  if (buffer.includes(0)) continue;

  const content = buffer.toString('utf8');
  for (const { label, expression } of patterns) {
    expression.lastIndex = 0;
    for (const match of content.matchAll(expression)) {
      const line = content.slice(0, match.index).split('\n').length;
      findings.push(`${file}:${line} — ${label}`);
    }
  }
}

if (findings.length > 0) {
  console.error('Potential committed credentials detected:');
  findings.forEach((finding) => console.error(`- ${finding}`));
  console.error('Remove the credential, rotate it at the provider, then retry.');
  process.exit(1);
}

console.log(`Secret scan passed (${trackedFiles.length} tracked files checked).`);
