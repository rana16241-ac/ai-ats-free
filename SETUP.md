# 🚀 Complete Setup Guide for AI-ATS

This guide will walk you through setting up the AI-Powered ATS from scratch.

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git
- A Supabase account (free)
- A Hugging Face account (free)

## Step 1: Clone the Repository

```bash
git clone https://github.com/rana16241-ac/ai-ats-free.git
cd ai-ats-free
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Setup Supabase Database

### 3.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in
4. Click "New Project"
5. Fill in:
   - **Name**: ai-ats (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
6. Click "Create new project" (takes ~2 minutes)

### 3.2 Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills JSONB NOT NULL,
  experience_required INTEGER DEFAULT 0,
  education_level TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Candidates table
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  resume_text TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
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

-- Create indexes for better performance
CREATE INDEX idx_candidates_job_id ON candidates(job_id);
CREATE INDEX idx_matches_candidate_id ON matches(candidate_id);
CREATE INDEX idx_matches_job_id ON matches(job_id);
```

4. Click "Run" or press Ctrl+Enter

### 3.3 Get Supabase API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 4: Setup Hugging Face API

### 4.1 Create Hugging Face Account

1. Go to [https://huggingface.co](https://huggingface.co)
2. Click "Sign Up"
3. Complete registration (free)

### 4.2 Get API Token

1. Click your profile picture → **Settings**
2. Go to **Access Tokens**
3. Click "New token"
4. Fill in:
   - **Name**: ai-ats
   - **Role**: Read
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

## Step 5: Configure Environment Variables

1. In the project root, create a file named `.env.local`
2. Add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Hugging Face API
HUGGINGFACE_API_KEY=your_huggingface_token_here
```

3. Replace the placeholder values with your actual keys
4. Save the file

## Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the AI-ATS homepage! 🎉

## Step 7: Deploy to Vercel (Optional)

### 7.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 7.2 Login to Vercel

```bash
vercel login
```

### 7.3 Deploy

```bash
vercel --prod
```

### 7.4 Add Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `HUGGINGFACE_API_KEY`
4. Redeploy: `vercel --prod`

## 🧪 Testing the Setup

### Test 1: Create a Job

1. Go to `/jobs/create`
2. Fill in job details
3. Add skills (e.g., "JavaScript", "React")
4. Click "Create Job"

### Test 2: Upload a Resume

1. Go to the job you created
2. Click "Add Candidate"
3. Upload a PDF resume
4. Wait for AI matching

### Test 3: View Results

You should see:
- Overall match score
- Breakdown by category
- Matched/missing skills
- Recommendation

## 🐛 Troubleshooting

### "Supabase client error"
- Check your `.env.local` file
- Verify URL and key are correct
- Ensure no extra spaces

### "Hugging Face API error"
- Verify your API token
- Check you haven't exceeded free tier (30k requests/month)
- Try the fallback similarity (works without API)

### "Resume parsing failed"
- Ensure file is PDF or DOCX
- Check file isn't corrupted
- Try a different resume

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 📊 Free Tier Limits

| Service | Limit | What happens when exceeded |
|---------|-------|---------------------------|
| Supabase | 500MB DB | Upgrade to Pro ($25/mo) |
| Supabase | 1GB Storage | Upgrade to Pro |
| Hugging Face | 30k requests/mo | Wait for reset or upgrade |
| Vercel | 100GB bandwidth | Upgrade to Pro ($20/mo) |

## 🎯 Next Steps

1. Customize the UI in `app/` directory
2. Add more AI models in `lib/ai/`
3. Implement email notifications
4. Add user authentication
5. Create admin dashboard

## 💡 Tips

- Use `.env.local` for local development
- Never commit `.env.local` to Git
- Use Vercel environment variables for production
- Monitor Supabase usage in dashboard
- Check Hugging Face API usage regularly

## 🆘 Need Help?

- Check [GitHub Issues](https://github.com/rana16241-ac/ai-ats-free/issues)
- Review [Supabase Docs](https://supabase.com/docs)
- Read [Hugging Face Docs](https://huggingface.co/docs)
- Ask in [Discussions](https://github.com/rana16241-ac/ai-ats-free/discussions)

---

**Happy recruiting! 🚀**