// Serves the production build locally, including direct navigation to SPA routes.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../build');
const port = Number(process.env.PORT || 3000);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml'};
http.createServer((req,res)=>{
  let requested;
  try {requested = decodeURIComponent(new URL(req.url,'http://localhost').pathname);} catch {res.writeHead(400);return res.end();}
  const file = path.resolve(root, '.'+requested);
  if(file !== root && !file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  const exists = fs.existsSync(file) && fs.statSync(file).isFile();
  const target = exists ? file : path.extname(file) ? null : path.join(root,'index.html');
  if(!target || !fs.existsSync(target)){res.writeHead(404);return res.end('Not found. Run npm run build first.');}
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});
  fs.createReadStream(target).pipe(res);
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio preview: http://localhost:${port}`));
