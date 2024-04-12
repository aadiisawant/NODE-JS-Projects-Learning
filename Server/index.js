const http = require('http')
const fs = require('fs')
const url = require("url")

const myServer = http.createServer((req ,res)=>{
    // console.log(req.headers);
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url}, New Request Received \n`;
    const myUrl = url.parse(req.url, true); //@param parseQueryString, so we make it true
    // query: [Object: null prototype] { name: 'aditya', userid: '1' }, //output
    // console.log(myUrl);
    fs.appendFile('./log.txt',log,(err,data)=>{
        if(err){
            console.log(err);
        }else
        {
            switch(myUrl.pathname){
                case '/':
                    res.end('HomePage');
                    break
                case '/about':
                    // http://localhost:8001/about?name=aditya&userid=1
                    const username = myUrl.query.name;
                    
                    res.end(`Hi! ${username}`);
                    break
                case '/search':
                    const search = myUrl.query.search_query;
                    res.end("Here is your search result for "+search)    
                default:
                    res.end("404 Not Found")
            }
        }
    })
});

myServer.listen(8001, ()=>console.log("Server started..."))
