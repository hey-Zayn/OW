const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://zaynobusiness:Zain-0300@taskmanager.avpsb.mongodb.net/client-Portfolio?retryWrites=true&w=majority&appName=TaskManager" ).then(()=>{
        console.log(`Database connected successfully`);
    }).catch(()=>{
        console.log(`Database Error`);
    })
}

export default connectDB;