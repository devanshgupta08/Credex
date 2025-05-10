import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock AI response function for the chat widget
export function generateMockResponse(question: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple keyword matching for demo purposes
      if (question.toLowerCase().includes("sell") || question.toLowerCase().includes("license")) {
        resolve(
          "To sell your license, simply upload it through our secure portal, and we'll provide you with a valuation within minutes. Once you accept our offer, you'll receive payment within 24 hours.",
        )
      } else if (question.toLowerCase().includes("payment") || question.toLowerCase().includes("pay")) {
        resolve(
          "We offer multiple payment methods including bank transfer, PayPal, and cryptocurrency. You can choose your preferred method during the selling process.",
        )
      } else if (question.toLowerCase().includes("secure") || question.toLowerCase().includes("safe")) {
        resolve(
          "Your security is our top priority. We use bank-level encryption to protect all your data and transactions. Your personal information is never shared with third parties.",
        )
      } else {
        resolve(
          "I'm not sure I understand your question. Could you please rephrase it or ask about how to sell your license, our payment methods, or our security measures?",
        )
      }
    }, 1000) // Simulate API delay
  })
}
