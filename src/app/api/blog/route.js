import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';

import fs from 'fs'
import connectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { getUserFromRequest } from "@/lib/utils/auth";

const loadDB = async()=>{
    await connectDB();
}
loadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id");

    try {
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, blog });
        } else {
            const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
            return NextResponse.json({ success: true, blogs });
        }
    } catch (error) {
        console.error('Error in GET /api/blog:', error);
        const message = blogId ? 'Error fetching blog' : 'Error fetching blogs';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

export async function POST(request){
    try {
        // Check authentication
        const token = request.cookies.get('authToken')?.value;
        if (!token) {
            return NextResponse.json(
                { success: false, message: "Authentication required" },
                { status: 401 }
            );
        }

        // Verify token
        const { verify } = await import('@tsndr/cloudflare-worker-jwt');
        const isValid = await verify(token, "your-secret-key-here-must-be-at-least-32-chars");
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const cloudinary = (await import('@/lib/utils/cloudinary')).default;

        const image = formData.get('image');
        if (!image) {
            return NextResponse.json(
                { success: false, message: "Image is required" },
                { status: 400 }
            );
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        
        // Upload image to Cloudinary with error handling
        let result;
        try {
            result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { 
                        resource_type: 'auto',
                        folder: 'blog-images' // Add folder for better organization
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return NextResponse.json(
                { success: false, message: "Failed to upload image to Cloudinary" },
                { status: 500 }
            );
        }

        // Get user from token
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: result.secure_url,
            authorImg: formData.get('authorImg'),
            createdBy: user.id,
        }

        const createdBlog = await BlogModel.create(blogData);
        if (!createdBlog) {
            return NextResponse.json(
                { success: false, message: "Failed to create blog" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Blog Added Successfully",
            blog: createdBlog
        }, { status: 201 });

    } catch (error) {
        console.error('Error in blog POST:', error);
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}



// delete
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    try {
        const blog = await BlogModel.findById(id);
        fs.unlink(`./public/${blog.image}`, ()=>{})
        await BlogModel.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Error deleting blog'
        }, { status: 500 });
    }
}


export async function PUT(request) {
    const id = await request.nextUrl.searchParams.get('id');
    try {
        const formData = await request.formData();
        let imageUrl = formData.get('currentImage');
        const file = formData.get('image');

        // Dynamically import cloudinary (like in POST)
        const cloudinary = (await import('@/lib/utils/cloudinary')).default;

        // If new image is uploaded, upload to Cloudinary
        if (file && typeof file === 'object' && file.name && file.size > 0) {
            const buffer = await file.arrayBuffer();
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'blog-images' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(Buffer.from(buffer));
            });
            imageUrl = result.secure_url;
        }

        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: formData.get('title'),
                    description: formData.get('content') || formData.get('description'),
                    content: formData.get('content') || formData.get('description'),
                    category: formData.get('category'),
                    image: imageUrl,
                    isPublished: formData.get('isPublished') === 'true'
                }
            },
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update blog" },
            { status: 500 }
        );
    }
}
