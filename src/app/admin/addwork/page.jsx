"use client"
import { useState } from 'react'
import { toast } from 'react-toastify'

const AddWorkPage = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      if (image) formData.append('image', image)

      const response = await fetch('/api/work', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success('Work image uploaded successfully!')
        setImage(null)
        e.target.reset()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to upload work image')
      }
    } catch (error) {
      console.error('Error uploading work image:', error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-2">Add Work Image</h1>
          <p className="text-gray-600 mb-8">Upload an image for your work</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Image*</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
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
                {loading ? 'Processing...' : 'Upload Image'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddWorkPage
