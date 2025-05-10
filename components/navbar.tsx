"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()
  const { scrollY } = useScroll()

  const backgroundColorLight = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  )

  const backgroundColorDark = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.8)"]
  )

  const backgroundColor =
    theme === "dark" ? backgroundColorDark : backgroundColorLight

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? backgroundColor : "rgba(0, 0, 0, 0)",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="container flex items-center justify-between p-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">SoftSell</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-8 md:flex">
          <Link
            href="#how-it-works"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
          >
            How It Works
          </Link>
          <Link
            href="#why-choose-us"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
          >
            Why Choose Us
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
          >
            Testimonials
          </Link>
          <Link href="#contact">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              Contact Us
            </Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-2 bg-white dark:bg-gray-900 md:hidden"
        >
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#why-choose-us"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Why Choose Us
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              <Button
                variant="default"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
