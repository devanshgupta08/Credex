"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "SoftSell made it incredibly easy to sell our unused enterprise licenses. The valuation was fair and the payment was processed quickly. Highly recommended!",
    author: "Sarah Johnson",
    role: "IT Director",
    company: "TechCorp Inc.",
  },
  {
    content:
      "As a small business owner, I was worried about the process of selling our extra software licenses. SoftSell made it simple and secure. Great customer service too!",
    author: "Michael Chen",
    role: "CEO",
    company: "Innovate Solutions",
  },
]

export default function Testimonials() {
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <motion.div style={{ opacity, y }} className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Don't just take our word for it. Here's what our customers have to say about their experience with SoftSell.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid max-w-6xl grid-cols-1 gap-8 mx-auto mt-16 md:grid-cols-2"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <motion.div
                className="flex mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 + i * 0.1, duration: 0.3 }}
                  >
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="mb-6 text-gray-600 dark:text-gray-300">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {testimonial.author.charAt(0)}
                  </motion.div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
