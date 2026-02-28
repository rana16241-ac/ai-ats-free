import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI-Powered ATS - Free Application Tracking System',
  description: 'Screen candidates with AI-powered resume matching - 100% FREE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-blue-600">
                🚀 AI-ATS
              </a>
              <div className="flex gap-4">
                <a href="/jobs" className="text-sm hover:text-blue-600">
                  Jobs
                </a>
                <a href="/jobs/create" className="text-sm hover:text-blue-600">
                  Create Job
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-16 bg-white">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-600">
            <p>Built with ❤️ for HR professionals • 100% FREE • Open Source</p>
            <p className="mt-2">Powered by Next.js + Supabase + Hugging Face</p>
          </div>
        </footer>
      </body>
    </html>
  )
}