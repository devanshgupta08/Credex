import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center mb-4 space-x-2 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">SoftSell</span>
          </div>

          <div className="flex flex-wrap justify-center mb-4 space-x-6 md:mb-0">
            <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Contact
            </Link>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SoftSell. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
