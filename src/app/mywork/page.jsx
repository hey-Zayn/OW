'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const page = ({ params }) => {
  const router = useRouter()
  const [works, setWorks] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredWorks, setFilteredWorks] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('/api/work')
        const data = response.data.data
        // Ensure data is an array before processing
        const worksArray = Array.isArray(data) ? data : []
        if (worksArray.length === 0) {
          setError('No works found in the database')
        }
        setWorks(worksArray)
        setFilteredWorks(worksArray)
        // Only set categories if we have works
        if (worksArray.length > 0) {
          const uniqueCategories = ['All', ...new Set(worksArray.map(work => work.category).filter(Boolean))]
          setCategories(uniqueCategories)
        }
      } catch (error) {
        setError('Failed to fetch works. Please try again later.')
        setWorks([])
        setFilteredWorks([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  const handleFilter = (category) => {
    setActiveCategory(category)
    if (category === 'All') {
      setFilteredWorks(works)
    } else {
      setFilteredWorks(works.filter(work => work.category === category))
    }
  }

  const handleProjectClick = (id) => {
    router.push(`/mywork/${id}`)
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: THEME.bg }}
        >
          <div className="text-center">
            <p className="text-lg" style={{ color: 'var(--muted-text-color, #525252)' }}>
              Loading works...
            </p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: THEME.bg }}
        >
          <div className="text-center">
            <p className="text-lg" style={{ color: 'red' }}>{error}</p>
            {error.includes('database') && (
              <p className="text-sm mt-2" style={{ color: 'var(--muted-text-color, #525252)' }}>
                Please check your API endpoint or database connection
              </p>
            )}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen" style={{ background: THEME.bg }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-10">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: THEME.text }}
            >
              My{' '}
              <span
                style={{
                  color: THEME.primary,
                  background: `${THEME.primary}20`,
                  borderRadius: 6,
                  padding: '0 0.5em',
                }}
              >
                Portfolio
              </span>
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--muted-text-color, #525252)' }}
            >
              A curated collection of my finest professional works and projects.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                style={{
                  background:
                    activeCategory === category
                      ? THEME.primary
                      : THEME.bg,
                  color:
                    activeCategory === category
                      ? THEME.bg
                      : THEME.text,
                  borderColor:
                    activeCategory === category
                      ? THEME.primary
                      : `${THEME.primary}40`,
                  boxShadow:
                    activeCategory === category
                      ? `0 2px 8px 0 ${THEME.primary}22`
                      : 'none',
                  cursor: 'pointer',
                  outline: activeCategory === category ? `2px solid ${THEME.primary}` : 'none',
                  fontWeight: activeCategory === category ? 700 : 500,
                }}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredWorks.length > 0 ? (
              filteredWorks.map((work) => (
                <div
                  key={work._id}
                  className="group rounded-2xl overflow-hidden shadow-xl border transition-all duration-400 hover:-translate-y-2 flex flex-col h-full relative cursor-pointer"
                  style={{
                    background: THEME.bg,
                    borderColor: 'rgba(0,0,0,0.04)',
                    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
                  }}
                  onClick={() => handleProjectClick(work._id)}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      style={{
                        background: '#f3f3f3',
                        borderBottom: `2px solid ${THEME.primary}22`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background: 'rgba(0,0,0,0.08)',
                        pointerEvents: 'none',
                      }}
                    ></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      {/* Project Type Badge */}
                      <div className="flex flex-col">
                        <span
                          className="inline-block px-3 py-1 text-xs font-semibold rounded-full border shadow-sm mb-1"
                          style={{
                            background: `${THEME.primary}18`,
                            color: THEME.primary,
                            borderColor: `${THEME.primary}33`,
                            fontWeight: 600,
                          }}
                        >
                          {work.company || 'Personal Project'}
                        </span>
                        {work.category && (
                          <span
                            className="inline-block px-2 py-1 text-[10px] font-medium rounded-full"
                            style={{
                              background: `${THEME.primary}08`,
                              color: THEME.text,
                              border: `1px solid ${THEME.primary}18`,
                              marginTop: 2,
                            }}
                          >
                            {work.category}
                          </span>
                        )}
                      </div>

                      {/* Project Timeline */}
                      <div className="flex flex-col items-end space-y-1">
                        <div
                          className="flex items-center px-2 py-1 rounded"
                          style={{
                            background: `${THEME.bg}`,
                            border: `1px solid ${THEME.primary}18`,
                          }}
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: THEME.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-medium" style={{ color: 'var(--muted-text-color, #525252)' }}>
                            Posted: {new Date(work.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        {work.completionDate && (
                          <div
                            className="flex items-center px-2 py-1 rounded"
                            style={{
                              background: `${THEME.bg}`,
                              border: `1px solid ${THEME.primary}18`,
                            }}
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'green' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs font-medium" style={{ color: 'var(--muted-text-color, #525252)' }}>
                              Completed: {new Date(work.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3
                      className="text-xl font-bold mb-3 group-hover:underline transition-colors"
                      style={{
                        color: THEME.text,
                        transition: 'color 0.2s',
                        cursor: 'pointer',
                      }}
                    >
                      {work.title}
                    </h3>
                    <p
                      className="mb-5 line-clamp-3"
                      style={{ color: 'var(--muted-text-color, #525252)' }}
                    >
                      {work.description.length > 100 ? `${work.description.substring(0, 100)}...` : work.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-5">
                        {work.technologies?.slice(0, 4).map(tech => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{
                              background: `${THEME.primary}10`,
                              color: THEME.primary,
                              fontWeight: 500,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link href={`/mywork/${work._id}`}>
                        <div
                          className="w-full px-4 py-3 rounded-lg text-sm font-medium transition-all text-center block"
                          style={{
                            background: THEME.primary,
                            color: THEME.bg,
                            fontWeight: 600,
                            border: `1.5px solid ${THEME.primary}`,
                            boxShadow: `0 2px 8px 0 ${THEME.primary}22`,
                            cursor: 'pointer',
                          }}
                          aria-label={`View details of ${work.title}`}
                        >
                          View Project
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl mb-4" style={{ color: 'var(--muted-text-color, #525252)' }}>
                  No works match the selected filter
                </p>
                <button
                  onClick={() => handleFilter('All')}
                  className="px-8 py-3 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: THEME.primary,
                    color: THEME.bg,
                    fontWeight: 600,
                    border: `1.5px solid ${THEME.primary}`,
                    boxShadow: `0 2px 8px 0 ${THEME.primary}22`,
                    cursor: 'pointer',
                  }}
                >
                  Show All Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page