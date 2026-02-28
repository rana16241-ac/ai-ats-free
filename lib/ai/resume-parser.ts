import pdf from 'pdf-parse'
import mammoth from 'mammoth'

export async function parseResume(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const fileType = file.type

  try {
    if (fileType === 'application/pdf') {
      const data = await pdf(Buffer.from(buffer))
      return data.text
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) })
      return result.value
    } else {
      throw new Error('Unsupported file type. Please upload PDF or DOCX.')
    }
  } catch (error) {
    console.error('Resume parsing error:', error)
    throw new Error('Failed to parse resume. Please ensure the file is not corrupted.')
  }
}

export function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const match = text.match(emailRegex)
  return match ? match[0] : null
}

export function extractName(text: string): string | null {
  // Simple heuristic: first line that's not too long and contains letters
  const lines = text.split('\n').filter(line => line.trim().length > 0)
  for (const line of lines.slice(0, 5)) {
    if (line.length < 50 && /^[A-Za-z\s]+$/.test(line.trim())) {
      return line.trim()
    }
  }
  return null
}

export function extractExperience(text: string): number {
  // Look for patterns like "5 years", "5+ years", "5-7 years"
  const patterns = [
    /(\d+)\+?\s*years?\s*(?:of\s*)?(?:experience)?/gi,
    /experience[:\s]+(\d+)\+?\s*years?/gi,
  ]

  const years: number[] = []
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      const year = parseInt(match[1])
      if (year > 0 && year < 50) {
        years.push(year)
      }
    }
  }

  return years.length > 0 ? Math.max(...years) : 0
}