"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Upload, DollarSign, CreditCard } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    title: "Upload License",
    description: "Simply upload your software license details through our secure portal.",
    icon: Upload,
    color: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Get Valuation",
    description: "Our AI-powered system instantly provides you with a competitive market valuation.",
    icon: DollarSign,
    color: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Get Paid",
    description: "Accept the offer and receive payment through your preferred method within 24 hours.",
    icon: CreditCard,
    color: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-400",
  },
]

export default function HowItWorks() {
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
        staggerChildren: 0.2,
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
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <motion.div style={{ opacity, y }} className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Selling your unused software licenses has never been easier. Complete the process in just three simple
            steps.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mt-16 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex flex-col items-center p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <motion.div
                className={`flex items-center justify-center w-16 h-16 mb-4 rounded-full ${step.color}`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <step.icon className={`w-8 h-8 ${step.textColor}`} aria-hidden="true" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
