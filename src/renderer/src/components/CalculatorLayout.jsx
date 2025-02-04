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

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Fixed-width Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 p-6 shadow-lg overflow-y-auto">
        <h2 className="text-white text-xl font-bold mb-6">Calculators</h2>
        <div className="space-y-3">
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
          <button
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "square" 
                ? "bg-blue-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("square")}
          >
            Square Area
          </button>
          <button
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "circle" 
                ? "bg-blue-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("circle")}
          >
            Circle Area
          </button>
          <button
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "triangle" 
                ? "bg-blue-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("triangle")}
          >
            Triangle Area
          </button>
          <button
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "rectangle" 
                ? "bg-blue-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("rectangle")}
          >
            Rectangle Area
          </button>
          <button
            className={`w-full p-3 text-left text-white rounded-lg transition-colors duration-200 ${
              activeCalculator === "trapezoid" 
                ? "bg-blue-600" 
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCalculator("trapezoid")}
          >
            Trapezoid Area
          </button>
        </div>
      </div>

      {/* Main Content Area with margin to account for fixed sidebar */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md">
            {renderCalculator()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;