'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

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

    // Style helpers using THEME
    const getCategoryButtonStyle = (isActive) => ({
        background: isActive ? THEME.primary : 'transparent',
        color: isActive ? THEME.bg : THEME.text,
        border: `1.5px solid ${THEME.primary}`,
        fontWeight: 600,
        borderRadius: '0.5rem',
        padding: '0.5rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: isActive ? `0 2px 12px 0 ${THEME.primary}33` : undefined,
        outline: 'none',
    });

    const getArticleStyle = () => ({
        background: THEME.bg,
        border: `1.5px solid ${THEME.primary}`,
        borderRadius: '1.25rem',
        boxShadow: `0 4px 24px 0 ${THEME.primary}22`,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
    });

    const getCategoryBadgeStyle = () => ({
        background: THEME.primary,
        color: THEME.bg,
        padding: '0.25rem 0.9rem',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 500,
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        boxShadow: `0 2px 8px 0 ${THEME.primary}33`,
        letterSpacing: '0.02em',
    });

    const getReadMoreButtonStyle = () => ({
        background: THEME.primary,
        color: THEME.bg,
        border: `1.5px solid ${THEME.primary}`,
        borderRadius: '0.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '0.6rem 1.5rem',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
        boxShadow: `0 2px 12px 0 ${THEME.primary}22`,
        outline: 'none',
    });

    return (
       <>
            <NavBar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ background: THEME.bg, color: THEME.text }}>
            <div className="text-center mb-16 mt-10">
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            style={getCategoryButtonStyle(activeCategory === category)}
                            onClick={() => handleCategoryFilter(category)}
                            onMouseOver={e => {
                                if (!activeCategory === category) {
                                    e.currentTarget.style.background = `${THEME.primary}22`;
                                    e.currentTarget.style.color = THEME.bg;
                                }
                            }}
                            onMouseOut={e => {
                                if (!activeCategory === category) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = THEME.text;
                                }
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs?.map((post) => (
                    <article
                        key={post._id}
                        className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        style={getArticleStyle()}
                    >
                        <div className="h-60 relative overflow-hidden">
                            <img 
                                src={post.image || "/placeholder-image.jpg"} 
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                            <div style={getCategoryBadgeStyle()}>
                                {post.category || "Featured"}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center text-sm mb-3 space-x-2" style={{ color: '#525252' }}>
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" style={{ color: '#525252' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                                <span style={{ color: '#525252' }}>•</span>
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" style={{ color: '#525252' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.readTime || '5'} min read
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: THEME.text }}>
                                {post.title}
                            </h3>
                            <p className="mb-6 leading-relaxed line-clamp-3" style={{ color: '#525252' }}>
                                {post.description || "Discover valuable insights and expert perspectives in this article."}
                            </p>
                            <div className="mt-auto">
                                <Link href={`/blog/${post._id}`}>
                                    <button
                                        style={getReadMoreButtonStyle()}
                                        onMouseOver={e => {
                                            e.currentTarget.style.background = THEME.bg;
                                            e.currentTarget.style.color = THEME.primary;
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.background = THEME.primary;
                                            e.currentTarget.style.color = THEME.bg;
                                        }}
                                    >
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