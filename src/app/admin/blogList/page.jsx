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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold  text-white">Blog Management</h1>
                    <p className="text-red-100/80 mt-2">Manage your content efficiently</p>
                </div>
                <Link 
                    href="/admin/addProduct" 
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/80 to-red-600/90 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-red-500/40"
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

            <div className="bg-white/10 backdrop-blur-lg border border-red-200/30 rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200/30">
                    <thead className="bg-red-50/10">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-red-100/90 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-red-200/30">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-red-50/20 transition-colors duration-150">
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
                                                <div className="text-sm font-medium text-white line-clamp-1">{blog.title}</div>
                                                <div className="text-xs text-red-100/80">{blog.author || 'Admin'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500/20 text-red-100">
                                            {blog.category || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-red-100/80">
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
                                                className="text-blue-500 hover:text-blue-700 transition-colors flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(blog._id)} 
                                                className="text-red-400 hover:text-red-200 transition-colors flex items-center gap-1"
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
                                <td colSpan="4" className="px-6 py-4 text-center text-red-100/80">
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
