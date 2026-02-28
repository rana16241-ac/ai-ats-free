# 🚀 AI-Powered ATS - FREE Application Tracking System

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Free-green)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, AI-driven Application Tracking System that helps HR professionals screen candidates by matching resumes and LinkedIn profiles against job requirements - **completely FREE** with zero operational costs.

![AI-ATS Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=AI-Powered+ATS)

## ✨ Features

### Phase 1 - MVP (Current)
- ✅ **Job Creation** - Define job requirements with skills, experience, and education levels
- ✅ **Resume Upload** - Support for PDF and DOCX file parsing
- ✅ **LinkedIn Integration** - Manual PDF upload and experimental auto-scraping
- ✅ **AI-Powered Matching Engine**
  - Keyword Matching (30% weight)
  - Semantic Similarity (40% weight)
  - Skills Matching (20% weight)
  - Experience Matching (10% weight)
- ✅ **Detailed Match Reports** - Comprehensive scoring with recommendations
- ✅ **Spelling Mistake Handling** - Fuzzy matching for typos and variations

## 🛠️ Tech Stack (100% FREE)

| Technology | Purpose | Free Tier |
|------------|---------|-----------|
| **Next.js 14** | Frontend Framework | Unlimited |
| **TypeScript** | Type Safety | Unlimited |
| **TailwindCSS** | Styling | Unlimited |
| **Supabase** | Database & Storage | 500MB DB + 1GB storage |
| **Hugging Face** | AI Inference API | 30,000 requests/month |
| **Vercel** | Hosting | 100GB bandwidth |

## 💰 Cost Breakdown

| Service | Free Tier | Usage Estimate | Monthly Cost |
|---------|-----------|----------------|--------------|
| Vercel Hosting | 100GB bandwidth | ~1000 users/month | **$0** |
| Supabase Database | 500MB + 1GB storage | ~500 candidates | **$0** |
| Hugging Face API | 30,000 requests/month | ~1000 matches/month | **$0** |
| Domain (optional) | N/A | Use vercel.app subdomain | **$0** |
| **TOTAL** | | | **$0/month** |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Free accounts on Supabase and Hugging Face

### 1. Clone the Repository

```bash
git clone https://github.com/rana16241-ac/ai-ats-free.git
cd ai-ats-free
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run this SQL:

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills JSONB NOT NULL,
  experience_required INTEGER DEFAULT 0,
  education_level TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id),
  name TEXT,
  email TEXT,
  resume_text TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidates(id),
  job_id UUID REFERENCES jobs(id),
  overall_score DECIMAL,
  keyword_score DECIMAL,
  semantic_score DECIMAL,
  skills_score DECIMAL,
  experience_score DECIMAL,
  matched_skills JSONB,
  missing_skills JSONB,
  matched_keywords JSONB,
  missing_keywords JSONB,
  recommendation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Go to **Settings → API** and copy:
   - Project URL
   - Anon/Public Key

### 4. Get Hugging Face API Key

1. Go to [https://huggingface.co](https://huggingface.co)
2. Sign up (free)
3. Go to **Settings → Access Tokens**
4. Create new token
5. Copy the token

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Deploy to Vercel (FREE)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Add your environment variables in the Vercel dashboard.

## 📊 How AI Matching Works

### Scoring Algorithm

```
Overall Score = (Keyword × 0.3) + (Semantic × 0.4) + (Skills × 0.2) + (Experience × 0.1)
```

### Components

1. **Keyword Matching (30%)**
   - Extracts important keywords from job description
   - Counts occurrences in resume
   - Handles spelling mistakes with fuzzy matching

2. **Semantic Similarity (40%)**
   - Uses Hugging Face sentence-transformers
   - Compares meaning, not just words
   - Model: `sentence-transformers/all-MiniLM-L6-v2`

3. **Skills Matching (20%)**
   - Exact + fuzzy matching
   - Weights: Must-Have (1.0), Nice-to-Have (0.5)
   - Handles variations (JS → JavaScript)

4. **Experience Matching (10%)**
   - Extracts years from resume
   - Compares with job requirements

### Recommendations

- **85-100%**: ✅ **STRONG MATCH** → Schedule Interview
- **70-84%**: ⚠️ **MODERATE MATCH** → Phone Screen
- **0-69%**: ❌ **WEAK MATCH** → Reject

## 🔗 LinkedIn Integration

### Option 1: Manual Upload (Recommended)
1. Go to LinkedIn profile
2. Click "More" → "Save to PDF"
3. Upload PDF to ATS

### Option 2: Auto-Scraping (Experimental)
- Scrapes public profile data
- May fail due to LinkedIn restrictions
- Risk of IP blocking
- **Disclaimer shown to users**

## 📈 Free Tier Limits

| Resource | Limit | Estimated Usage |
|----------|-------|-----------------|
| Hugging Face API | 30k requests/month | ~1000 candidates |
| Supabase Storage | 1GB | ~200-500 resumes |
| Vercel Bandwidth | 100GB | ~10k page views |
| LinkedIn Scraping | ~50-100/day | Manual recommended |

## 🎯 When You'll Need to Pay

- **>1000 candidates/month**: Upgrade Hugging Face or self-host models
- **>500 resumes stored**: Upgrade Supabase ($25/month)
- **>10k users/month**: Upgrade Vercel ($20/month)

## 📁 Project Structure

```
ai-ats-free/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── jobs/
│   │   ├── page.tsx               # Jobs list
│   │   ├── create/page.tsx        # Create job
│   │   └── [jobId]/
│   │       ├── page.tsx           # Job details
│   │       └── candidates/
│   │           ├── add/page.tsx   # Add candidate
│   │           └── [candidateId]/results/page.tsx
│   └── api/
│       ├── jobs/route.ts          # Job CRUD
│       ├── candidates/route.ts    # Upload handler
│       ├── match/route.ts         # AI matching
│       └── linkedin/route.ts      # LinkedIn scraper
├── lib/
│   ├── ai/
│   │   ├── resume-parser.ts       # PDF/DOCX parsing
│   │   ├── keyword-matcher.ts     # Keyword extraction
│   │   ├── semantic-matcher.ts    # Semantic similarity
│   │   └── skill-extractor.ts     # Skill matching
│   ├── linkedin/scraper.ts        # LinkedIn scraping
│   └── db/supabase.ts             # Database client
└── components/
    ├── JobForm.tsx
    ├── CandidateUpload.tsx
    ├── MatchResults.tsx
    └── ScoreCard.tsx
```

## 🛡️ Important Disclaimers

### LinkedIn Scraping
⚠️ **This feature is experimental and may not always work:**
- LinkedIn frequently changes their HTML structure
- Public profiles have limited information
- Risk of IP blocking with excessive requests
- May violate LinkedIn Terms of Service
- **Recommendation**: Use manual PDF upload as primary method

### Data Privacy
- All resume data stored in your Supabase instance
- You control the data
- Hugging Face API processes text but doesn't store it

## 🤝 Contributing

Contributions are welcome! This is an open-source project to help HR professionals.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com/)
- AI powered by [Hugging Face](https://huggingface.co/)
- Hosted on [Vercel](https://vercel.com/)

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review Supabase/Hugging Face setup
3. Verify API keys in `.env.local`
4. Open an issue on GitHub

---

**Built with ❤️ for HR professionals who need powerful tools without the enterprise price tag**

⭐ Star this repo if you find it helpful!