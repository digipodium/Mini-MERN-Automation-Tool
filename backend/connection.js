const mongoose = require('mongoose');

const db_name='MyMernDB';

const db_url = `mongodb+srv://mariyam2724:mariyam2724@mycluster.4u93r.mongodb.net/${db_name}?retryWrites=true&w=majority`;

// async function- will return promise
mongoose.connect(db_url)
.then((result) => {
console.log('database connected');
}).catch((err)=>{
        console.error(err);
});

module.exports=mongoose;
