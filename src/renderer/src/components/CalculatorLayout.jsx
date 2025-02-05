import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Calculator from './Calculator'
import RomanCalculator from './RomanCalculator'
import CurrencyConverter from './CurrencyConverter'
import SquareCalculator from './shapes/SquareCalculator'
import CircleCalculator from './shapes/CircleCalculator'
import TriangleCalculator from './shapes/TriangleCalculator'
import RectangleCalculator from './shapes/RectangleCalculator'
import TrapezoidCalculator from './shapes/TrapezoidCalculator'

const CalculatorLayout = () => {
  const [activeCalculator, setActiveCalculator] = useState('basic')
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false)

  // Animation variants for the calculator components
  const pageVariants = {
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: 20
    }
  }

  const pageTransition = {
    type: 'tween',
    duration: 0.3
  }

  const renderCalculator = () => {
    let Component
    switch (activeCalculator) {
      case 'basic':
        Component = Calculator
        break
      case 'roman':
        Component = RomanCalculator
        break
      case 'currency': 
        Component = CurrencyConverter
        break
      case 'square':
        Component = SquareCalculator
        break
      case 'circle':
        Component = CircleCalculator
        break
      case 'triangle':
        Component = TriangleCalculator
        break
      case 'rectangle':
        Component = RectangleCalculator
        break
      case 'trapezoid':
        Component = TrapezoidCalculator
        break
      default:
        Component = Calculator
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCalculator}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full flex items-center justify-center"
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    )
  }

  const handleAreaClick = () => {
    setIsAreaDropdownOpen(!isAreaDropdownOpen)
  }

  const handleShapeSelect = (shape) => {
    setActiveCalculator(shape)
    setIsAreaDropdownOpen(false)
  }

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-white text-xl font-bold mb-6">Calculator</h2>
        <div className="space-y-2">
          {/* Basic Calculator Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === 'basic' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveCalculator('basic')}
          >
            Basic Calculator
          </motion.button>

          {/* Roman Numeral Calculator Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === 'roman' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveCalculator('roman')}
          >
            Roman Numeral
          </motion.button>

          {/* Currency Converter Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "currency"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("currency")}
          >
            Currency Converter
          </motion.button>

          {/* Area Calculator Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
                ['square', 'circle', 'triangle', 'rectangle', 'trapezoid'].includes(
                  activeCalculator
                )
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={handleAreaClick}
            >
              <div className="flex justify-between items-center">
                <span>Area Calculator</span>
                <motion.svg
                  animate={{ rotate: isAreaDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isAreaDropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute left-0 w-full mt-1 bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                >
                  {['square', 'circle', 'triangle', 'rectangle', 'trapezoid'].map((shape) => (
                    <motion.button
                      key={shape}
                      whileHover={{ backgroundColor: 'rgba(75, 85, 99, 1)' }}
                      className="w-full p-3 text-left text-white hover:bg-gray-600 transition-colors duration-200"
                      onClick={() => handleShapeSelect(shape)}
                    >
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">{renderCalculator()}</div>
    </div>
  )
}

export default CalculatorLayout
