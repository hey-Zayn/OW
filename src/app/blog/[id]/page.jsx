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

// Theme colors using CSS variables
const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

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
            <div className="flex justify-center items-center min-h-screen" style={{ background: THEME.bg }}>
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                    style={{ borderColor: THEME.primary }}
                ></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" style={{ background: THEME.bg }}>
                <h1 className="text-2xl font-bold" style={{ color: THEME.text }}>
                    Blog post not found
                </h1>
                <Link
                    href="/blogs"
                    className="mt-4 inline-block px-6 py-2 rounded-lg hover:transition-colors"
                    style={{
                        background: THEME.primary,
                        color: THEME.text,
                        transition: 'background 0.2s',
                    }}
                >
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
        <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 rounded-xl border shadow-lg"
            style={{
                background: THEME.bg,
                borderColor: THEME.primary,
                color: THEME.text,
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.04)'
            }}
        >
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    <article className="max-w-none">
                        {/* Article Header */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--muted-text-color, #666)' }}>
                                <Link
                                    href={`/blogs?category=${blog.category}`}
                                    className="hover:underline"
                                    style={{ color: THEME.primary }}
                                >
                                    {blog.category || 'General'}
                                </Link>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" style={{ color: THEME.primary }} />
                                    {new Date(blog.date || blog.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" style={{ color: THEME.primary }} />
                                    {blog.readTime || '5'} min read
                                </span>
                            </div>
                            <h1
                                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                                style={{ color: THEME.text }}
                            >
                                {blog.title}
                            </h1>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={blog.authorImg || "https://api.dicebear.com/9.x/notionists/svg"}
                                        alt={blog.author}
                                        className="w-10 h-10 rounded-full object-cover border-2"
                                        style={{ borderColor: THEME.primary }}
                                    />
                                    <div>
                                        <h4 className="font-medium" style={{ color: THEME.text }}>
                                            {blog.author || 'Anonymous'}
                                        </h4>
                                        <p className="text-sm" style={{ color: 'var(--muted-text-color, #666)' }}>
                                            {blog.authorTitle || 'Writer'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="p-2 rounded-full border"
                                        style={{
                                            color: isLiked ? THEME.primary : 'var(--muted-text-color, #888)',
                                            background: isLiked ? THEME.primary + '22' : 'transparent',
                                            borderColor: THEME.primary,
                                            transition: 'background 0.2s, color 0.2s'
                                        }}
                                    >
                                        <Heart className="w-5 h-5" style={isLiked ? { fill: THEME.primary } : {}} />
                                    </button>
                                    <button
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className="p-2 rounded-full border"
                                        style={{
                                            color: isBookmarked ? THEME.primary : 'var(--muted-text-color, #888)',
                                            background: isBookmarked ? THEME.primary + '22' : 'transparent',
                                            borderColor: THEME.primary,
                                            transition: 'background 0.2s, color 0.2s'
                                        }}
                                    >
                                        <Bookmark className="w-5 h-5" style={isBookmarked ? { fill: THEME.primary } : {}} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Featured Image */}
                        <div className="mb-10 rounded-xl overflow-hidden border-2" style={{ borderColor: THEME.primary }}>
                            <img
                                src={blog.image || "/placeholder-image.jpg"}
                                alt={blog.title}
                                className="w-full h-auto object-cover aspect-video"
                            />
                        </div>
                        {/* Article Content */}
                        <div className="prose max-w-none" style={{ color: THEME.text }}>
                            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted-text-color, #444)' }}>
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
                                        className="px-3 py-1 rounded-full text-sm transition-colors border"
                                        style={{
                                            background: THEME.bg,
                                            color: THEME.primary,
                                            border: `1px solid ${THEME.primary}`,
                                            fontWeight: 500
                                        }}
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                        {/* Share Section */}
                        <div className="mt-12 pt-8 border-t" style={{ borderColor: THEME.primary }}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h4 className="font-medium mb-2" style={{ color: THEME.text }}>Share this article</h4>
                                    <p className="text-sm" style={{ color: 'var(--muted-text-color, #666)' }}>
                                        Help spread the knowledge
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleShare('twitter')}
                                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                                        style={{
                                            background: THEME.bg,
                                            color: THEME.primary,
                                            borderColor: THEME.primary
                                        }}
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleShare('linkedin')}
                                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                                        style={{
                                            background: THEME.bg,
                                            color: THEME.primary,
                                            borderColor: THEME.primary
                                        }}
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleShare('facebook')}
                                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                                        style={{
                                            background: THEME.bg,
                                            color: THEME.primary,
                                            borderColor: THEME.primary
                                        }}
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleShare('copy')}
                                        className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
                                        style={{
                                            background: THEME.bg,
                                            color: THEME.primary,
                                            borderColor: THEME.primary
                                        }}
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
                        <div
                            className="p-8 rounded-2xl shadow-2xl border bg-opacity-95 hover:bg-opacity-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                            style={{
                                background: THEME.bg,
                                borderColor: THEME.primary,
                                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.06)'
                            }}
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold" style={{ color: THEME.text }}>Recommended Articles</h3>
                                <p className="text-sm mt-1" style={{ color: 'var(--muted-text-color, #888)' }}>Curated content you might find valuable</p>
                            </div>
                            <div className="space-y-5">
                                {relatedBlogs.length > 0 ? (
                                    relatedBlogs.slice(0, 4).map(blog => (
                                        <Link
                                            key={blog._id}
                                            href={`/blog/${blog._id}`}
                                            className="group flex gap-4 items-start p-2 -m-2 rounded-lg transition-all duration-200 border hover:bg-[var(--primary-color)]/10"
                                            style={{ background: 'transparent', borderColor: THEME.primary }}
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border"
                                                style={{ borderColor: THEME.primary }}>
                                                <img
                                                    src={blog.image || "/placeholder-image.jpg"}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4
                                                    className="text-sm font-medium group-hover:underline transition-colors line-clamp-2"
                                                    style={{ color: THEME.text }}
                                                >
                                                    {blog.title}
                                                </h4>
                                                <div className="flex items-center mt-1 text-xs" style={{ color: 'var(--muted-text-color, #888)' }}>
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
                                        <p className="text-sm" style={{ color: 'var(--muted-text-color, #888)' }}>No recommended articles at this time</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Newsletter Signup */}
                        <div
                            className="p-8 rounded-2xl shadow-lg border hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                            style={{
                                background: THEME.bg,
                                borderColor: THEME.primary,
                                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.04)'
                            }}
                        >
                            <h3 className="text-xl font-bold mb-3" style={{ color: THEME.text }}>Stay Updated</h3>
                            <p className="text-sm mb-4" style={{ color: 'var(--muted-text-color, #666)' }}>
                                Get the latest articles and news delivered to your inbox
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        className="w-full px-5 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-30 focus:border-2 transition-all duration-300 border"
                                        style={{
                                            background: THEME.bg,
                                            borderColor: THEME.primary,
                                            color: THEME.text,
                                            borderWidth: 2
                                        }}
                                        disabled={isSubscribed}
                                        required
                                    />
                                    <Mail
                                        className="absolute right-3 top-3.5 w-5 h-5"
                                        style={{ color: THEME.primary }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-5 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] border"
                                    style={{
                                        background: isSubscribed
                                            ? '#22c55e'
                                            : THEME.primary,
                                        color: isSubscribed ? '#fff' : THEME.text,
                                        borderColor: THEME.primary,
                                        boxShadow: isSubscribed
                                            ? '0 2px 8px 0 rgba(34,197,94,0.15)'
                                            : `0 2px 8px 0 ${THEME.primary}33`
                                    }}
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
                            <p className="text-xs mt-3" style={{ color: 'var(--muted-text-color, #888)' }}>
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