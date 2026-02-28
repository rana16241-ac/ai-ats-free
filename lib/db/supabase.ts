import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Job = {
  id: string
  title: string
  description: string
  required_skills: Array<{
    name: string
    importance: 'Must-Have' | 'Nice-to-Have'
  }>
  experience_required: number
  education_level: string
  created_at: string
}

export type Candidate = {
  id: string
  job_id: string
  name: string | null
  email: string | null
  resume_text: string
  resume_url: string | null
  linkedin_url: string | null
  created_at: string
}

export type Match = {
  id: string
  candidate_id: string
  job_id: string
  overall_score: number
  keyword_score: number
  semantic_score: number
  skills_score: number
  experience_score: number
  matched_skills: string[]
  missing_skills: string[]
  matched_keywords: Array<{ keyword: string; count: number }>
  missing_keywords: string[]
  recommendation: 'Interview' | 'Phone Screen' | 'Reject'
  created_at: string
}