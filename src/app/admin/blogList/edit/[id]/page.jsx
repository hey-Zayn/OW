'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: '',
        author: "zain",
        authorImg: "https://api.dicebear.com/9.x/notionists/svg"
    });

    const categories = [
        'Technology',
        'Business',
        'Marketing',
        'Design',
        'Development',
        'SEO',
        'Social Media'
    ];

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`/api/blog?id=${id}`);
            if (res.data.blog) {
                setFormData({
                    title: res.data.blog.title,
                    description: res.data.blog.content || res.data.blog.description || '',
                    category: res.data.blog.category,
                    image: res.data.blog.image,
                    author: res.data.blog.author || "zain",
                    authorImg: res.data.blog.authorImg || "https://api.dicebear.com/9.x/notionists/svg"
                });
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast.error('Failed to load blog post');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.description); // Changed from description to content
            formDataToSend.append('category', formData.category);
            formDataToSend.append('currentImage', formData.image);
            
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            const res = await axios.put(`/api/blog?id=${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                toast.success('Blog updated successfully');
                router.push('/admin/blogList');
            } else {
                toast.error(res.data.message || 'Failed to update blog');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('Failed to update blog');
        }
    };

    useEffect(() => {
        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gray-900 rounded-xl shadow-md border border-gray-700 p-6">
                <h1 className="text-2xl font-bold text-white mb-6">Edit Blog Post</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={8}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            accept="image/*"
                        />
                        {formData.image && !selectedImage && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-400">Current Image:</p>
                                <img src={formData.image} alt="Current" className="mt-1 h-20 object-cover rounded" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/blogList')}
                            className="px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
