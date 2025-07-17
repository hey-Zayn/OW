'use client'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A full-featured online store with payment integration and inventory management.',
    image: '/project1.jpg'
  },
  {
    id: 2,
    title: 'Mobile App UI',
    category: 'UI/UX Design',
    description: 'Modern mobile application interface with intuitive user experience.',
    image: '/project2.jpg'
  },
  {
    id: 3,
    title: 'Brand Identity',
    category: 'Branding',
    description: 'Complete visual identity system for a tech startup.',
    image: '/project3.jpg'
  },
  {
    id: 4,
    title: 'Marketing Strategy',
    category: 'Digital Marketing',
    description: 'Comprehensive digital marketing plan for a retail brand.',
    image: '/project4.jpg'
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    category: 'Web Development',
    description: 'Interactive data visualization dashboard for business metrics.',
    image: '/project5.jpg'
  },
  {
    id: 6,
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description: 'Viral social media campaign with influencer partnerships.',
    image: '/project6.jpg'
  }
]

const categories = ['All', ...new Set(projects.map(project => project.category))]

const page = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleFilter = (category) => {
    setActiveCategory(category)
    if (category === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === category))
    }
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#171717] mb-6">
              My <span className="text-yellow-500">Work</span>
            </h1>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto">
              Explore my portfolio of professional projects across various disciplines.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-yellow-500 text-[#171717] shadow-lg hover:shadow-yellow-500/30'
                    : 'bg-white text-[#171717] border border-yellow-500/30 hover:bg-yellow-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-yellow-500/20 hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-800 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#171717] mb-2">{project.title}</h3>
                  <p className="text-[#525252] mb-4">{project.description}</p>
                  <button className="px-4 py-2 bg-yellow-500 text-[#171717] rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page