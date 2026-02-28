import { fuzzyMatch } from './keyword-matcher'

export function matchSkills(
  requiredSkills: Array<{ name: string; importance: 'Must-Have' | 'Nice-to-Have' }>,
  resumeText: string
): {
  matched: string[]
  missing: string[]
  score: number
} {
  const resumeLower = resumeText.toLowerCase()
  const matched: string[] = []
  const missing: string[] = []
  
  let totalWeight = 0
  let matchedWeight = 0

  requiredSkills.forEach(skill => {
    const weight = skill.importance === 'Must-Have' ? 1.0 : 0.5
    totalWeight += weight

    const skillLower = skill.name.toLowerCase()
    
    // Check for exact match
    if (resumeLower.includes(skillLower)) {
      matched.push(skill.name)
      matchedWeight += weight
      return
    }

    // Check for common variations
    const variations = getSkillVariations(skill.name)
    const foundVariation = variations.some(variation => 
      resumeLower.includes(variation.toLowerCase())
    )

    if (foundVariation) {
      matched.push(skill.name)
      matchedWeight += weight
      return
    }

    // Fuzzy matching for typos
    const words = resumeLower.split(/\s+/)
    const fuzzyFound = words.some(word => fuzzyMatch(word, skillLower, 0.85))
    
    if (fuzzyFound) {
      matched.push(skill.name)
      matchedWeight += weight
    } else {
      missing.push(skill.name)
    }
  })

  const score = totalWeight > 0 ? (matchedWeight / totalWeight) * 100 : 0

  return { matched, missing, score }
}

function getSkillVariations(skill: string): string[] {
  const variations: Record<string, string[]> = {
    'JavaScript': ['JS', 'ECMAScript', 'ES6', 'ES2015'],
    'TypeScript': ['TS'],
    'Python': ['Py'],
    'React': ['ReactJS', 'React.js'],
    'Node.js': ['Node', 'NodeJS'],
    'MongoDB': ['Mongo'],
    'PostgreSQL': ['Postgres', 'PSQL'],
    'Machine Learning': ['ML'],
    'Artificial Intelligence': ['AI'],
    'Natural Language Processing': ['NLP'],
    'Kubernetes': ['K8s'],
    'Docker': ['Containerization'],
    'AWS': ['Amazon Web Services'],
    'GCP': ['Google Cloud Platform'],
    'Azure': ['Microsoft Azure'],
  }

  return variations[skill] || []
}