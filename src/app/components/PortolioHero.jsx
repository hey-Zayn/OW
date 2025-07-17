import React from 'react'

const PortolioHero = () => {
  return (
    <div className='w-full min-h-[80vh] px-6 sm:px-12 lg:px-20 py-16 bg-white flex items-center'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16'>
        <div className='w-full md:w-1/2 space-y-4 md:space-y-6'>
          <span className='text-[#FDC435] text-base md:text-lg font-medium tracking-wider uppercase'>
            Business Development & Strategy Executive
          </span>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] leading-snug'>
            Hi, I'm <span className='text-[#FDC435]'>Olivier Williams</span>
          </h1>
          <h2 className='text-base sm:text-lg text-[#525252] leading-relaxed max-w-lg'>
            I help businesses grow through strategic planning, market expansion, and revenue optimization. With over a decade of experience, I deliver measurable results.
          </h2>
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <button className='px-6 py-2.5 bg-[#FDC435] text-[#171717] font-medium rounded-md hover:bg-[#fdc435cc] transition-all duration-300 shadow-md hover:shadow-[#FDC435]/40'>
              View Portfolio
            </button>
            <button className='px-6 py-2.5 border border-[#FDC435] text-[#FDC435] font-medium rounded-md hover:bg-[#FDC435]/10 transition-all duration-300'>
              Contact Me
            </button>
          </div>
        </div>
        <div className='w-full md:w-1/2 mt-8 md:mt-0 flex justify-center'>
          <img 
            src="./images/hero.png" 
            alt="Professional portrait of Olivier Williams" 
            className='w-full max-w-md h-auto rounded-lg object-cover shadow-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default PortolioHero