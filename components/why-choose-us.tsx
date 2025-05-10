"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Clock, DollarSign, Award } from "lucide-react"

const features = [
  {
    title: "Secure Transactions",
    description: "Bank-level encryption and secure payment processing for every transaction.",
    icon: Shield,
    color: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Fast Payments",
    description: "Get paid within 24 hours of accepting an offer, no lengthy waiting periods.",
    icon: Clock,
    color: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Best Market Value",
    description: "Our AI-powered valuation ensures you get the best price for your licenses.",
    icon: DollarSign,
    color: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Trusted by Enterprises",
    description: "Trusted by over 500 companies, from startups to Fortune 500 enterprises.",
    icon: Award,
    color: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-600 dark:text-orange-400",
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <motion.div style={{ opacity, y }} className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            SoftSell offers unmatched benefits when it comes to selling your unused software licenses.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid max-w-6xl grid-cols-1 gap-8 mx-auto mt-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm transition-all duration-300"
            >
              <motion.div
                className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${feature.color}`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className={`w-6 h-6 ${feature.textColor}`} aria-hidden="true" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
