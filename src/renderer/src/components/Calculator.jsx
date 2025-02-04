// src/components/Calculator.jsx
import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [operatorClicked, setOperatorClicked] = useState(false);

  const handleClick = (value) => {
    if (["/", "*", "-", "+"].includes(value)) {
      if (operatorClicked || input === "0") return; // Prevent multiple operators and leading operators
      setOperatorClicked(true);
    } else {
      setOperatorClicked(false);
    }
    
    setInput((prev) => (prev === "0" && value !== "." ? value : prev + value));
  };

  const clearInput = () => {
    setInput("0");
    setOperatorClicked(false);
  };

  const calculateResult = () => {
    try {
      if (operatorClicked) return; // Prevent calculation if last input is an operator
      const result = eval(input); // Evaluates the expression safely
      setInput(result.toString());
      setOperatorClicked(false);
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-72">
        <div className="text-right text-3xl p-2 mb-4 bg-gray-700 rounded break-all min-h-[48px]">{input}</div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((char) => (
            <button
              key={char}
              className="bg-gray-600 hover:bg-gray-500 p-4 rounded text-xl"
              onClick={() => {
                if (char === "=") {
                  calculateResult();
                } else {
                  handleClick(char);
                }
              }}
            >
              {char}
            </button>
          ))}
          <button className="col-span-4 bg-red-600 hover:bg-red-500 p-4 rounded text-xl" onClick={clearInput}>
            C
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
