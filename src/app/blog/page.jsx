'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [allBlogs, setAllBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/api/blog');
            if (res.data && res.data.blogs) {
                setBlogs(res.data.blogs);
                setAllBlogs(res.data.blogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const categories = ['All', ...new Set(allBlogs.map(blog => blog.category).filter(Boolean))];

    const handleCategoryFilter = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setBlogs(allBlogs);
        } else {
            const filtered = allBlogs.filter(blog => 
                blog.category?.toLowerCase() === category.toLowerCase()
            );
            setBlogs(filtered);
        }
    };

    return (
       <>
            <NavBar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16 mt-10">
                
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`p-5 py-2 text-sm font-semibold transition-all duration-300 rounded-md ${
                                activeCategory === category
                                    ? 'bg-yellow-500/20 text-[#171717] border border-yellow-500/30 shadow-lg hover:shadow-yellow-500/20'
                                    : 'bg-white/10 backdrop-blur-lg border border-yellow-500/30 text-[#171717] hover:bg-yellow-500/30'
                            }`}
                            onClick={() => handleCategoryFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs?.map((post) => (
                    <article key={post._id} className="relative group backdrop-blur-lg bg-gradient-to-br from-yellow-50 via-yellow-50/50 to-white border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-yellow-500/20 hover:-translate-y-1">
                        <div className="h-60 relative overflow-hidden">
                            <img 
                                src={post.image || "/placeholder-image.jpg"} 
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#171717]">
                                {post.category || "Featured"}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center text-sm text-[#525252] mb-3 space-x-2">
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                                <span className="text-[#525252]">•</span>
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#525252]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.readTime || '5'} min read
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-[#171717] mb-3">
                                {post.title}
                            </h3>
                            <p className="text-[#525252] mb-6 leading-relaxed line-clamp-3">
                                {post.description || "Discover valuable insights and expert perspectives in this article."}
                            </p>
                            <div className="group">
                                <Link href={`/blog/${post._id}`}>
                                    <button className="p-5 py-3 text-lg md:text-sm font-semibold bg-yellow-500/20 text-[#171717] border border-yellow-500/30 rounded-md cursor-pointer backdrop-blur-lg hover:bg-yellow-500/30 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

        </div>
            <Footer/>
       </>
    )
}

export default page