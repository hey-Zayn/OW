"use client"
import { useState } from 'react'
import { toast } from 'react-toastify'

const AddExperiencePage = () => {
  const [data, setData] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success('Experience added successfully!')
        setData({
          company: '',
          position: '',
          duration: '',
          description: ''
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add experience')
      }
    } catch (error) {
      console.error('Error submitting experience:', error)
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-2">Add Experience</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to add your work experience</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="block text-sm font-medium text-black mb-1">Position*</label>
              <input
                type="text"
                name="position"
                value={data.position}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter your position"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Duration*</label>
              <input
                type="text"
                name="duration"
                value={data.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="e.g. Jan 2020 - Present"
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
                placeholder="Describe your role and responsibilities"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Save Experience'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExperiencePage
