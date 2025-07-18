import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: [true, 'Quote is required'],
        trim: true,
        maxlength: [500, 'Quote cannot exceed 500 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [50, 'Author name cannot exceed 50 characters']
    }
}, {
    timestamps: true
});

const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);

export default Quote;