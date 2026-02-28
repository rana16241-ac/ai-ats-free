'use client'

import { Briefcase, Upload, Brain, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          AI-Powered ATS
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Screen candidates with AI-powered resume matching
        </p>
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
          <CheckCircle className="w-5 h-5" />
          100% FREE • No Credit Card Required
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="border rounded-lg p-6 bg-white">
          <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create Jobs</h3>
          <p className="text-gray-600">
            Define job requirements, skills, and experience levels
          </p>
        </div>
        <div className="border rounded-lg p-6 bg-white">
          <Upload className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Upload Resumes</h3>
          <p className="text-gray-600">
            Support for PDF, DOCX, and LinkedIn profiles
          </p>
        </div>
        <div className="border rounded-lg p-6 bg-white">
          <Brain className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
          <p className="text-gray-600">
            Get detailed match scores and recommendations
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg p-8 mb-16 border">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              1
            </div>
            <h4 className="font-semibold mb-2">Create Job</h4>
            <p className="text-sm text-gray-600">Define requirements and skills</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              2
            </div>
            <h4 className="font-semibold mb-2">Upload Resume</h4>
            <p className="text-sm text-gray-600">PDF, DOCX, or LinkedIn</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              3
            </div>
            <h4 className="font-semibold mb-2">AI Analysis</h4>
            <p className="text-sm text-gray-600">Semantic matching + scoring</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              4
            </div>
            <h4 className="font-semibold mb-2">Get Results</h4>
            <p className="text-sm text-gray-600">Detailed match report</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/jobs/create"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Create Your First Job →
        </a>
      </div>

      {/* Tech Stack */}
      <div className="mt-16 border-t pt-8">
        <h3 className="text-center text-sm font-semibold text-gray-600 mb-4">
          POWERED BY
        </h3>
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <span>Next.js 14</span>
          <span>•</span>
          <span>Supabase</span>
          <span>•</span>
          <span>Hugging Face AI</span>
          <span>•</span>
          <span>Vercel</span>
        </div>
      </div>
    </div>
  )
}