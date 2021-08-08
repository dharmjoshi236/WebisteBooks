const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const port = process.env.PORT||3000
const path = require('path')
const Book = require('./src/models/model')

// middlewares
app.use (express.json());
app.use(express.urlencoded());

// Add the view engine
app.set('view engine','pug')
app.set('views',path.join(__dirname,'pugFile'))

// use static
app.use('/public',express.static('public'))

// connect to the database
mongoose.connect('mongodb+srv://dharmtest:1Qazzaq1@cluster0.zqeh6.mongodb.net/ApiTesting',{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}).then(()=>{
    console.log("Connection Established WIth Db")
}).catch((e)=>{
    console.log("No Connection");
})

// Routes
app.get('/home',(req,res)=>{
    res.render('index');
})

app.get('/list',(req,res)=>{
    res.render('list')
})

app.get('/books',(req,res)=>{
    res.render('booksform')
})

// Routes for the api

app.post('/',async(req,res)=>{
    try{
        const postData = await new Book(req.body)
        postData.save().then(()=>{

            res.render('index')
        }).catch((e)=>{
            res.status(400).send("Somthing went wrong")
        })
    }catch{
        res.send("Something Went Wrong")
    }
})

app.get('/',async(req,res)=>{
     const getdata = await Book.find({})
     res.send(getdata)
})
// Listen to the server
app.listen(port,()=>{
    console.log(`Application running on port ${port}`);
})