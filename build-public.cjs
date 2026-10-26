// Build a bounded deployment without deleting archived assets from Git.
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync('index.html', 'utf8');
const current = html.match(/assets\/([a-f0-9]{16})\//)[1];
const versions = JSON.parse(fs.readFileSync('deploy-versions.json', 'utf8'));
if (!versions.includes(current) || versions.length > 12 || versions.some(v => !/^[a-f0-9]{16}$/.test(v))) throw Error('Invalid deployment versions');
const output = 'site-public';
if (fs.existsSync(output)) throw Error('Build output must start empty');
fs.mkdirSync(output);
fs.copyFileSync('index.html', path.join(output, 'index.html'));
fs.writeFileSync(path.join(output, '.nojekyll'), '');
let count = 2;
for (const version of versions) {
  const source = path.join('assets', version);
  const destination = path.join(output, source);
  fs.mkdirSync(destination, { recursive: true });
  for (const name of fs.readdirSync(source)) {
    if (!/^(?:index\.js|app\.js|style\.css|evidence\.js|search\.json|catalog\.csv|\d+\.json)$/.test(name)) throw Error('Unexpected public file');
    if (!fs.lstatSync(path.join(source, name)).isFile()) throw Error('Public assets must be regular files');
    fs.copyFileSync(path.join(source, name), path.join(destination, name));
    count++;
  }
}
if (count > 1900) throw Error('Deployment approaches ESA file limit');
console.log(JSON.stringify({ current, versions, files: count }));
