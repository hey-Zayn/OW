import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    job: {
        type: String,
    },
    source: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ContactModel = mongoose.models.contact || mongoose.model('contact', Schema);

export default ContactModel;
