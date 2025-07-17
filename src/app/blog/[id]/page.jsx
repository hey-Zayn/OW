'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Calendar, Clock, Share2, Twitter, Linkedin, Facebook, Mail, Send, Loader2, Check } from 'lucide-react';
import { Bookmark, Heart } from 'lucide-react';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Form from '@/app/components/Form';

const Page = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { id } = useParams();

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`/api/blog?id=${id}`);
            if (res.data) {
                setBlog(res.data.blog);
                const relatedRes = await axios.get(`/api/blog?category=${res.data.blog.category}`);
                setRelatedBlogs(relatedRes.data.blogs.filter(b => b._id !== id).slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
            toast.error('Failed to load blog post');
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post('/api/email', { email });
            if (res.data.success) {
                toast.success('Thank you for subscribing!');
                setIsSubscribed(true);
                setEmail('');
            } else {
                toast.error(res.data.message || 'Subscription failed');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to subscribe. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-2xl font-bold text-black">
                    Blog post not found
                </h1>
                <Link href="/blogs" className="mt-4 inline-block px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors">
                    Browse all articles
                </Link>
            </div>
        );
    }

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = blog.title;
        
        switch(platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            default:
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
        }
    };

    return (
      <>
      <NavBar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 bg-white rounded-xl border border-yellow-300 shadow-lg" >
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    <article className="max-w-none">
                        {/* Article Header */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <Link href={`/blogs?category=${blog.category}`} className="text-yellow-600 hover:text-black hover:underline">
                                    {blog.category || 'General'}
                                </Link>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-yellow-600" />
                                    {new Date(blog.date || blog.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-yellow-600" />
                                    {blog.readTime || '5'} min read
                                </span>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
                                {blog.title}
                            </h1>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={blog.authorImg || "https://api.dicebear.com/9.x/notionists/svg"} 
                                        alt={blog.author}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                                    />
                                    <div>
                                        <h4 className="font-medium text-black">
                                            {blog.author || 'Anonymous'}
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            {blog.authorTitle || 'Writer'}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`p-2 rounded-full ${isLiked ? 'text-yellow-600 bg-yellow-100' : 'text-gray-500 hover:bg-yellow-50'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>
                                    <button 
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`p-2 rounded-full ${isBookmarked ? 'text-yellow-600 bg-yellow-100' : 'text-gray-500 hover:bg-yellow-50'}`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-10 rounded-xl overflow-hidden border-2 border-yellow-300">
                            <img 
                                src={blog.image || "/placeholder-image.jpg"} 
                                alt={blog.title}
                                className="w-full h-auto object-cover aspect-video"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose max-w-none">
                            <p className="text-lg leading-relaxed text-gray-800 mb-8">
                                {blog.description}
                            </p>
                            
                            <div className="mt-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-12 flex flex-wrap gap-2">
                                {blog.tags.map(tag => (
                                    <Link 
                                        key={tag} 
                                        href={`/blogs?tag=${tag}`}
                                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Share Section */}
                        <div className="mt-12 pt-8 border-t border-yellow-300">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h4 className="font-medium text-black mb-2">Share this article</h4>
                                    <p className="text-sm text-gray-600">
                                        Help spread the knowledge
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleShare('twitter')}
                                        className="w-10 h-10 rounded-full bg-yellow-500/20 text-[#171717] flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('linkedin')}
                                        className="w-10 h-10 rounded-full bg-yellow-500/20 text-[#171717] flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('facebook')}
                                        className="w-10 h-10 rounded-full bg-yellow-500/20 text-[#171717] flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleShare('copy')}
                                        className="w-10 h-10 rounded-full bg-yellow-500/20 text-[#171717] flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                    <div className="sticky top-24 space-y-8">
                        {/* Related Articles */}
                        <div className="bg-gradient-to-br from-yellow-50 via-yellow-50/50 to-white p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-yellow-300 bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-yellow-500/20">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-[#171717]">Recommended Articles</h3>
                                <p className="text-sm text-[#525252] mt-1">Curated content you might find valuable</p>
                            </div>
                            <div className="space-y-5">
                                {relatedBlogs.length > 0 ? (
                                    relatedBlogs.slice(0, 4).map(blog => (
                                        <Link 
                                            key={blog._id} 
                                            href={`/blog/${blog._id}`}
                                            className="group flex gap-4 items-start p-2 -m-2 rounded-lg transition-all duration-200 hover:bg-yellow-500/10"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-yellow-300">
                                                <img 
                                                    src={blog.image || "/placeholder-image.jpg"} 
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-[#171717] group-hover:text-yellow-600 transition-colors line-clamp-2">
                                                    {blog.title}
                                                </h4>
                                                <div className="flex items-center mt-1 text-xs text-[#525252]">
                                                    <span>
                                                        {new Date(blog.date || blog.createdAt).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="mx-2">•</span>
                                                    <span>{blog.category}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-[#525252] text-sm">No recommended articles at this time</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-yellow-50 via-yellow-50/50 to-white p-8 rounded-2xl shadow-lg border border-yellow-300 hover:shadow-yellow-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-black mb-3">Stay Updated</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Get the latest articles and news delivered to your inbox
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address" 
                                        className="w-full px-5 py-3 rounded-xl bg-white border-2 border-yellow-300 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 transition-all duration-300"
                                        disabled={isSubscribed}
                                        required
                                    />
                                    <Mail className="absolute right-3 top-3.5 w-5 h-5 text-yellow-500" />
                                </div>
                                <button 
                                    type="submit" 
                                    className={`w-full px-5 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                                        isSubscribed 
                                            ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-lg shadow-green-500/20 text-white' 
                                            : 'bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 shadow-lg shadow-yellow-500/20 text-black'
                                    }`}
                                    disabled={isSubmitting || isSubscribed}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin w-4 h-4" />
                                                <span>Subscribing...</span>
                                            </>
                                        ) : isSubscribed ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                <span>Subscribed!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Subscribe Now</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>
                            <p className="text-xs text-gray-500 mt-3">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Form/>
        <Footer/>
      </>
    );
}

export default Page;