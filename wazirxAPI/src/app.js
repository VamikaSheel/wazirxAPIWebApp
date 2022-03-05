const express = require("express");
require("../src/db/conn");
const Data = require("./models/data");
var requests = require("requests");

const app = express();
const port = process.env.PORT || 7000;

const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceValue = (tval,orgval)=>{
    let tempVal = tval.replace("{%nameVal%}",orgval.btcinr.name);
    tempVal = tempVal.replace("{%lastVal%}",orgval.btcinr.last);
    tempVal = tempVal.replace("{%buyVal%}",orgval.btcinr.buy);
    tempVal = tempVal.replace("{%sellVal%}",orgval.btcinr.sell);
    tempVal = tempVal.replace("{%volumeVal%}",orgval.btcinr.volume);
    tempVal = tempVal.replace("{%baseVal%}",orgval.btcinr.base_unit);
    
    return tempVal;
}

app.get("/", (req,res)=>{
    var arr;
     requests("https://api.wazirx.com/api/v2/tickers")
            //chunk by chunk data will be shown
            .on("data",(chunk) => {
                a=chunk;
                const onData = JSON.parse(chunk);
                arr = [onData];
                var realTimeData = arr
                    .map((val)=> replaceValue(homeFile,val))
                    .join("");
                    
                res.write(realTimeData);
            })
            .on("data",async()=>{
                try {
                    const data = new Data({
                        name:arr[0].btcinr.name,
                        last:arr[0].btcinr.last,
                        buy:arr[0].btcinr.buy,
                        sell:arr[0].btcinr.sell,
                        volume:arr[0].btcinr.volume,
                        base_unit:arr[0].btcinr.base_unit
                    });
                    const result = await data.save();
                    // res.status(201).send(result);
                } catch (e) {
                    // res.status(400).send(e);
                }
            })
            .on("end", (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})