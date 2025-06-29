import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    company:{
        type:String,
        // required: true,
    },
    email:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    job:{
        type:String,
        // required: true,
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const ContactModel = mongoose.models.blog ||  mongoose.model('blog',Schema);

export default ContactModel;




