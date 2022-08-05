const {model, Schema} = require('../connection');

// defining structure
const mySchema = new Schema({
    name: String,
    
    age : Number,
    email : String,
    password : String,
})

module.exports=model('users',mySchema);