const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    last:{
        type:Number,
        required:true
    },
    buy:{
        type:Number,
        required:true
    },
    sell:{
        type:Number,
        required:true
    },
    volume:{
        type:Number,
        required:true
    },
    base_unit:{
        type:String,
        required:true
    }
})

const dataModel = new mongoose.model("wazirxData",dataSchema);

module.exports = dataModel;