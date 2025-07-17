'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog');
            if (data?.blogs) {
                setBlogs(data.blogs);
            }
        } catch (err) {
            console.error('Failed to fetch blogs:', err);
            setError('Failed to load blog posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        
        try {
            await axios.delete(`/api/blog?id=${id}`);
            await fetchBlogs();
        } catch (err) {
            console.error('Failed to delete blog:', err);
            setError('Failed to delete blog post. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-black">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black">Blog Management</h1>
                    <p className="text-yellow-600/80 mt-2">Manage your content efficiently</p>
                </div>
                <Link 
                    href="/admin/addProduct" 
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-yellow-500/40"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                    New Post
                </Link>
            </div>

            <div className="bg-white backdrop-blur-lg border border-yellow-200 rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-yellow-200">
                    <thead className="bg-yellow-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-200">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-yellow-50 transition-colors duration-150">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img 
                                                    className="h-10 w-10 rounded-full object-cover" 
                                                    src={blog.image || '/default-blog.png'} 
                                                    alt={blog.title} 
                                                    onError={(e) => {
                                                        e.target.src = '/default-blog.png';
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-black line-clamp-1">{blog.title}</div>
                                                <div className="text-xs text-yellow-600">{blog.author || 'Admin'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            {blog.category || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-yellow-600">
                                        {new Date(blog.date).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <Link 
                                                href={`/admin/blogList/edit/${blog._id}`} 
                                                className="text-yellow-600 hover:text-yellow-800 transition-colors flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(blog._id)} 
                                                className="text-yellow-700 hover:text-yellow-900 transition-colors flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-yellow-600">
                                    No blog posts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;
