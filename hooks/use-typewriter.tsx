"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterProps {
  words: string[]
  loop?: boolean
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
}

export function useTypewriter({
  words = [""],
  loop = true,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
}: TypewriterProps) {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [speed, setSpeed] = useState(typeSpeed)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMounted.current) return

      const currentWord = words[wordIndex]
      const shouldDelete = isDeleting

      // Set the text based on whether we're deleting or typing
      setText((prev) =>
        shouldDelete ? currentWord.substring(0, prev.length - 1) : currentWord.substring(0, prev.length + 1),
      )

      // Set the typing speed
      setSpeed(shouldDelete ? deleteSpeed : typeSpeed)

      // If we've completed typing the word
      if (!shouldDelete && text === currentWord) {
        // Delay before starting to delete
        setTimeout(() => {
          if (isMounted.current) setIsDeleting(true)
        }, delaySpeed)
      }
      // If we've deleted the word
      else if (shouldDelete && text === "") {
        setIsDeleting(false)

        // Move to the next word or loop back to the first
        setWordIndex((prev) => {
          if (prev === words.length - 1) {
            return loop ? 0 : prev
          }
          return prev + 1
        })
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, typeSpeed, deleteSpeed, delaySpeed, words, loop, speed])

  return [text]
}
