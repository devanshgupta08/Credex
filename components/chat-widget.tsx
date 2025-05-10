"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Define Message type
type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// FAQ data for fallback responses
const faqData: Record<
  "how do i sell my license?" | 
  "what types of software licenses do you buy?" | 
  "how long does the process take?" | 
  "is my information secure?" | 
  "what payment methods do you offer?", 
  string
> = {
  
  "how do i sell my license?":
    "To sell your license, simply click the 'Sell My Licenses' button at the top of the page, upload your license details, and our system will provide you with a valuation. Once you accept, you'll receive payment within 24 hours.",
  
  "what types of software licenses do you buy?":
    "We purchase a wide range of software licenses including enterprise software, design tools, development environments, productivity suites, and more. If you're unsure about your specific license, please contact our support team.",
  
  "how long does the process take?":
    "The entire process typically takes 1-2 business days. The valuation is instant, and once you accept our offer, payment is processed within 24 hours.",
  
  "is my information secure?":
    "Absolutely. We use bank-level encryption to protect all your data. Your personal and payment information is never stored on our servers and is handled according to the strictest security standards.",
  
  "what payment methods do you offer?":
    "We offer payments via bank transfer, PayPal, and cryptocurrency (Bitcoin, Ethereum). You can select your preferred payment method during the selling process.",
}

// Update the getGeminiAIResponse function to call the serverless API
const getGeminiAIResponse = async (question: string): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.answer; // Assuming the API response has an 'answer' field
  } catch (error) {
    console.error('Error getting response from Gemini API:', error);
    throw new Error('There was an error fetching the response from Gemini AI.');
  }
}

// Function to get AI response (from FAQ or Gemini)
const getAIResponse = async (question: string): Promise<string> => {
  const normalizedQuestion = question.toLowerCase().trim()

  // Check if question matches any FAQ data
  if (faqData[normalizedQuestion as keyof typeof faqData]) {
    return faqData[normalizedQuestion as keyof typeof faqData]
  }

  // If not in FAQ, call Gemini API
  try {
    const aiResponse = await getGeminiAIResponse(question)
    return aiResponse
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    return "Sorry, I'm having trouble with the AI. Please try again later."
  }
}

// Main ChatWidget component
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hi there! How can I help you today? You can ask me about selling your licenses, our process, or payment methods.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "How do I sell my license?",
    "What types of software licenses do you buy?",
    "How long does the process take?",
    "Is my information secure?",
    "What payment methods do you offer?",
  ]

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Get AI response (either from FAQ or Gemini API)
      const response = await getAIResponse(text)

      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed z-50 flex items-center justify-center w-16 h-16 text-white rounded-full shadow-lg bottom-6 right-6 bg-blue-600 hover:bg-blue-700"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 flex flex-col w-full max-w-md bg-white rounded-lg shadow-xl bottom-6 right-6 dark:bg-gray-900 sm:w-96"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SoftSell Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[400px]">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"}`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 text-left">
                  <div className="inline-block max-w-[80%] px-4 py-2 bg-gray-100 text-gray-800 rounded-lg dark:bg-gray-800 dark:text-gray-200">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <p>Typing...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t dark:border-gray-700">
                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isLoading} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
