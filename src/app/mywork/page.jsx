'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
        console.log(data);
        
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
        console.error('Error fetching works:', error)
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
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-[#525252]">Loading works...</p>
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
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-500">{error}</p>
            {error.includes('database') && (
              <p className="text-sm text-[#525252] mt-2">Please check your API endpoint or database connection</p>
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
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#171717] mb-6">
              My <span className="text-yellow-500">Portfolio</span>
            </h1>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto">
              A curated collection of my finest professional works and projects.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg hover:shadow-yellow-500/40'
                    : 'bg-white text-[#171717] border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50'
                }`}
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
                  className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative cursor-pointer"
                  onClick={() => handleProjectClick(work._id)}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      {/* Project Type Badge */}
                      <div className="flex flex-col">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-500/10 text-yellow-700 rounded-full border border-yellow-500/20 shadow-sm mb-1">
                          {work.company || 'Personal Project'}
                        </span>
                        {work.category && (
                          <span className="inline-block px-2 py-1 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full">
                            {work.category}
                          </span>
                        )}
                      </div>
                      
                      {/* Project Timeline */}
                      <div className="flex flex-col items-end space-y-1">
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                          <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-600 font-medium">
                            Posted: {new Date(work.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        {work.completionDate && (
                          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                            <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-gray-600 font-medium">
                              Completed: {new Date(work.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#171717] mb-3 group-hover:text-yellow-600 transition-colors">{work.title}</h3>
                    <p className="text-[#525252] mb-5 line-clamp-3">
                      {work.description.length > 100 ? `${work.description.substring(0, 100)}...` : work.description}
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-5">
                        {work.technologies?.slice(0, 4).map(tech => (
                          <span key={tech} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-[#525252] font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link href={`/mywork/${work._id}`}>
                        <div 
                          className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg text-center block"
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
                <p className="text-xl text-[#525252] mb-4">No works match the selected filter</p>
                <button 
                  onClick={() => handleFilter('All')} 
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg"
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