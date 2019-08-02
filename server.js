const express = require("express");
const fs = require("fs");

const staticFolder = `${__dirname}/statics`;
const serverPort = 8080;

try{
    try{
        fs.readFileSync(staticFolder);
        console.error(`${staticFolder} file exists, end program!!`);
        process.exit(-1);
    } catch(e){
        // file conflicts with folder not exists, continue.
    }
    fs.readdirSync(staticFolder);
}catch(e){
    console.log(`creating static folder ${staticFolder}...`);
    fs.mkdirSync(staticFolder);
}

var server = express();

server.use(express.static(staticFolder));

server.get("/", (req, res) => {
    res.status(200).send("He110!!")
});

server.get("/request", (req, res) => {
    // send a js file
});

server.get("/rune/:runeId", (req, res) => {
    let { runeId } = req.params;
    if (!runeId) {
        res.status(404).send("");
    } else {

    }
});

server.listen(serverPort,()=>{
    console.log(`Captcha Server listen on ${serverPort}`);
});