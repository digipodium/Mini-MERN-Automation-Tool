const express = require ('express');
const router = express.Router();
const Model=require('../models/userModel');

//  save data smoothly on database
router.post('/add', (req,res)=>{

    console.log(req.body);
    // res.send('response from user router');
    
    // to save data in mongodb
    new Model(req.body).save()
    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
        
    });

})


router.get('/getall', (req,res)=>{
    // res.send('response from get all');
    Model.find({  })
    
    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
        
    });

})


// : denotes parameter
router.get('/getbyemail/:email', (req,res)=>{
    Model.findOne({ email : req.params.email})

    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
        
    });

});

// delete is request method
router.delete('/delete/:id', (req,res)=>{ Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
        
    });

})

router.put('/update/:id',(req,res)=>{
    Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
        
    });

})


router.post('/authenticate', (req,res) => {
    const formdata=req.body;
    Model.findOne({ email : formdata.email, password : formdata.password })

    .then((result) => {
        console.log(result);
        
        // if condition will be true if user is not null
        if(result)
        {   console.log('login success');
            res.json(result);
        } else{
        console.log('login failed');
        res.status(400).json({ status : 'Login Failed' });
        }
        
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
})



module.exports = router;