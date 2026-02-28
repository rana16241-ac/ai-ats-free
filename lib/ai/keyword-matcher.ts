import { SequenceMatcher } from 'difflib'

export function extractKeywords(text: string): string[] {
  // Remove common words and extract important keywords
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
  ])

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))

  // Count frequency
  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  // Return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word)
}

export function fuzzyMatch(str1: string, str2: string, threshold = 0.8): boolean {
  const matcher = new SequenceMatcher(null, str1.toLowerCase(), str2.toLowerCase())
  return matcher.ratio() >= threshold
}

export function matchKeywords(
  jobKeywords: string[],
  resumeText: string
): {
  matched: Array<{ keyword: string; count: number }>
  missing: string[]
  score: number
} {
  const resumeLower = resumeText.toLowerCase()
  const matched: Array<{ keyword: string; count: number }> = []
  const missing: string[] = []

  jobKeywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase()
    
    // Exact match count
    const regex = new RegExp(`\\b${keywordLower}\\b`, 'gi')
    const exactMatches = (resumeLower.match(regex) || []).length

    if (exactMatches > 0) {
      matched.push({ keyword, count: exactMatches })
    } else {
      // Try fuzzy matching
      const words = resumeLower.split(/\s+/)
      const fuzzyFound = words.some(word => fuzzyMatch(word, keywordLower, 0.85))
      
      if (fuzzyFound) {
        matched.push({ keyword, count: 1 })
      } else {
        missing.push(keyword)
      }
    }
  })

  const score = jobKeywords.length > 0 ? (matched.length / jobKeywords.length) * 100 : 0

  return { matched, missing, score }
}