
const {model, Schema, Types} = require('../connection');

// defining structure
const mySchema = new Schema({
    title: String,
    addedBy : {type : Types.ObjectId, ref : 'users'},
    data: Object,
    createdAt: Date
})

module.exports=model('contacts',mySchema);