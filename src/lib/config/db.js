const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://zaynobusiness:Zain-0300@taskmanager.avpsb.mongodb.net/chat_DB?retryWrites=true&w=majority&appName=TaskManager").then(()=>{
        console.log(`Database connected successfully`);
    }).catch(()=>{
        console.log(`Database Error`);
    })
}

export default connectDB;