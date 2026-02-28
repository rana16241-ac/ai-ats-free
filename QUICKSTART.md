# ⚡ Quick Start Guide

Get AI-ATS running in **under 10 minutes**!

## 🎯 What You'll Need

- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] 10 minutes of your time

## 🚀 5-Step Setup

### Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/rana16241-ac/ai-ats-free.git
cd ai-ats-free

# Install dependencies
npm install
```

### Step 2: Setup Supabase (3 minutes)

1. **Create account**: Go to [supabase.com](https://supabase.com) → Sign up
2. **New project**: Click "New Project"
   - Name: `ai-ats`
   - Password: (create strong password)
   - Region: (choose closest)
3. **Run SQL**: Go to SQL Editor → New Query → Paste this:

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

4. **Get keys**: Settings → API → Copy:
   - Project URL
   - anon/public key

### Step 3: Setup Hugging Face (2 minutes)

1. **Create account**: Go to [huggingface.co](https://huggingface.co) → Sign up
2. **Get token**: Settings → Access Tokens → New token
   - Name: `ai-ats`
   - Role: Read
3. **Copy token**: Save it (you won't see it again!)

### Step 4: Configure Environment (1 minute)

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
HUGGINGFACE_API_KEY=hf_xxx...
```

Replace with your actual keys from Steps 2 & 3.

### Step 5: Run! (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✅ Test It Works

### Test 1: Create a Job
1. Click "Create Job"
2. Fill in:
   - Title: "Full Stack Developer"
   - Description: "We need a developer with React and Node.js experience"
   - Skills: Add "React" (Must-Have), "Node.js" (Must-Have)
   - Experience: 3 years
3. Click "Create Job"

### Test 2: View Jobs
1. Go to "Jobs" in navigation
2. You should see your job listed

## 🎨 What's Next?

### Immediate Next Steps
1. ✅ Complete remaining pages (see [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md))
2. ✅ Add candidate upload functionality
3. ✅ Implement results page
4. ✅ Test with real resumes

### Deploy to Production
See [DEPLOYMENT.md](DEPLOYMENT.md) for deploying to Vercel (FREE)

## 🐛 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### "Supabase client error"
- Check `.env.local` exists
- Verify URL and key are correct
- No extra spaces in values

### "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 📚 Full Documentation

- **Complete Setup**: [SETUP.md](SETUP.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Project Details**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## 💡 Pro Tips

1. **Use sample resumes**: Test with your own resume first
2. **Check console**: Open browser DevTools for errors
3. **Monitor API usage**: Check Hugging Face dashboard
4. **Backup database**: Export Supabase data regularly

## 🆘 Need Help?

- **Issues**: [GitHub Issues](https://github.com/rana16241-ac/ai-ats-free/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rana16241-ac/ai-ats-free/discussions)
- **Documentation**: Check other .md files in repo

## 🎯 Success Checklist

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Database tables created
- [ ] Hugging Face account created
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Can access homepage
- [ ] Can create a job
- [ ] Can view jobs list

**All checked? You're ready to build! 🚀**

---

**Time to complete**: ~10 minutes  
**Difficulty**: Beginner-friendly  
**Cost**: $0

*Happy recruiting!* 🎉