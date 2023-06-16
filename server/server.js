const express = require('express');





const app = express();
app.get("/api",(req,res)=>{
    res.json({"users":["one","two","three"]})
})


app.listen(5000,()=>{
    console.log("server start on port 5000")
})