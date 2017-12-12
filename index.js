const express = require('express');
const app = express();
const bp = require('body-parser');
const morgan = require('morgan');
const port = 8888;
const fs = require('fs');

app.use(bp.urlencoded({extended:false}));
app.use(bp.json());

app.get('/index', (req,res)=>{
    fs.readFile('avatar.json', 'utf8', (err,data)=>{
        if(err){res.statCode = 500; res.send(); return;}
        else{res.send(data)}
    });
})
app.post('/index', (req,res)=>{
    let obj = {}
    // let arr =['EARTH','WIND','FIRE','WATER']
    let randAv = req.body.randAv;
    let first = req.body.first;
    let last = req.body.last;
    let avatar = req.body.avatar;
    
    obj.first = first;
    obj.last = last;
    obj.avatar = avatar;
    // obj.avatar = arr[Math.floor(Math.random() * 4)]
    if(!req.body.first || !req.body.last || !req.body.avatar){
        res.json({success:false, message:'Enter all information'})
        return;
    }
    fs.appendFile('avatar.json', JSON.stringify(req.body), (err)=>{
        if(err){res.statusCode = 500; res.send(); return;}
        else{res.json({success:`${first} ${last}, you are ${avatar}`})}
    })
})
app.listen(port);