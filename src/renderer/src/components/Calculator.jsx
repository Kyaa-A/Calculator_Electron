// src/components/Calculator.jsx
import { useState } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (value) => {
    if (waitingForOperand) {
      setDisplay(value);
      setExpression(expression + value);
      setWaitingForOperand(false);
    } else {
      const newDisplay = display === "0" ? value : display + value;
      setDisplay(newDisplay);
      setExpression(expression === "0" ? value : expression + value);
    }
  };

  const handleOperator = (operator) => {
    if (!waitingForOperand) {
      setExpression(expression + " " + operator + " ");
      setDisplay(operator);
      setWaitingForOperand(true);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setExpression(expression + "0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
      setExpression(expression + ".");
    }
  };

  const clearInput = () => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
  };

  const calculateResult = () => {
    try {
      // Remove any trailing operator and whitespace
      const cleanExpression = expression.replace(/\s*[\+\-\*\/]\s*$/, "");
      
      // Replace all instances of multiple spaces with single space
      const normalizedExpression = cleanExpression.replace(/\s+/g, " ").trim();
      
      // Split the expression into tokens
      const tokens = normalizedExpression.split(" ");
      
      // Evaluate the expression
      let result = parseFloat(tokens[0]);
      
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
        
        switch (operator) {
          case "+":
            result += operand;
            break;
          case "-":
            result -= operand;
            break;
          case "*":
            result *= operand;
            break;
          case "/":
            if (operand === 0) {
              throw new Error("Division by zero");
            }
            result /= operand;
            break;
          default:
            throw new Error("Invalid operator");
        }
      }

      // Format the result
      const formattedResult = Number.isInteger(result) 
        ? result.toString()
        : result.toFixed(8).replace(/\.?0+$/, "");

      setDisplay(formattedResult);
      setExpression(formattedResult);
      setWaitingForOperand(false);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      setWaitingForOperand(false);
    }
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleNumber(value);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperator(value);
        break;
      case ".":
        handleDecimal();
        break;
      case "=":
        calculateResult();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-92">
        {/* Expression Display */}
        <div className="text-right text-gray-400 text-sm mb-2 h-6 overflow-hidden">
          {expression || "0"}
        </div>
        {/* Result Display */}
        <div className="text-right text-3xl p-2 mb-4 bg-gray-700 rounded break-all min-h-[48px]">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map(
            (char) => (
              <button
                key={char}
                className={`${
                  char === "="
                    ? "bg-blue-600 hover:bg-blue-500"
                    : ["*", "/", "+", "-"].includes(char)
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-600 hover:bg-gray-500"
                } p-4 rounded text-xl`}
                onClick={() => handleButtonClick(char)}
              >
                {char}
              </button>
            )
          )}
          <button
            className="col-span-4 bg-red-600 hover:bg-red-500 p-4 rounded text-xl"
            onClick={clearInput}
          >
            C
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;