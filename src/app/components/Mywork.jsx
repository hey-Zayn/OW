"use client"
import React, { useState, useEffect } from 'react'

const Mywork = () => {
  const [works, setWorks] = useState([])
  const [filteredWorks, setFilteredWorks] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('All Work')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/work')
        if (!response.ok) throw new Error('Failed to fetch works')
        const { data } = await response.json()
        setWorks(data)
        setFilteredWorks(data)
        
        // Extract unique categories
        const allCategories = data.flatMap(work => work.categories || [])
        const uniqueCategories = ['All Work', ...new Set(allCategories)]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching works:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  const handleFilter = (category) => {
    setActiveCategory(category)
    if (category === 'All Work') {
      setFilteredWorks(works)
    } else {
      const filtered = works.filter(work => 
        work.categories && work.categories.includes(category)
      )
      setFilteredWorks(filtered)
    }
  }

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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-6 py-2 ${
                activeCategory === category
                  ? 'bg-[#FDC435] text-[#171717] hover:bg-[#fdc435cc]'
                  : 'border border-[#FDC435] text-[#FDC435] hover:bg-[#FDC435]/10'
              } font-medium rounded-lg transition-all duration-300`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredWorks.map((work) => (
                <div key={work._id} className='bg-[#F9FAFF] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'>
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className='w-full h-64 object-cover'
                  />
                  <div className='p-6 space-y-3'>
                    <h3 className='text-xl font-bold text-[#171717]'>{work.title.slice(0,100)}</h3>
                    <p className='text-[#525252] line-clamp-3' title={work.description}>
                      {work.description.length > 300 ? `${work.description.substring(0, 300)}...` : work.description}
                    </p>
                    <button className='text-[#FDC435] font-medium hover:underline'>View Case Study</button>
                  </div>
                </div>
              ))}
            </div>

            {filteredWorks.length === 0 && (
              <div className="text-center py-12 text-[#525252]">
                No projects found in this category
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Mywork