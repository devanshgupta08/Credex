"use client"

import type React from "react"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

type FormData = {
  name: string
  email: string
  company: string
  licenseType: string
  message: string
}

type FormErrors = {
  [key in keyof FormData]?: string
}

export default function ContactForm() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }

    if (!formData.licenseType) {
      newErrors.licenseType = "License type is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, licenseType: value }))

    // Clear error when user selects
    if (errors.licenseType) {
      setErrors((prev) => ({ ...prev, licenseType: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          company: "",
          licenseType: "",
          message: "",
        })

        // Reset submission status after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      }, 1500)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <motion.div style={{ opacity, y }} className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Have questions or ready to sell your licenses? Fill out the form below and our team will get back to you
            within 24 hours.
          </motion.p>
        </div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl p-8 mx-auto mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-16 h-16 mb-4 text-green-500" />
              </motion.div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Thank You!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your message has been sent successfully. We'll get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={inputVariants}>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={errors.company ? "border-red-500" : ""}
                  placeholder="Your company name"
                />
                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label
                  htmlFor="licenseType"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  License Type
                </label>
                <Select value={formData.licenseType} onValueChange={handleSelectChange}>
                  <SelectTrigger id="licenseType" className={errors.licenseType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.licenseType && <p className="mt-1 text-sm text-red-500">{errors.licenseType}</p>}
              </motion.div>

              <motion.div variants={inputVariants}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "border-red-500" : ""}
                  placeholder="Tell us about the licenses you want to sell"
                  rows={4}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </motion.div>

              <motion.div variants={inputVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
