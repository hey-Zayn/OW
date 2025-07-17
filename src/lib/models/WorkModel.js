import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  technologies: {
    type: [String],
    required: [true, 'Technologies used are required']
  },
  completionDate: {
    type: String,
    required: [true, 'Completion date is required'],
    trim: true,
    maxlength: [50, 'Completion date cannot be more than 50 characters']
  },
  featured: {
    type: Boolean,
    default: false
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Work || mongoose.model('Work', WorkSchema);
