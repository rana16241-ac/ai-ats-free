import axios from 'axios'
import * as cheerio from 'cheerio'

export async function scrapeLinkedInProfile(url: string): Promise<{
  name: string | null
  headline: string | null
  about: string | null
  experience: string | null
  education: string | null
  skills: string[]
}> {
  try {
    // WARNING: This is experimental and may not work reliably
    // LinkedIn actively blocks scrapers
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    })

    const $ = cheerio.load(response.data)

    // These selectors may break at any time
    const name = $('h1.top-card-layout__title').text().trim() || null
    const headline = $('h2.top-card-layout__headline').text().trim() || null
    const about = $('.core-section-container__content .break-words').first().text().trim() || null
    
    // Extract experience and education sections
    const experience = $('.experience-section .pv-entity__summary-info').map((_, el) => 
      $(el).text().trim()
    ).get().join('\n\n') || null

    const education = $('.education-section .pv-entity__summary-info').map((_, el) => 
      $(el).text().trim()
    ).get().join('\n\n') || null

    const skills = $('.skill-category-entity__name').map((_, el) => 
      $(el).text().trim()
    ).get()

    return {
      name,
      headline,
      about,
      experience,
      education,
      skills,
    }
  } catch (error: any) {
    console.error('LinkedIn scraping error:', error.message)
    throw new Error(
      'Failed to scrape LinkedIn profile. This feature is experimental and may not work due to LinkedIn restrictions. Please use manual PDF upload instead.'
    )
  }
}

export function formatLinkedInData(data: {
  name: string | null
  headline: string | null
  about: string | null
  experience: string | null
  education: string | null
  skills: string[]
}): string {
  const parts: string[] = []

  if (data.name) parts.push(`Name: ${data.name}`)
  if (data.headline) parts.push(`Headline: ${data.headline}`)
  if (data.about) parts.push(`About:\n${data.about}`)
  if (data.experience) parts.push(`Experience:\n${data.experience}`)
  if (data.education) parts.push(`Education:\n${data.education}`)
  if (data.skills.length > 0) parts.push(`Skills: ${data.skills.join(', ')}`)

  return parts.join('\n\n')
}