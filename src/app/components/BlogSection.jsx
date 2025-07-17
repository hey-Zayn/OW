"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      if (res.data && res.data.blogs) {
        // Get first 3 blogs
        const firstThreeBlogs = res.data.blogs.slice(0, 3);
        setBlogs(firstThreeBlogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full py-16 px-6 sm:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#171717] mb-4">Latest Insights</h2>
          <p className="text-[#525252] max-w-2xl mx-auto">
            Sharing knowledge and perspectives on business strategy, market trends, and growth opportunities.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs && blogs.length > 0 ? (
                blogs.map((post) => (
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
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-[#525252]">
                  No blog posts available
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/blog" 
                className="px-6 py-3 border border-yellow-500 text-yellow-500 font-medium rounded-lg hover:bg-yellow-500/10 transition-all duration-300 inline-flex items-center"
              >
                View All Articles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BlogSection