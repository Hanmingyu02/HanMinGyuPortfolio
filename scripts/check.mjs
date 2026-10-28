import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {site,menu,projects,experiences,education,certifications,awards} from '../src/data/portfolio.mjs';
const home=await readFile('dist/index.html','utf8');
assert.equal(menu.length,5);assert.equal(experiences.length,2);assert.equal(projects.length,3);assert.equal(education.length,3);assert.equal(certifications.length,3);assert.equal(awards.length,5);
assert.deepEqual(menu.map(x=>x[1]),['현장실습','프로젝트','교육사항','자격증','수상내역']);
for(const [id] of menu)assert(home.includes(`id="${id}"`));
assert.equal((home.match(/class="award-card"/g)||[]).length,5);
assert.equal(new Set(awards.map(a=>a[0]+a[3])).size,5);
for(const p of projects){const page=await readFile(`dist/projects/${p.slug}/index.html`,'utf8');for(let j=0;j<10;j++)assert(page.includes(`id="part-${j}"`));assert(page.includes(p.summary));assert(page.includes('rel="canonical"'));}
for(const page of ['dist/index.html',...projects.map(p=>`dist/projects/${p.slug}/index.html`)]){
 const html=await readFile(page,'utf8');for(const m of html.matchAll(/<img\b[^>]*>/g))assert(/alt="[^"]+"/.test(m[0]));
 for(const m of html.matchAll(/href="([^"]+)"/g)){
 const h=m[1];if(h.startsWith(site.base+'/')){const file=h.slice(site.base.length+1).split('#')[0];if(file)await access('dist/'+file+(file.endsWith('/')?'index.html':''));}
 if(h.startsWith('#')&&h.length>1)assert(html.includes(`id="${h.slice(1)}"`));
 }
}
console.log('PASS: content counts, five menu names/anchors, 3×10 case study sections, award uniqueness, image alt, canonical and internal file links.');
