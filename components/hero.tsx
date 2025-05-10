"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

// Typewriter effect hook
const useTypewriter = (text: string, speed = 100) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, speed, text])

  return { displayText, isComplete }
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Typewriter text
  const { displayText: headingText,isComplete: mainHeadingComplete } = useTypewriter("Turn Unused Software", 80)
  const { displayText: subHeadingText, isComplete: headingComplete } = useTypewriter("Into Profit",mainHeadingComplete? 80:10000000)
  const { displayText: paragraphText } = useTypewriter(
    "SoftSell helps businesses and individuals sell their unused software licenses quickly, securely, and at the best possible price.",
    headingComplete ? 20 : 1000000, // Only start typing paragraph after heading is complete
  )

  return (
    <section ref={ref} className="relative pt-20 overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 -z-10" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="container px-4 py-20 mx-auto md:py-32">
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              <span className="block">
                {headingText}
                
              </span>
              <span className="block mt-2 text-blue-600 dark:text-blue-400">
                {subHeadingText}
                
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="max-w-2xl mt-6 text-xl text-gray-600 dark:text-gray-300"
          >
            {paragraphText}
            
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="flex flex-col mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <Button
              size="lg"
              className="text-lg group bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Sell My Licenses
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
            >
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}
