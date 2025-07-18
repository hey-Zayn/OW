
import connectDB from '@/lib/config/db';
import Work from '@/lib/models/WorkModel';
import cloudinary from '@/lib/utils/cloudinary';




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
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const technologies = formData.getAll('technologies');
    const categories = formData.getAll('categories');
    const completionDate = formData.get('completionDate');
    const featured = formData.get('featured') === 'true';
    const company = formData.get('company');
    const imageFile = formData.get('image');

    // Validate required fields
    if (!title || !description || !imageFile || !technologies || !completionDate || !company || !categories) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
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

    // Create new work entry
    const newWork = new Work({
      title,
      description,
      image: result.secure_url,
      technologies,
      categories,
      completionDate,
      featured,
      company
    });

    await newWork.save();

    return new Response(JSON.stringify({ 
      success: true, 
      data: newWork,
      message: 'Work created successfully' 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating work:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: error.message || 'Failed to create work' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}



export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Fetch single work by ID
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
      // Fetch all works
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




export async function PUT(request) {
  try {
    const data = await request.json();
    
    const { 
      id,
      title,
      description,
      technologies,
      categories,
      completionDate,
      featured,
      company,
      image 
    } = data;

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
      {
        title,
        description,
        technologies,
        categories,
        completionDate,
        featured,
        company,
        image: imageUrl
      },
      { new: true }
    );

    return new Response(JSON.stringify({ 
      success: true, 
      data: updatedWork,
      message: 'Work updated successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating work:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: error.message || 'Failed to update work' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}





// export async function GET(request) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return new Response(JSON.stringify({ 
//         success: false, 
//         message: 'Work ID is required' 
//       }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const work = await Work.findById(id);
    
//     if (!work) {
//       return new Response(JSON.stringify({ 
//         success: false, 
//         message: 'Work not found' 
//       }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     return new Response(JSON.stringify({ 
//       success: true, 
//       data: work 
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error('Error fetching work:', error);
//     return new Response(JSON.stringify({ 
//       success: false, 
//       message: error.message || 'Failed to fetch work' 
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }
