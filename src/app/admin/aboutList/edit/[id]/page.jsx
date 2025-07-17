"use client"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const page = () => {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    heading: '',
    details: '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (!id) {
      setError('About entry ID is required')
      setLoading(false)
      return
    }

    const fetchAboutData = async () => {
      try {
        const response = await fetch(`/api/about?id=${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch about data')
        }
        const data = await response.json()
        setFormData({
          heading: data.heading,
          details: data.details,
          image: data.image
        })
        setImagePreview(data.image)
      } catch (err) {
        toast.error(err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAboutData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!id) {
      toast.error('About entry ID is required')
      return
    }

    setIsUploading(true)
    try {
      const form = new FormData()
      form.append('id', id)
      form.append('heading', formData.heading)
      form.append('details', formData.details)
      form.append('currentImage', formData.image)
      
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput.files[0]) {
        form.append('file', fileInput.files[0])
      }

      const response = await fetch('/api/about', {
        method: 'PUT',
        body: form
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update about')
      }

      toast.success('About updated successfully!')
      router.push('/admin/aboutList')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  if (loading) return <div className="text-yellow-500 text-center py-8">Loading...</div>
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Edit About Section</h1>
        <Link 
          href="/admin/aboutList" 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back to List
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium mb-2">Heading</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-black font-medium mb-2">Image</label>
              <div className="flex items-center space-x-4">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-16 w-16 object-cover rounded-md border border-gray-200"
                  />
                )}
                <label className="cursor-pointer">
                  <span className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    {isUploading ? 'Uploading...' : 'Change Image'}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-black font-medium mb-2">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/aboutList')}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-6 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              disabled={isUploading}
            >
              {isUploading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
