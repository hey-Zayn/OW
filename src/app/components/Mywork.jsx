"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

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
    <div
      className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24'
      style={{ background: THEME.bg }}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-4 mb-12'>
          <h2
            className='text-3xl sm:text-4xl md:text-5xl font-bold'
            style={{ color: THEME.text }}
          >
            My <span style={{ color: THEME.primary }}>Work</span>
          </h2>
          <p
            className='text-lg max-w-3xl mx-auto'
            style={{ color: 'var(--muted-text-color, #525252)' }}
          >
            Here are some of my recent projects and case studies
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              style={
                activeCategory === category
                  ? {
                      background: THEME.primary,
                      color: THEME.text,
                      boxShadow: `0 2px 8px 0 ${THEME.primary}22`
                    }
                  : {
                      border: `2px solid ${THEME.primary}`,
                      color: THEME.primary,
                      background: 'transparent'
                    }
              }
              className={`px-6 py-2 font-medium rounded-lg transition-all duration-300 ${
                activeCategory === category
                  ? 'hover:opacity-90'
                  : 'hover:bg-[var(--primary-color)/10]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: THEME.text }}>Loading...</div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredWorks.map((work) => (
                <Link
                  key={work._id}
                  href={`/mywork/${work._id}`}
                  style={{ textDecoration: 'none' }}
                  className='block'
                >
                  <div
                    className='rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col'
                    style={{
                      background: 'var(--card-bg-color, #F9FAFF)',
                      border: `1px solid ${THEME.primary}22`
                    }}
                  >
                    <div style={{ display: 'block' }}>
                      <img 
                        src={work.image} 
                        alt={work.title} 
                        className='w-full h-64 object-cover'
                        style={{ borderBottom: `2px solid ${THEME.primary}` }}
                      />
                    </div>
                    <div className='p-6 space-y-3 flex-1 flex flex-col'>
                      <h3
                        className='text-xl font-bold'
                        style={{ color: THEME.text }}
                      >
                        {work.title.slice(0,100)}
                      </h3>
                      <p
                        className='line-clamp-3'
                        style={{ color: 'var(--muted-text-color, #525252)' }}
                        title={work.description}
                      >
                        {work.description.length > 300 ? `${work.description.substring(0, 300)}...` : work.description}
                      </p>
                      <div className="mt-auto">
                        <span
                          className='font-medium transition-colors duration-200'
                          style={{
                            color: THEME.primary,
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          View Case Study
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredWorks.length === 0 && (
              <div
                className="text-center py-12"
                style={{ color: 'var(--muted-text-color, #525252)' }}
              >
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