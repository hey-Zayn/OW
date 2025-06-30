"use client";
import React, { useEffect, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios';
import Link from 'next/link';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blog');
                setBlogs(data.blogs || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const wavyImages = gsap.utils.toArray("#wavy");

        wavyImages.forEach((img, index) => {
            gsap.fromTo(
                img,
                {
                    x: window.innerWidth + index * -15,
                },
                {
                    x: -window.innerWidth - 300,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );
        });
    }, []);

    return (
        <>
            <div className='w-full h-full bg-[#E5E5E5]'>
                <div className='relative w-full h-full'>
                    <div className='absoulte top-0 h-[200px] max-sm:h-[100px] overflow-hidden'>
                        <div className="w-full flex justify-center object-cover max-sm:object-contain overflow-x-hidden">
                            {[...Array(8)].map((_, i) => (
                                <img
                                    key={i}
                                    id="wavy"
                                    src="/images/wavy.avif"
                                    alt=""
                                    style={{ filter: "brightness(0.1)" }}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>

                    <div className='w-full h-full bg-[#181615] z-10 max-sm:-mt-20'>
                        <div className="w-full h-full py-20 max-sm:pt-20">
                            <h1 className="text-white text-center text-7xl max-sm:text-4xl font-bold uppercase">
                                Insights
                            </h1>
                            
                            {loading ? (
                                <div className="text-white text-center">Loading blogs...</div>
                            ) : blogs.length > 0 ? (
                                blogs.slice(0, 3).map((blog, index) => (
                                    <Link href={`/blog/${blog._id || blog.id}`} key={index}>
                                        <div className="flex max-sm:flex-col justify-between hover:bg-[#ED97A8] group duration-300 mt-20 max-sm:px-10 cursor-pointer">
                                            <div className="w-[25%] max-sm:w-full opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                                <img src={blog.image} alt={blog.title} />
                                            </div>
                                            <div className="w-[75%] max-sm:w-full px-15 max-sm:px-0">
                                                <div className="w-full h-full flex max-sm:flex-col max-sm:gap-10 justify-between border-b border-white/30 py-4">
                                                    <div>
                                                        <h2 className="text-2xl text-white font-semibold group-hover:text-black duration-300">
                                                            {blog.title}
                                                        </h2>
                                                        <p className="text-white/80 mt-2 line-clamp-2 group-hover:text-black">
                                                            {blog.description?.substring(0, 50)}...
                                                        </p>
                                                    </div>
                                                    <h5 className="text-xl font-semibold text-white group-hover:text-black group-hover:font-medium duration-300">
                                                        {new Date(blog.date || blog.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-white text-center">No blogs found</div>
                            )}

                            <div className="w-full py-10 max-sm:pt-20">
                               <Link href="/blog">
                               <button className="bg-transparent px-3 py-1 border rounded-full border-white text-white ml-[30%] max-sm:ml-[10%] cursor-pointer">
                                    View All
                                </button>
                               </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogSection