"use client"
import { useState } from 'react'
import { toast } from 'react-toastify'

const AddWorkPage = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    technologies: [],
    categories: [],
    completionDate: '',
    featured: false,
    company: '',
    image: null
  })
  const [loading, setLoading] = useState(false)
  const [techInput, setTechInput] = useState('')

  const categoriesList = [
    'Business Strategy',
    'Market Expansion',
    'Revenue Growth',
    'Partnership Development',
    'Digital Transformation',
    'Product Development',
    'Operational Efficiency',
    'Customer Experience',
    'Data Analytics',
    'International Business',
    'Mergers & Acquisitions',
    'Startup Consulting',
    'Business Development & Strategy Executive'
  ]

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target
    setData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : 
              type === 'checkbox' ? checked : value
    }))
  }

  const handleCategoryChange = (category) => {
    setData(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
      return {
        ...prev,
        categories: newCategories
      }
    })
  }

  const handleTechAdd = () => {
    if (techInput.trim() && !data.technologies.includes(techInput.trim())) {
      setData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const handleTechRemove = (tech) => {
    setData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('completionDate', data.completionDate)
      formData.append('featured', data.featured)
      formData.append('company', data.company)
      data.technologies.forEach(tech => formData.append('technologies', tech))
      data.categories.forEach(category => formData.append('categories', category))
      if (data.image) formData.append('image', data.image)

      const response = await fetch('/api/work', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success('Work added successfully!')
        setData({
          title: '',
          description: '',
          technologies: [],
          categories: [],
          completionDate: '',
          featured: false,
          company: '',
          image: null
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add work')
      }
    } catch (error) {
      console.error('Error submitting work:', error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-2">Add Work</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to add your work</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter work title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Description*</label>
              <textarea
                rows={6}
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Describe your work"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Categories*</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categoriesList.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={data.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor={category} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Technologies*</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                  placeholder="Add technology"
                />
                <button
                  type="button"
                  onClick={handleTechAdd}
                  className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map(tech => (
                  <span key={tech} className="flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-full">
                    {tech}
                    <button 
                      type="button" 
                      onClick={() => handleTechRemove(tech)}
                      className="text-yellow-700 hover:text-yellow-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Completion Date*</label>
              <input
                type="text"
                name="completionDate"
                value={data.completionDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="e.g. June 2023"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Company*</label>
              <input
                type="text"
                name="company"
                value={data.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Featured</label>
              <select
                name="featured"
                value={data.featured}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Image*</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                accept="image/*"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Save Work'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddWorkPage
