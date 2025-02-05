import { useState } from 'react';
import { motion } from 'framer-motion';

const RomanCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Convert decimal to Roman numeral
  const convertToRoman = (num) => {
    if (num < 1 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    const romanNumerals = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' }
    ];

    let result = '';
    let remaining = num;

    for (let i = 0; i < romanNumerals.length; i++) {
      while (remaining >= romanNumerals[i].value) {
        result += romanNumerals[i].symbol;
        remaining -= romanNumerals[i].value;
      }
    }

    return result;
  };

  // Convert Roman numeral to decimal
  const convertToNumber = (roman) => {
    const romanValues = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    };

    // Validate Roman numeral format
    const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    if (!validRomanRegex.test(roman)) {
      throw new Error('Invalid Roman numeral');
    }

    let result = 0;
    const upperRoman = roman.toUpperCase();

    for (let i = 0; i < upperRoman.length; i++) {
      const current = romanValues[upperRoman[i]];
      const next = romanValues[upperRoman[i + 1]];

      if (next && current < next) {
        result += next - current;
        i++; // Skip the next character as it's already been counted
      } else {
        result += current;
      }
    }

    return result;
  };

  const handleCalculate = () => {
    try {
      setError('');
      const trimmedInput = input.trim();
      
      if (!trimmedInput) {
        setError('Please enter a value');
        setResult('');
        return;
      }

      // Check if input is a number
      if (/^\d+$/.test(trimmedInput)) {
        const num = parseInt(trimmedInput);
        setResult(convertToRoman(num));
      } 
      // Check if input is a Roman numeral
      else if (/^[IVXLCDM]+$/i.test(trimmedInput)) {
        setResult(convertToNumber(trimmedInput).toString());
      } 
      else {
        throw new Error('Invalid input. Please enter a number or Roman numeral');
      }
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-white text-xl font-bold mb-4">Roman Numeral Calculator</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter number or Roman numeral"
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <button
          onClick={handleCalculate}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Convert
        </button>
        {result && (
          <div className="text-white text-lg bg-gray-700 p-3 rounded">
            Result: {result}
          </div>
        )}
        <div className="text-gray-400 text-sm mt-4">
          <p>Valid input examples:</p>
          <ul className="list-disc list-inside">
            <li>Numbers: 1-3999</li>
            <li>Roman numerals: I, V, X, L, C, D, M</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RomanCalculator;