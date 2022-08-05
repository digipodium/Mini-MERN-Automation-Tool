// importing express

const express = require ('express');

const userRouter = require('./routers/userRouter');
const contactRouter = require('./routers/contactRouter');
const utilRouter = require('./routers/utils');

const cors=require('cors');
// initializing express app

const app=express();

const port= 5000;

// middleware
app.use(express.json());
app.use(cors({origin:['http://localhost:3000']}));

app.use('/user',userRouter);
app.use('/contact',contactRouter);
app.use('/util',utilRouter);

// creating a route/endpoints
 app.get('/add', (req, res)=>{
     res.send('request accepted/ response from express!');

});

app.get('/home', (req, res)=>{
    res.send('home!');
    
});

// listen is a function to start server
app.listen(port, ()=> { console.log('express server started ready')});
