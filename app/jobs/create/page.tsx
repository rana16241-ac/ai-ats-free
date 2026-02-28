'use client'

import { useState } from 'react'
import { supabase } from '@/lib/db/supabase'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experience_required: 0,
    education_level: 'Any',
  })
  const [skills, setSkills] = useState<Array<{ name: string; importance: 'Must-Have' | 'Nice-to-Have' }>>([])
  const [newSkill, setNewSkill] = useState({ name: '', importance: 'Must-Have' as 'Must-Have' | 'Nice-to-Have' })

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill }])
      setNewSkill({ name: '', importance: 'Must-Have' })
    }
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (skills.length === 0) {
      alert('Please add at least one skill')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([
          {
            ...formData,
            required_skills: skills,
          },
        ])
        .select()

      if (error) throw error

      alert('Job created successfully!')
      router.push(`/jobs/${data[0].id}`)
    } catch (error) {
      console.error('Error creating job:', error)
      alert('Failed to create job. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Create New Job</h1>
      <p className="text-gray-600 mb-8">Define job requirements and start screening candidates</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-8">
        {/* Job Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Senior Full Stack Developer"
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            minLength={50}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
            placeholder="Describe the role, responsibilities, and requirements (minimum 50 characters)"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/50 characters minimum
          </p>
        </div>

        {/* Required Skills */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Required Skills <span className="text-red-500">*</span>
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React, Python, AWS"
            />
            <select
              value={newSkill.importance}
              onChange={(e) => setNewSkill({ ...newSkill, importance: e.target.value as 'Must-Have' | 'Nice-to-Have' })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Must-Have">Must-Have</option>
              <option value="Nice-to-Have">Nice-to-Have</option>
            </select>
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  skill.importance === 'Must-Have'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <span>{skill.name}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="hover:opacity-70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Required */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Experience Required (years)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={formData.experience_required}
            onChange={(e) => setFormData({ ...formData, experience_required: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Education Level */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Education Level
          </label>
          <select
            value={formData.education_level}
            onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Any">Any</option>
            <option value="Bachelor's">Bachelor's Degree</option>
            <option value="Master's">Master's Degree</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>
          <a
            href="/jobs"
            className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}