const express = require("express")
const userRouter = require('./routes/user')
const {connectMongoDb} = require('./connection')
const { logReqRes } = require('./middlewares')
const app = express();
const Port = 8001;

app.use(express.urlencoded({extended : false}))

//connection to DB
connectMongoDb("mongodb://127.0.0.1:27017/myNodeDB")

app.use("/api/users", userRouter)
app.use(logReqRes('log.txt'))

app.listen(Port, () => console.log("Server started..."))