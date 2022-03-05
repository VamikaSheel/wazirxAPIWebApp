const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wazirx-api").then(()=>{
    console.log("Connection successful.");
}).catch((e)=>{
})