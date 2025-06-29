const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/forwardsols").then(()=>{
        console.log(`Database connected successfully`);
    }).catch(()=>{
        console.log(`Database Error`);
    })
}

export default connectDB;