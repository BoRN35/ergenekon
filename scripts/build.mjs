import fs from 'node:fs/promises';import path from 'node:path';import {build} from 'esbuild';
const root=path.resolve(import.meta.dirname,'..'),out=path.join(root,'dist');
await build({entryPoints:[path.join(root,'src/city3d.js')],bundle:true,format:'esm',minify:true,outfile:path.join(root,'public/city3d.bundle.js')});
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(path.join(out,'server'),{recursive:true});await fs.cp(path.join(root,'public'),path.join(out,'client'),{recursive:true});await fs.copyFile(path.join(root,'src/account-save.js'),path.join(out,'client/account-save.js'));await fs.copyFile(path.join(root,'worker/index.js'),path.join(out,'server/index.js'));
const config={name:'ergenekon-3d',main:'index.js',compatibility_date:'2026-11-14',assets:{directory:'../client',binding:'ASSETS',run_worker_first:true},d1_databases:[{binding:'DB',database_name:'ergenekon-saves',migrations_dir:'../../drizzle'}]};await fs.writeFile(path.join(out,'server/wrangler.json'),JSON.stringify(config,null,2));
console.log('Built Worker + static game assets + account save client.');
