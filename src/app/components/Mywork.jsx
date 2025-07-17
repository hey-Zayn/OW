import React from 'react'

const Mywork = () => {
  return (
    <div className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717]'>
            My <span className='text-[#FDC435]'>Work</span>
          </h2>
          <p className='text-lg text-[#525252] max-w-3xl mx-auto'>
            Here are some of my recent projects and case studies
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          <button className='px-6 py-2 bg-[#FDC435] text-[#171717] font-medium rounded-lg hover:bg-[#fdc435cc] transition-all duration-300'>
            All Work
          </button>
          <button className='px-6 py-2 border border-[#FDC435] text-[#FDC435] font-medium rounded-lg hover:bg-[#FDC435]/10 transition-all duration-300'>
            Business Strategy
          </button>
          <button className='px-6 py-2 border border-[#FDC435] text-[#FDC435] font-medium rounded-lg hover:bg-[#FDC435]/10 transition-all duration-300'>
            Market Expansion
          </button>
          <button className='px-6 py-2 border border-[#FDC435] text-[#FDC435] font-medium rounded-lg hover:bg-[#FDC435]/10 transition-all duration-300'>
            Revenue Growth
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Work Item 1 */}
          <div className='bg-[#F9FAFF] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
            <img 
              src="./images/work1.jpg" 
              alt="Project 1" 
              className='w-full h-64 object-cover'
            />
            <div className='p-6 space-y-3'>
              <h3 className='text-xl font-bold text-[#171717]'>Market Expansion Strategy</h3>
              <p className='text-[#525252]'>Developed comprehensive market entry plan for European expansion</p>
              <button className='text-[#FDC435] font-medium hover:underline'>View Case Study</button>
            </div>
          </div>

          {/* Work Item 2 */}
          <div className='bg-[#F9FAFF] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
            <img 
              src="./images/work2.jpg" 
              alt="Project 2" 
              className='w-full h-64 object-cover'
            />
            <div className='p-6 space-y-3'>
              <h3 className='text-xl font-bold text-[#171717]'>Revenue Optimization</h3>
              <p className='text-[#525252]'>Implemented pricing strategy that increased margins by 22%</p>
              <button className='text-[#FDC435] font-medium hover:underline'>View Case Study</button>
            </div>
          </div>

          {/* Work Item 3 */}
          <div className='bg-[#F9FAFF] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
            <img 
              src="./images/work3.jpg" 
              alt="Project 3" 
              className='w-full h-64 object-cover'
            />
            <div className='p-6 space-y-3'>
              <h3 className='text-xl font-bold text-[#171717]'>Partnership Development</h3>
              <p className='text-[#525252]'>Built strategic alliances that drove 35% revenue growth</p>
              <button className='text-[#FDC435] font-medium hover:underline'>View Case Study</button>
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <button className='px-8 py-3 border border-[#FDC435] text-[#FDC435] font-medium rounded-lg hover:bg-[#FDC435]/10 transition-all duration-300'>
            View All Projects
          </button>
        </div>
      </div>
    </div>
  )
}

export default Mywork