var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./router/pgConnect');

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/JS',express.static(__dirname + "/JS"));
app.use(express.static(__dirname + "/css"));
app.use('/image',express.static(__dirname + "/image"));

app.get('/',function(req,res){
    res.sendFile(__dirname + "/public/login.html");
})

app.post('/register',(req,res,next) => {
    const MEMBERSHIP_TABLE = [
        req.body.MEM_ID,
        req.body.MEM_PASSWORD,
        req.body.MEM_NAME,
        req.body.MEM_EMAIL,
        req.body.MEM_TEL,
        req.body.MEM_NICKNAME,
        req.body.MEM_ADDRESS
    ]

     const sql = 'insert into MEMBERSHIP_TABLE(MEM_ID,MEM_PASSWORD,MEM_NAME,MEM_EMAIL,MEM_TEL,MEM_NICKNAME,MEM_ADDRESS) values($1,$2,$3,$4,$5,$6,$7)'

    db.query(sql,user_table,(err,row) => {
        if(err) console.log(err)
    });

    return res.status(200).json({result : "ok"});
    
});



app.listen(5000,function(){
    console.log("Express server is listening on port 5000");
})