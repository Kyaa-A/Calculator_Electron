// src/components/shapes/SquareCalculator.jsx
import { useState } from "react";

const SquareCalculator = () => {
  const [side, setSide] = useState("");
  const [result, setResult] = useState("");

  const calculateArea = () => {
    const sideLength = parseFloat(side);
    if (!isNaN(sideLength)) {
      const area = sideLength * sideLength;
      setResult(area.toFixed(2));
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-72">
      <div className="text-right text-gray-400 text-sm mb-2 h-6">
        Square Area Calculator
      </div>
      <div className="text-right text-3xl p-2 mb-4 bg-gray-700 rounded break-all min-h-[48px] text-white">
        {result || "0"}
      </div>
      <div className="space-y-2">
        <input
          type="number"
          value={side}
          onChange={(e) => setSide(e.target.value)}
          placeholder="Enter side length"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
        <button
          onClick={calculateArea}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Calculate Area
        </button>
        <button
          onClick={() => {
            setSide("");
            setResult("");
          }}
          className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SquareCalculator;