"use client"
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddAboutPage = () => {
  const [data, setData] = useState({
    heading: '',
    details: '',
    image: null
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setData(prev => ({
        ...prev,
        image: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', data.image)
      formData.append('heading', data.heading)
      formData.append('details', data.details)

      const response = await fetch('/api/about', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success('About section added successfully!')
        setData({
          heading: '',
          details: '',
          image: null
        })
        document.getElementById('about-image').value = ''
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add about section')
      }
    } catch (error) {
      console.error('Error submitting about section:', error)
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
          <h1 className="text-3xl font-bold text-black mb-2">Add About Section</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to create your about section</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Heading*</label>
              <input
                type="text"
                name="heading"
                value={data.heading}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter heading"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Details*</label>
              <textarea
                rows={6}
                name="details"
                value={data.details}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter details about yourself"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Profile Image*</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-yellow-500/30 border-dashed rounded-lg cursor-pointer bg-yellow-50/50 hover:bg-yellow-50 transition group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-yellow-500 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mb-2 text-sm text-black group-hover:text-black">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-black group-hover:text-black">
                      {data.image ? data.image.name : 'PNG, JPG or JPEG (MAX. 5MB)'}
                    </p>
                  </div>
                  <input 
                    id="about-image" 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Save About Section'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAboutPage
