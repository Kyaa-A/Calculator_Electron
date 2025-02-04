// src/components/shapes/TrapezoidCalculator.jsx
import { useState } from "react";

const TrapezoidCalculator = () => {
  const [base1, setBase1] = useState("");
  const [base2, setBase2] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");

  const calculateArea = () => {
    const a = parseFloat(base1);
    const b = parseFloat(base2);
    const h = parseFloat(height);
    if (!isNaN(a) && !isNaN(b) && !isNaN(h)) {
      const area = ((a + b) * h) / 2;
      setResult(area.toFixed(2));
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-72">
      <div className="text-right text-gray-400 text-sm mb-2 h-6">
        Trapezoid Area Calculator
      </div>
      <div className="text-right text-3xl p-2 mb-4 bg-gray-700 rounded break-all min-h-[48px] text-white">
        {result || "0"}
      </div>
      <div className="space-y-2">
        <input
          type="number"
          value={base1}
          onChange={(e) => setBase1(e.target.value)}
          placeholder="Enter first parallel side"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
        <input
          type="number"
          value={base2}
          onChange={(e) => setBase2(e.target.value)}
          placeholder="Enter second parallel side"
          className="w-full p-2 bg-gray-700 text-white rounded"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height"
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
            setBase1("");
            setBase2("");
            setHeight("");
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

export default TrapezoidCalculator;