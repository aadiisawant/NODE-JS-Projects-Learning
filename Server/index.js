const http = require('http')
const fs = require('fs')
const myServer = http.createServer((req ,res)=>{
    console.log(req.headers);
    const log = `${Date.now()}: ${req.url}, New Request Received \n`;
    fs.appendFile('./log.txt',log,(err,data)=>{
        if(err){
            console.log(err);
        }else
        {
            switch(req.url){
                case '/':
                    res.end('HomePage');
                    break
                case '/about':
                    res.end('This is Aditya sawant');
                    break
                default:
                    res.end("404 Not Found")
            }
        }
    })
});

myServer.listen(8001, ()=>console.log("Server started..."))
