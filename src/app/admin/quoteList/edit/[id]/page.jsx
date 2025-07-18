"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const EditQuotePage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [data, setData] = useState({
    quote: '',
    author: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/quotes?id=${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch quote')
        }
        const { data: quoteData } = await response.json()
        setData({
          quote: quoteData.quote,
          author: quoteData.author
        })
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchQuote()
  }, [id])

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
      const response = await fetch(`/api/quotes?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success('Quote updated successfully!')
        router.push('/admin/quoteList')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update quote')
      }
    } catch (error) {
      console.error('Error updating quote:', error)
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
          <h1 className="text-3xl font-bold text-black mb-2">Edit Quote</h1>
          <p className="text-gray-600 mb-8">Update the quote details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Quote*</label>
              <textarea
                rows={4}
                name="quote"
                value={data.quote}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter the quote"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Author*</label>
              <input
                type="text"
                name="author"
                value={data.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditQuotePage
