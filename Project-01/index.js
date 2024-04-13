const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express();
const Port = 8001;

//Middleware  - Plugin
app.use(express.urlencoded({extended : false}))
//Middleware - 2 
app.use((req,res,next)=>{
    // console.log(req.headers);
    console.log("custom Middleware");
    next();
})
//Routes
app.get('/users',(req,res)=>{
    const html = `
        <ul>
            ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    return res.send(html)
})

//RESTFUL API
// app.get('/api/users', (req,res)=>{
//     return  res.json(users)
//  })
// app.post('/api/users', (req,res)=>{
//     return res.json({status : "Pending"})
// })
// above code have same route, so lets optimize it
app.route("/api/users")
    .get((req,res)=>{
        return  res.json(users)
     })
     .post((req,res)=>{
        const body = req.body;
        if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || body.job_title){
            return res.status(400).json({msg : "All fields are req..."})
        }
        users.push({...body, id: users.length +1})
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
            return  res.status(201).json({status : "Success", id: users.length})
        })
     })


app.route("/api/users/:id")
    .get((req, res)=>{
        
        res.setHeader("X-MyName","Aditya Sawant") //Custom Header
        // always add X to Custom Headers
        const id = Number(req.params.id);
        const user = users.find((user)=> user.id === id)
        if(!user){
            return res.status(404).json({Error : "User not found"})
        }else{
            return res.json(user)
        }
        
    })
    .patch((req,res)=>{
        const body = req.body;
        const id = Number(req.params.id);
        const index =users.findIndex(user => user.id === id)
        const user = users[index];
        const updateUser = {...user,...body}
        console.log(updateUser);
        users[index] = updateUser;
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
            if(err){
                return res.json({Error : err})
            }else{
                return  res.json({status : "User updated.", id: users.length})
            }
        })
        
    })
    .delete((req,res)=>{
        const id = Number(req.params.id);
        const index =users.findIndex(user => user.id === id)
        if (index !== -1) {
            users.splice(index, 1);
            fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
                if(err){
                    return res.json({ERROR : err.message})
                }else{
                    return res.json({Message : `User with ID: ${id} deleted successfully.`})
                }
            })    
        } else {
            return res.json({Message :
            `User with ID: ${id} not found.`});
        }
    })


app.listen(Port, () => console.log("Server started..."))