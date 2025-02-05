import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PHP');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Added PHP to the currencies list and sorted alphabetically
  const currencies = [
    'AUD',
    'CAD', 
    'CHF', 
    'CNY', 
    'EUR',
    'GBP', 
    'INR',
    'JPY',
    'PHP', // Added Philippine Peso
    'USD'
  ];

  // Mock exchange rates object (in a real app, these would come from an API)
  const mockExchangeRates = {
    USD: {
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.50,
      AUD: 1.53,
      CAD: 1.35,
      CHF: 0.87,
      CNY: 7.19,
      INR: 83.12,
      PHP: 58.09, 
    },
    // Add conversion rates for PHP
    PHP: {
      USD: 0.018,
      EUR: 0.016,
      GBP: 0.014,
      JPY: 2.66,
      AUD: 0.027,
      CAD: 0.024,
      CHF: 0.015,
      CNY: 0.13,
      INR: 1.48,
    }
    // Note: In a real application, you would get all currency pairs from an API
  };

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      setResult('');
      return;
    }

    try {
      let rate;
      if (fromCurrency === toCurrency) {
        rate = 1;
      } else if (fromCurrency === 'USD') {
        rate = mockExchangeRates.USD[toCurrency];
      } else if (toCurrency === 'USD') {
        rate = 1 / mockExchangeRates.USD[fromCurrency];
      } else {
        // Convert through USD
        const toUSD = 1 / mockExchangeRates.USD[fromCurrency];
        const USDtoTarget = mockExchangeRates.USD[toCurrency];
        rate = toUSD * USDtoTarget;
      }

      const converted = (parseFloat(amount) * rate).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
      setError('');
    } catch (err) {
      setError('Error converting currency');
      setResult('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-white text-xl font-bold mb-4">Currency Converter</h2>
      <div className="space-y-4">
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              {currencies.map(currency => (
                <option key={`from-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              {currencies.map(currency => (
                <option key={`to-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Convert
        </button>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {result && (
          <div className="text-white text-lg bg-gray-700 p-3 rounded">
            {result}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default CurrencyConverter;