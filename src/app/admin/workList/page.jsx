"use client"
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

const WorkListPage = () => {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/work', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch works')
        }
        
        const { data } = await response.json()
        setWorks(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this work?')) {
      try {
        const response = await fetch(`/api/work`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete work')
        }
        
        const { data: deletedWork } = await response.json()
        setWorks(works.filter(work => work._id !== deletedWork._id))
        toast.success('Work deleted successfully')
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse bg-white/80 rounded-xl p-8 border border-yellow-500/30">
            <div className="h-8 bg-yellow-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-yellow-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-yellow-500/30">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-black mb-6">Work List</h1>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-yellow-200">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Technologies</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Categories</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-yellow-200">
                  {works?.map((work) => (
                    <tr key={work._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={work.image} 
                          alt={work.title} 
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{work.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{work.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {work.technologies?.map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {work.categories?.map((category, i) => (
                            <span key={i} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {category}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{work.completionDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${work.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {work.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link 
                            href={`/admin/workList/edit/${work._id}`}
                            className="px-3 py-1.5 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(work._id)}
                            className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkListPage
