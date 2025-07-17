"use client"
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

const EditWorkPage = () => {
  const { id } = useParams()
  const router = useRouter()
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

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await fetch(`/api/work?id=${id}`)
        if (!response.ok) throw new Error('Failed to fetch work')
        const { data: work } = await response.json()
        setData({
          title: work.title,
          description: work.description,
          technologies: work.technologies || [],
          categories: work.categories || [],
          completionDate: work.completionDate,
          featured: work.featured,
          company: work.company,
          image: work.image
        })
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchWork()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }))
  }

  const handleTechAdd = () => {
    if (techInput.trim() && !data.technologies.includes(techInput.trim())) {
      setData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const handleTechRemove = (tech) => {
    setData(prev => ({
      ...prev,
      technologies: (prev.technologies || []).filter(t => t !== tech)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const jsonData = {
        id,
        title: data.title,
        description: data.description,
        completionDate: data.completionDate,
        featured: data.featured,
        company: data.company,
        technologies: data.technologies || [],
        categories: data.categories || [],
      }

      if (data.image && typeof data.image !== 'string') {
        const reader = new FileReader();
        const imageBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(data.image);
        });
        jsonData.image = { base64: imageBase64 };
      } else if (data.image) {
        jsonData.image = data.image;
      }

      const response = await fetch('/api/work', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      })

      if (response.ok) {
        toast.success('Work updated successfully!')
        router.push('/admin/workList')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update work')
      }
    } catch (error) {
      console.error('Error updating work:', error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-2">Edit Work</h1>
          <p className="text-gray-600 mb-8">Update the details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={data.title || ''}
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
                value={data.description || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Describe your work"
                required
              />
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
                {(data.technologies || []).map(tech => (
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
              <label className="block text-sm font-medium text-black mb-1">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categoriesList.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 text-sm rounded-full ${data.categories?.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Completion Date*</label>
              <input
                type="text"
                name="completionDate"
                value={data.completionDate || ''}
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
                value={data.company || ''}
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
                value={data.featured || false}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                accept="image/*"
              />
              {data.image && typeof data.image === 'string' && (
                <img 
                  src={data.image} 
                  alt="Current work image" 
                  className="mt-2 h-24 w-24 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Work'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditWorkPage
