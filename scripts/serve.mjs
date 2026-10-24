import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {site} from '../src/data/portfolio.mjs';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{try{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(pathname==='/'){res.writeHead(302,{Location:site.base+'/'});res.end();return;}
 if(!pathname.startsWith(site.base+'/'))throw new Error('Not found');
 let path=resolve(root,'.'+pathname.slice(site.base.length));
 if(!path.startsWith(root+sep))throw new Error('Not found');
 if((await stat(path)).isDirectory())path=resolve(path,'index.html');
 const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(8000,'0.0.0.0',()=>console.log(`Portfolio server: port 8000, path ${site.base}/`));
