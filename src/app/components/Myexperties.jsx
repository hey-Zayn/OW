import React from 'react'

const Myexperties = () => {
  return (
    <div className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24 bg-white'>
      <div className='max-w-7xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717]'>
            My <span className='text-[#FDC435]'>Expertise</span>
          </h2>
          <p className='text-lg text-[#525252] max-w-3xl mx-auto'>
            Here are the key areas where I excel and can deliver exceptional value to your business
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Expertise Card 1 */}
          <div className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Business Strategy</h3>
            <p className='text-[#525252] leading-relaxed'>
              Developing comprehensive business strategies that drive growth and competitive advantage in dynamic markets.
            </p>
          </div>

          {/* Expertise Card 2 */}
          <div className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Market Expansion</h3>
            <p className='text-[#525252] leading-relaxed'>
              Identifying and executing successful market entry strategies to expand your business reach and customer base.
            </p>
          </div>

          {/* Expertise Card 3 */}
          <div className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Revenue Growth</h3>
            <p className='text-[#525252] leading-relaxed'>
              Implementing data-driven approaches to optimize revenue streams and maximize profitability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Myexperties