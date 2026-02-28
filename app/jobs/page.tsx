'use client'

import { useEffect, useState } from 'react'
import { supabase, Job } from '@/lib/db/supabase'
import { Briefcase, Plus, Calendar } from 'lucide-react'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading jobs...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Openings</h1>
          <p className="text-gray-600">Manage your job postings and candidates</p>
        </div>
        <a
          href="/jobs/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Create Job
        </a>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No jobs yet</h3>
          <p className="text-gray-600 mb-6">Create your first job posting to get started</p>
          <a
            href="/jobs/create"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Your First Job
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <a
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block bg-white rounded-lg border p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{job.description}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {job.experience_required}+ years
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.required_skills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm ${
                      skill.importance === 'Must-Have'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
                {job.required_skills.length > 5 && (
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                    +{job.required_skills.length - 5} more
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(job.created_at).toLocaleDateString()}
                </div>
                <div>Education: {job.education_level || 'Any'}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}