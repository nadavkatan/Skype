const mongoose = require('mongoose')

const mongoConnect = async()=>{
    let options = {
        keepAlive: true,
        connectTimeoutMS: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    try{
        await mongoose.connect(process.env.MONGO_URI, options);
    }catch(e){
        console.log(e)
    }
}

module.exports = mongoConnect;