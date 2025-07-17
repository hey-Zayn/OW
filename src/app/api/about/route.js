

import connectDB from '@/lib/config/db';
import About from '@/lib/models/AboutModel';
import { v2 as cloudinary } from 'cloudinary';




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd9j33dja",
    api_key: process.env.CLOUDINARY_API_KEY || "329347982555784",
    api_secret: process.env.CLOUDINARY_API_SECRET || "4avhppvyg6hTcbXYBH4cTKjiDK8",
    secure: true
  });

  const loadDB = async()=>{
    await connectDB();
}
loadDB();


export async function POST(request) {
  try {
    // Temporarily remove authentication check for debugging
    // const token = request.cookies.get('authToken')?.value;
    // if (!token) {
    //   return new Response(JSON.stringify({ success: false, message: "Authentication required" }), {
    //     status: 401,
    //   });
    // }

    // // Verify token
    // const { verify } = await import('@tsndr/cloudflare-worker-jwt');
    // const isValid = await verify(token, "your-secret-key-here-must-be-at-least-32-chars");
    // if (!isValid) {
    //   return new Response(JSON.stringify({ success: false, message: "Invalid token" }), {
    //     status: 401,
    //   });
    // }

    const loadDB = async()=>{
        await connectDB();
    }
    loadDB();

    const formData = await request.formData();
    const heading = formData.get('heading');
    const details = formData.get('details');
    const file = formData.get('file');

    if (!file || !heading || !details) {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'All fields are required',
        received: { 
          hasFile: !!file, 
          hasHeading: !!heading, 
          hasDetails: !!details 
        } 
      }), {
        status: 400,
      });
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd9j33dja",
      api_key: process.env.CLOUDINARY_API_KEY || "329347982555784",
      api_secret: process.env.CLOUDINARY_API_SECRET || "4avhppvyg6hTcbXYBH4cTKjiDK8",
      secure: true
    });

    // Upload image to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: 'auto',
          folder: 'about-images'
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // Create new about entry
    const newAbout = new About({
      image: cloudinaryResponse.secure_url,
      heading,
      details,
    });

    await newAbout.save();

    return new Response(JSON.stringify({ 
      success: true,
      data: newAbout 
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating about:', error);
    return new Response(JSON.stringify({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function GET() {
  try {
    const aboutData = await About.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(aboutData), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}







export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        message: 'ID parameter is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    await connectDB();

    // Get the about entry to delete
    const aboutToDelete = await About.findById(id);
    if (!aboutToDelete) {
      return new Response(JSON.stringify({
        success: false,
        message: 'About entry not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Delete image from Cloudinary if it exists
    if (aboutToDelete.image) {
      try {
        const publicId = aboutToDelete.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`about-images/${publicId}`);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
        // Continue with deletion even if Cloudinary fails
      }
    }

    // Delete the about entry from database
    const deletedAbout = await About.findByIdAndDelete(id);
    if (!deletedAbout) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to delete about entry'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'About entry deleted successfully',
      data: deletedAbout
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error deleting about:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Internal server error',
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}





export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'About entry ID is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const heading = formData.get('heading');
    const details = formData.get('details');
    const currentImage = formData.get('currentImage');
    const file = formData.get('file');

    if (!heading?.trim() || !details?.trim()) {
      return new Response(JSON.stringify({ 
        success: false,
        message: 'Heading and details are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    let imageUrl = currentImage;
    
    // If new image is uploaded
    if (file && file.name && file.size > 0) {
      try {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          return new Response(JSON.stringify({
            success: false,
            message: 'Invalid image type. Only JPEG, PNG, and WebP are allowed'
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }

        // Upload new image to Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const cloudinaryResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { 
              resource_type: 'auto',
              folder: 'about-images'
            },
            (error, result) => {
              if (error) {
                reject(new Error('Image upload failed'));
              } else {
                resolve(result);
              }
            }
          ).end(buffer);
        });

        if (!cloudinaryResponse?.secure_url) {
          throw new Error('Image upload failed - no secure URL returned');
        }
        imageUrl = cloudinaryResponse.secure_url;

        // Delete old image from Cloudinary if it exists
        if (currentImage && currentImage.includes('res.cloudinary.com')) {
          try {
            const publicId = currentImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`about-images/${publicId}`);
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        }
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return new Response(JSON.stringify({
          success: false,
          message: 'Failed to upload image',
          error: uploadError.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }

    // Update the about entry
    try {
      const updatedAbout = await About.findByIdAndUpdate(
        id,
        {
          heading: heading.trim(),
          details: details.trim(),
          image: imageUrl
        },
        { new: true }
      );

      if (!updatedAbout) {
        return new Response(JSON.stringify({
          success: false,
          message: 'About entry not found'
        }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'About entry updated successfully',
        data: updatedAbout
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (updateError) {
      console.error('Database update error:', updateError);
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to update about entry',
        error: updateError.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

  } catch (error) {
    console.error('Error updating about:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Internal server error',
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
