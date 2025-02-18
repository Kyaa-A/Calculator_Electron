import { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);

    // For Category
      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setCategory('Normal Weight');
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setCategory('Overweight');
      } else {
        setCategory('Obesity');
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-white text-2xl font-bold mb-4">BMI Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="text-white block mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter height in cm"
          />
        </div>
        <div>
          <label className="text-white block mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter weight in kg"
          />
        </div>
        <button
          onClick={calculateBMI}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Calculate BMI
        </button>
        {bmi && (
          <div className="mt-4 text-white">
            <p className="text-lg">Your BMI: <span className="font-bold">{bmi}</span></p>
            <p className="text-lg">Category: <span className="font-bold">{category}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;