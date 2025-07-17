import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  heading: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
aboutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const About = mongoose.models.About || mongoose.model('About', aboutSchema);

export default About;
