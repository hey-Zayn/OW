
import connectDB from '@/lib/config/db';
import Work from '@/lib/models/WorkModel';
import cloudinary from '@/lib/utils/cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dd9j33dja",
  api_key: process.env.CLOUDINARY_API_KEY || "329347982555784",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4avhppvyg6hTcbXYBH4cTKjiDK8",
  secure: true
});

const loadDB = async () => {
  await connectDB();
};
loadDB();

// Create a new Work with only an image
export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return new Response(JSON.stringify({ message: 'Image is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Upload image to Cloudinary
    const buffer = await imageFile.arrayBuffer();
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'work-images' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(Buffer.from(buffer));
    });

    // Create new work entry with only image
    const newWork = new Work({
      image: result.secure_url
    });

    await newWork.save();

    return new Response(JSON.stringify({
      success: true,
      data: newWork,
      message: 'Work image uploaded successfully'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error uploading work image:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Failed to upload work image'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get all works or a single work (no change, but only image field will be present)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const work = await Work.findById(id);

      if (!work) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Work not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        data: work,
        message: 'Work fetched successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const works = await Work.find().sort({ createdAt: -1 });

      return new Response(JSON.stringify({
        success: true,
        data: works,
        message: 'Works fetched successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Error fetching works:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Failed to fetch works'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Delete a work by id (no change)
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Work ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const deletedWork = await Work.findByIdAndDelete(id);

    if (!deletedWork) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Work not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: deletedWork,
      message: 'Work deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting work:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Failed to delete work'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Update only the image of a work
export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, image } = data;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Work ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingWork = await Work.findById(id);
    if (!existingWork) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Work not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let imageUrl = existingWork.image;
    if (image && typeof image === 'object' && image.base64) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          `data:image/jpeg;base64,${image.base64}`,
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
      imageUrl = result.secure_url;
    }

    const updatedWork = await Work.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true }
    );

    return new Response(JSON.stringify({
      success: true,
      data: updatedWork,
      message: 'Work image updated successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating work image:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || 'Failed to update work image'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
