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
    company: '',
    position: '',
    duration: '',
    description: ''
  })

  useEffect(() => {
    if (!id) {
      setError('Experience ID is required')
      setLoading(false)
      return
    }

    const fetchExperienceData = async () => {
      try {
        const response = await fetch(`/api/experience?id=${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch experience data')
        }
        const { data } = await response.json()
        setFormData({
          company: data.company,
          position: data.position,
          duration: data.duration,
          description: data.description
        })
      } catch (err) {
        toast.error(err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchExperienceData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!id) {
      toast.error('Experience ID is required')
      return
    }

    try {
      const response = await fetch('/api/experience', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          ...formData
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update experience')
      }

      toast.success('Experience updated successfully!')
      router.push('/admin/experienceList')
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (loading) return <div className="text-yellow-500 text-center py-8">Loading...</div>
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Edit Experience</h1>
        <Link 
          href="/admin/experienceList" 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back to List
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-medium mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-black font-medium mb-2">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-black font-medium mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/experienceList')}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-6 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
