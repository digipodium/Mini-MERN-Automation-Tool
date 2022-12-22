const mongoose = require('mongoose');

const db_url = `mongodb+srv://mmm:mmm@cluster0.gvyon.mongodb.net/contactsautomation?retryWrites=true&w=majority`;

// async function- will return promise
mongoose.connect(db_url)
.then((result) => {
console.log('database connected');
}).catch((err)=>{
        console.error(err);
});

module.exports=mongoose;
