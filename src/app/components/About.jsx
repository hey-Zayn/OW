import React from 'react'

const About = () => {
  return (
    <div className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24 bg-white'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='w-full md:w-1/2'>
          <img 
            src="./images/about.jpg" 
            alt="About me" 
            className='w-full h-auto rounded-lg shadow-lg object-cover'
          />
        </div>
        <div className='w-full md:w-1/2 space-y-6'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717]'>
            About <span className='text-[#FDC435]'>Me</span>
          </h2>
          <p className='text-lg text-[#525252] leading-relaxed'>
            I'm a passionate Business Development & Strategy Executive with over 10 years of experience helping companies grow and scale. My expertise lies in identifying new market opportunities, developing strategic partnerships, and driving revenue growth.
          </p>
          <p className='text-lg text-[#525252] leading-relaxed'>
            I combine analytical thinking with creative problem-solving to deliver exceptional results. My approach is data-driven yet human-centered, ensuring strategies that work for both businesses and their customers.
          </p>
          <div className='pt-6'>
            <button className='px-8 py-3 bg-[#FDC435] text-[#171717] font-medium rounded-lg hover:bg-[#fdc435cc] transition-all duration-300 shadow-lg hover:shadow-[#FDC435]/50'>
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About