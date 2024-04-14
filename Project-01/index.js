const express = require("express")
// const users = require("./MOCK_DATA.json")
const fs = require("fs")
const mongoose = require('mongoose');


const app = express();
const Port = 8001;

app.use(express.urlencoded({extended : false}))

mongoose.connect("mongodb://127.0.0.1:27017/myNodeDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    },
}, {timestamps : true});

const User = mongoose.model("users",userSchema)

//Middleware  - Plugin

//Middleware - 2 
// app.use((req,res,next)=>{
//     // console.log(req.headers);
//     console.log("custom Middleware");
//     next();
// })
//Routes
app.get('/users',async (req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user)=> `<li>${user.first_name} - ${user.email}</li>`).join("")}
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
    .get(async (req,res)=>{
        const allDbUsers = await User.find({});
        return  res.json(allDbUsers)
     })
     .post(async (req,res)=>{
        const body = req.body;
        console.log(body);
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ msg: "All fields are required..." });
        }
        
        const result = await User.create({
            first_name : body.first_name,
            last_name:body.last_name,
            gender : body.gender,
            email : body.email,
            job_title : body.job_title
        })
        console.log("result",result);
        return res.status(201).json({status : "Success"})
     })


app.route("/api/users/:id")
    .get(async (req, res)=>{
        res.setHeader("X-MyName","Aditya Sawant") //Custom Header
        // always add X to Custom Headers
        try{
        const user = await User.findById(req.params.id)
        console.log(user);
        if(!user){
            return res.status(404).json({Error : "User not found"})
        }else{
            return res.json(user)
        }
    }catch(err){
        return res.status(500).json({Error : err.message})
    }
        
    })
    .patch(async (req,res)=>{
        await User.findByIdAndUpdate(req.params.id , req.body)
        return  res.json({status : "User updated"})
    })
    .delete(async (req,res)=>{
        await User.findByIdAndDelete(req.params.id)
        return res.json({Message : `User Deleted`});
    })


app.listen(Port, () => console.log("Server started..."))