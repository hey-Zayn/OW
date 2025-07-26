import mongoose from 'mongoose';

const WorkImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image is required'],
    validate: {
      validator: function(v) {
        // Accepts only image file extensions (jpg, jpeg, png, gif, webp, svg)
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image file!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.WorkImage || mongoose.model('WorkImage', WorkImageSchema);
