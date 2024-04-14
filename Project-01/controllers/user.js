const User = require('../models/user')

async function handleGetAllUsers(req,res){
    try{
    const allDbUsers = await User.find({});
    return  res.json(allDbUsers);
    }catch(error){
        return res.json({Error : error.message});
}
}

async function handleCreateUser(req,res){
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
}

async function handleGetUserByID(req, res){
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
}

async function handleUpdateUserById(req,res){
    try{
    await User.findByIdAndUpdate(req.params.id , req.body)
    return  res.json({status : "User updated"})
    }catch(error){
        return res.json({Error : error.message});
}
}

async function handleDeleteUserById(req,res){
    try{
    await User.findByIdAndDelete(req.params.id)
    return res.json({Message : `User Deleted`});
    }catch(error){
        return res.json({Error : error.message});
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserByID,
    handleUpdateUserById,
    handleDeleteUserById
 }