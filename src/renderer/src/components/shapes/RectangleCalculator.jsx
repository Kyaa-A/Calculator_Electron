// src/components/shapes/RectangleCalculator.jsx
import { useState } from "react";

const RectangleCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [result, setResult] = useState("");

  const calculateArea = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (!isNaN(l) && !isNaN(w)) {
      const area = l * w;
      setResult(area.toFixed(2));
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-72">
      <div className="text-right text-gray-400 text-sm mb-2 h-6">
        Rectangle Area Calculator
      </div>
      <div className="text-right text-3xl p-2 mb-4 bg-gray-700 rounded break-all min-h-[48px] text-white">
        {result || "0"}
      </div>
      <div className="space-y-2">
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Enter length"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Enter width"
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
            setLength("");
            setWidth("");
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

export default RectangleCalculator;