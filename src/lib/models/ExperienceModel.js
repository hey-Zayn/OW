import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  skills: {
    type: [String],
    required: true,
    default: [],
    validate: {
      validator: function(v) {
        return v.every(skill => typeof skill === 'string' && skill.trim().length > 0);
      },
      message: 'Skills must be an array of non-empty strings'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);

export default Experience;
