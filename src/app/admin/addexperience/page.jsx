"use client"
import { useState } from 'react'
import { toast } from 'react-toastify'

const AddExperiencePage = () => {
  const [data, setData] = useState({
    company: '',
    position: '',
    location: '',
    duration: '',
    description: '',
    skills: []
  })
  const [loading, setLoading] = useState(false)
  const [skillInput, setSkillInput] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
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
            location: '',
            duration: '',
            description: '',
            skills: []
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
              <label className="block text-sm font-medium text-black mb-1">Location*</label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                placeholder="Enter location"
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
              <p className="text-xs text-gray-500 mt-1">
                {data.description.length} characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all bg-white/90 text-black"
                  placeholder="Enter a skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-1 px-3 py-1 bg-black rounded-full">
                    <span className="text-sm">{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-yellow-700 hover:text-yellow-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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
