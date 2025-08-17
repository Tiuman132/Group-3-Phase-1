import { useState } from 'react';

export default function DietCalculator({ onCalculate }) {
  const [formData, setFormData] = useState({
    meals: {
      breakfast: 'vegetarian',
      lunch: 'omnivore',
      dinner: 'omnivore'
    },
    servings: {
      meat: '',
      dairy: '',
      vegetables: ''
    }
  });

  const mealEmissions = {
    vegan: 0.7,
    vegetarian: 1.2,
    pescatarian: 1.8,
    omnivore: 3.2
  };

  const servingEmissions = {
    meat: 6.5,
    dairy: 1.9,
    vegetables: 0.4
  };

  const handleMealChange = (meal, type) => {
    setFormData(prev => ({
      ...prev,
      meals: { ...prev.meals, [meal]: type }
    }));
  };

  const handleServingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      servings: { ...prev.servings, [name]: value }
    }));
  };

  const calculateEmissions = () => {
    // Calculate meal-based emissions
    const mealTotal = Object.values(formData.meals).reduce(
      (total, mealType) => total + mealEmissions[mealType], 0
    );

    // Calculate serving-based emissions
    const servingTotal = Object.entries(formData.servings).reduce(
      (total, [type, amount]) => {
        const servings = parseFloat(amount) || 0;
        return total + (servings * servingEmissions[type]);
      }, 0
    );

    const totalEmissions = (mealTotal + servingTotal) / 10; // Scale down to reasonable numbers
    onCalculate(totalEmissions);
  };

  return (
    <div className="calculator-form">
      <h3>🍽️ Diet Calculator</h3>
      
      <div className="meals-section">
        <h4>Meal Types Today</h4>
        {Object.entries(formData.meals).map(([meal, type]) => (
          <div key={meal} className="form-group">
            <label>{meal.charAt(0).toUpperCase() + meal.slice(1)}</label>
            <select
              value={type}
              onChange={(e) => handleMealChange(meal, e.target.value)}
            >
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="omnivore">Omnivore</option>
            </select>
          </div>
        ))}
      </div>

      <div className="servings-section">
        <h4>Additional Servings</h4>
        <div className="form-group">
          <label htmlFor="meat">Extra Meat Servings</label>
          <input
            type="number"
            id="meat"
            name="meat"
            value={formData.servings.meat}
            onChange={handleServingChange}
            placeholder="Number of servings"
            min="0"
            step="0.5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dairy">Dairy Servings</label>
          <input
            type="number"
            id="dairy"
            name="dairy"
            value={formData.servings.dairy}
            onChange={handleServingChange}
            placeholder="Number of servings"
            min="0"
            step="0.5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vegetables">Vegetable Servings</label>
          <input
            type="number"
            id="vegetables"
            name="vegetables"
            value={formData.servings.vegetables}
            onChange={handleServingChange}
            placeholder="Number of servings"
            min="0"
            step="0.5"
          />
        </div>
      </div>

      <button 
        type="button"
        onClick={calculateEmissions}
        className="calculate-btn"
      >
        Calculate Diet Emissions
      </button>
    </div>
  );
}