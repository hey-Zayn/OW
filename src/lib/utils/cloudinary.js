import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd9j33dja",
  api_key: process.env.CLOUDINARY_API_KEY || "329347982555784",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4avhppvyg6hTcbXYBH4cTKjiDK8",
});

export default cloudinary;