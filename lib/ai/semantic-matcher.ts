import axios from 'axios'

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY
const MODEL = 'sentence-transformers/all-MiniLM-L6-v2'

export async function getSemanticSimilarity(
  text1: string,
  text2: string
): Promise<number> {
  if (!HUGGINGFACE_API_KEY) {
    console.warn('Hugging Face API key not set, using fallback keyword matching')
    return fallbackSimilarity(text1, text2)
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: {
          source_sentence: text1,
          sentences: [text2]
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    )

    // Response is an array of similarity scores
    const similarity = response.data[0]
    
    // Convert from [-1, 1] to [0, 100]
    return ((similarity + 1) / 2) * 100
  } catch (error: any) {
    console.error('Semantic matching error:', error.message)
    
    // Fallback to keyword-based similarity
    return fallbackSimilarity(text1, text2)
  }
}

function fallbackSimilarity(text1: string, text2: string): number {
  // Simple Jaccard similarity as fallback
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))
  
  const intersection = new Set([...words1].filter(x => words2.has(x)))
  const union = new Set([...words1, ...words2])
  
  return (intersection.size / union.size) * 100
}