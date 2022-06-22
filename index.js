const { readFile } = require('fs')
const fs = require('fs');
const {createServer} = require('http')
const path = require("path")
const server = createServer(handleRequest)
server.listen(3000)


const types = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-ttf',
  };

function handleRequest(req,res){
    console.log(`${req.method} ${req.url}`);
    
    
  
    // перехід в папку
  let pathname = path.join(__dirname + "/public");

 

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // якщо  папку по шляху не знайшло
      res.statusCode = 404;
      res.end(`Path ${pathname} not found!`);
      return;
    }

    // якщо шлях до файла являється директорією(первинною папкою)
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    console.log(pathname)

    // считуєм файли
      readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // cчитуєм  його розширення
        const ext = path.parse(pathname).ext;
        console.log(ext)
        // Content-type по масиву типів і передаєм його
        res.writeHead(200,{'Content-type' : types[ext] || 'application/octet-stream'});
        
        res.end(data);
      }
    });
  });


}