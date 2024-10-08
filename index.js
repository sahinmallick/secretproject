//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next){
    const password = req.body["password"];
    if(password === "codeisfun"){
        userIsAuthorised = true;
    }
    next();
};

app.use(passwordCheck);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");

});

app.post("/check",(req, res)=>{
    console.log(req.body);

    if(userIsAuthorised){
        res.sendFile(__dirname +"/public/secret.html");
    }
    else{
        // res.sendFile(__dirname + "/public/index.html");
        res.send("<h1>Fuckk Off!!</h1>")
    }

});

app.listen(port, ()=>{
    console.log(`Server Is Running on port ${port}`);
});