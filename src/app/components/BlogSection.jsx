import React from 'react'
import Link from 'next/link'

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Strategic Market Expansion in 2023',
      excerpt: 'Key insights on navigating global markets and identifying growth opportunities in the current economic climate.',
      date: 'May 15, 2023',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Optimizing Business Development Pipelines',
      excerpt: 'Proven techniques to streamline your sales funnel and improve conversion rates at every stage.',
      date: 'April 28, 2023',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'The Future of Digital Transformation',
      excerpt: 'How emerging technologies are reshaping business strategies and operational models.',
      date: 'March 10, 2023',
      readTime: '6 min read'
    }
  ]

  return (
    <div className='w-full py-16 px-6 sm:px-12 lg:px-20 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-[#171717] mb-4'>Latest Insights</h2>
          <p className='text-[#525252] max-w-2xl mx-auto'>
            Sharing knowledge and perspectives on business strategy, market trends, and growth opportunities.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => (
            <div key={post.id} className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300'>
              <div className='h-48 bg-[#FDC435]/20 flex items-center justify-center'>
                <span className='text-4xl font-bold text-[#FDC435]'>{post.id}</span>
              </div>
              <div className='p-6'>
                <span className='text-sm text-[#525252]'>{post.date} • {post.readTime}</span>
                <h3 className='text-xl font-bold text-[#171717] mt-2 mb-3'>{post.title}</h3>
                <p className='text-[#525252] mb-4'>{post.excerpt}</p>
                <Link 
                  href="#" 
                  className='text-[#FDC435] font-medium hover:underline flex items-center'
                >
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link 
            href="/blog" 
            className='px-6 py-3 border border-[#FDC435] text-[#FDC435] font-medium rounded-lg hover:bg-[#FDC435]/10 transition-all duration-300 inline-flex items-center'
          >
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogSection