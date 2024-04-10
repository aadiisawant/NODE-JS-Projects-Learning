const fs = require('fs')

//sync...
// fs.writeFileSync('./Text.txt','Hey There!, How u guys doing?')

//Async
// fs.writeFile('./Text.txt','Hey There!', (err)=>{})

// const result =fs.readFileSync('./Text.txt','utf-8')
// console.log(result);

// fs.readFile('./Text.txt','utf-8',(err,data)=>{
    
//     if(err){
//         console.log('ERROR :',err);
//     }else{
//         console.log(data); 
//     }
// })

fs.appendFileSync("./Text.js",`${Date.now().toLocaleString()} Hey All! \n`)