import { useState, useEffect } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      
      if (
        /[0-9]/.test(key) ||
        ['+', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'Delete', 'Escape'].includes(key)
      ) {
        event.preventDefault();
      }

      if (/[0-9]/.test(key)) {
        handleNumber(key);
      } else {
        switch (key) {
          case '+':
          case '-':
          case '*':
          case '/':
            handleOperator(key);
            break;
          case '.':
            handleDecimal();
            break;
          case '=':
          case 'Enter':
            calculateResult();
            break;
          case 'Backspace':
            handleBackspace();
            break;
          case 'Delete':
          case 'Escape':
            clearInput();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, expression, waitingForOperand]);

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

  const handleBackspace = () => {
    if (display === "0" || display === "Error" || display.length === 1) {
      setDisplay("0");
      setExpression("");
      setWaitingForOperand(false);
    } else if (waitingForOperand) {
      const newExpression = expression.trim().slice(0, -2);
      setExpression(newExpression);
      const lastNumber = newExpression.split(' ').pop();
      setDisplay(lastNumber);
      setWaitingForOperand(false);
    } else {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setExpression(expression.slice(0, -1));
    }
  };

  const clearInput = () => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
  };

  const calculateResult = () => {
    try {
      if (!expression) return;

      const cleanExpression = expression.trim();
      if (cleanExpression.endsWith('+') || 
          cleanExpression.endsWith('-') || 
          cleanExpression.endsWith('*') || 
          cleanExpression.endsWith('/')) {
        return;
      }

      // Split the expression and evaluate
      const tokens = cleanExpression.split(' ');
      let result = parseFloat(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);

        if (isNaN(operand)) return;

        switch (operator) {
          case '+':
            result += operand;
            break;
          case '-':
            result -= operand;
            break;
          case '*':
            result *= operand;
            break;
          case '/':
            if (operand === 0) throw new Error("Division by zero");
            result /= operand;
            break;
          default:
            throw new Error("Invalid operator");
        }
      }

      // Format the result
      const formattedResult = Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(8)).toString();

      setDisplay(formattedResult);
      setExpression(formattedResult);
      setWaitingForOperand(false);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      setWaitingForOperand(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-92">
        <div className="text-right text-gray-400 text-sm mb-2 h-6 overflow-hidden">
          {expression || "0"}
        </div>
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
                onClick={() => char === "=" ? calculateResult() : handleButtonClick(char)}
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