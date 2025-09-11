import fs from 'fs';
import path from 'path';
import { transformSync } from '@swc/core';

function walk(dir){
  const files = [];
  for (const name of fs.readdirSync(dir)){
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) files.push(...walk(file));
    else files.push(file);
  }
  return files;
}

function convertFile(file){
  const ext = path.extname(file);
  if (!['.ts', '.tsx'].includes(ext)) return;
  if (file.endsWith('.d.ts')) return;
  const src = fs.readFileSync(file, 'utf8');
  try {
    const isTsx = ext === '.tsx';
    const { code } = transformSync(src, {
      jsc: {
        parser: { syntax: 'typescript', tsx: isTsx },
        transform: { react: { runtime: 'automatic', pragma: 'React.createElement' } },
        target: 'es2022'
      },
      module: { type: 'es6' },
      filename: file,
      sourceMaps: false,
    });

    const outFile = file.replace(/\.tsx?$/, isTsx ? '.jsx' : '.js');
    fs.writeFileSync(outFile, code, 'utf8');
    fs.unlinkSync(file);
    console.log('converted', file, '->', outFile);
  } catch (err) {
    console.error('failed to convert', file, err);
  }
}

const root = path.resolve(process.cwd(), 'client');
const files = walk(root).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
for (const f of files) convertFile(f);
console.log('done');
