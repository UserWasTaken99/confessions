const express=require("express");
const mongoose=require("mongoose");
const {Confession, Reply}=require("./models/confession");
const http=require("http");

const path=require("path");

//Important declarations
// const hostname='0.0.0.0';
const port=process.env.PORT || 80;
// const dbURL="mongodb://localhost:27017/confessionDB";
const dbURL=`mongodb+srv://admin-user:jpYdGmuZtNZ8kcQ0@mongodb-confession.tlj9tt5.mongodb.net/confessionDB?retryWrites=true&w=majority`;

//Global Variable for Replies
var reply='';
var confess_text='';
var confession_id;


const app=express();

//Express Specific
app.use('/static', express.static('static'));
app.use(express.urlencoded()); //Enables working with form data
app.use(express.json()); //Enables working with JSON data

//Setting up Pug template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Connect to database
mongoose.connect(dbURL)
.then(()=>{
    app.listen(port, ()=>{
        // console.log(`Server started at http://${hostname}:${port}/`);
        console.log("Server Started");
    });
})
.catch((error)=>{
    console.log(error);
});


//Endpoints
app.get('/', (req, res)=>{
    res.status(200).render('index');
    
})
app.post('/', (req, res)=>{
    let user=req.body.user;
    let con=req.body.confession;
    const conf=new Confession({
        enc_ip: user,
        text: con
    })
    conf.save();

    res.status(200).render('index');
});
app.get('/all-confessions', async(req, res)=>{
    let result=await Confession.find().sort({createdAt:-1}).exec()
    res.status(200).render('all-confessions', {"result": result})


});

app.post('/getConfessions', async (req, res)=>{
    let search_string=req.body.search_string.trim();
    search_string="^"+search_string;
    let search_confession=await Confession.find({text:{$regex:new RegExp(search_string,'i')}}).sort({createdAt:-1}).exec();
    res.status(200).send({'result':search_confession});
});

app.post('/showReplies', async(req, res)=>{
    const id=req.body.id;
    let result=await Reply.find({to:id}).sort({createdAt:-1}).exec();
    let confess=await Confession.find({_id:id}).exec();
    confession_id=id;
    reply=result;
    confess_text=confess[0].text;
    res.status(200).send({"result":result});
})

app.get('/replies', (req, res)=>{
    if (!confess_text.length)
        req.url='/all-confessions';
    res.status(200).render('reply', {'reply':reply, "confession":confess_text, "confession_id":confession_id});
})
app.post('/postComment', (req, res)=>{
    const post_reply=new Reply({
        to: req.body.to,
        reply_txt: req.body.comment
    });
    post_reply.save();
    res.status(200).end();
})