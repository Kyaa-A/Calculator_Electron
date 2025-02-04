// src/components/CalculatorLayout.jsx
import { useState } from "react";
import Calculator from "./Calculator";
import SquareCalculator from "./shapes/SquareCalculator";
import CircleCalculator from "./shapes/CircleCalculator";
import TriangleCalculator from "./shapes/TriangleCalculator";
import RectangleCalculator from "./shapes/RectangleCalculator";
import TrapezoidCalculator from "./shapes/TrapezoidCalculator";

const CalculatorLayout = () => {
  const [activeCalculator, setActiveCalculator] = useState("basic");
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case "basic":
        return <Calculator />;
      case "square":
        return <SquareCalculator />;
      case "circle":
        return <CircleCalculator />;
      case "triangle":
        return <TriangleCalculator />;
      case "rectangle":
        return <RectangleCalculator />;
      case "trapezoid":
        return <TrapezoidCalculator />;
      default:
        return <Calculator />;
    }
  };

  const handleAreaClick = () => {
    setIsAreaDropdownOpen(!isAreaDropdownOpen);
  };

  const handleShapeSelect = (shape) => {
    setActiveCalculator(shape);
    setIsAreaDropdownOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-white text-xl font-bold mb-6">Calculator</h2>
        <div className="space-y-2">
          {/* Basic Calculator Button */}
          <button
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "basic" 
                ? "bg-blue-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("basic")}
          >
            Basic Calculator
          </button>

          {/* Area Calculator Dropdown */}
          <div className="relative">
            <button
              className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
                activeCalculator !== "basic" 
                  ? "bg-blue-600" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={handleAreaClick}
            >
              <div className="flex justify-between items-center">
                <span>Area Calculator</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isAreaDropdownOpen ? "transform rotate-180" : ""
                  }`}
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
                </svg>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isAreaDropdownOpen && (
              <div className="absolute left-0 w-full mt-1 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <button
                  className="w-full p-3 text-left text-white hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleShapeSelect("square")}
                >
                  Square
                </button>
                <button
                  className="w-full p-3 text-left text-white hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleShapeSelect("circle")}
                >
                  Circle
                </button>
                <button
                  className="w-full p-3 text-left text-white hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleShapeSelect("triangle")}
                >
                  Triangle
                </button>
                <button
                  className="w-full p-3 text-left text-white hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleShapeSelect("rectangle")}
                >
                  Rectangle
                </button>
                <button
                  className="w-full p-3 text-left text-white hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleShapeSelect("trapezoid")}
                >
                  Trapezoid
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        {renderCalculator()}
      </div>
    </div>
  );
};

export default CalculatorLayout;