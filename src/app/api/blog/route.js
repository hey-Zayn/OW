
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';

import fs from 'fs'
import connectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

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
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    
    const blogData = {
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`,
    }

    await BlogModel.create(blogData);
// console.log(imgUrl); this is for the testing perpuse for i m gona save this in DB
console.log('blog Saved '); 

    return NextResponse.json({
        success:true,
        message:"Blog Added Successfully",
    });
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
        const formData = await request.json();
        
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: formData.title,
                    content: formData.content,
                    category: formData.category,
                    image: formData.image,
                    isPublished: formData.isPublished
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
