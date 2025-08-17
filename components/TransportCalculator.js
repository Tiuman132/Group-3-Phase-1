import { useState } from 'react';

export default function TransportCalculator({ onCalculate }) {
  const [formData, setFormData] = useState({
    mode: 'car',
    distance: '',
    fuelType: 'gasoline'
  });

  const emissionFactors = {
    car: { gasoline: 2.31, diesel: 2.68, hybrid: 1.15 },
    bus: { default: 0.89 },
    train: { default: 0.41 },
    bike: { default: 0 },
    walk: { default: 0 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateEmissions = () => {
    const distance = parseFloat(formData.distance) || 0;
    const mode = formData.mode;
    const fuelType = formData.fuelType || 'default';
    
    const factor = emissionFactors[mode][fuelType] || emissionFactors[mode]['default'] || 0;
    const emissions = (distance * factor) / 100; // Convert to kg CO₂
    
    onCalculate(emissions);
  };

  return (
    <div className="calculator-form">
      <h3>🚗 Transportation Calculator</h3>
      
      <div className="form-group">
        <label htmlFor="mode">Transportation Mode</label>
        <select
          id="mode"
          name="mode"
          value={formData.mode}
          onChange={handleInputChange}
        >
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="bike">Bicycle</option>
          <option value="walk">Walking</option>
        </select>
      </div>

      {formData.mode === 'car' && (
        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleInputChange}
          >
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="distance">Distance (km)</label>
        <input
          type="number"
          id="distance"
          name="distance"
          value={formData.distance}
          onChange={handleInputChange}
          placeholder="Enter distance in kilometers"
          min="0"
          step="0.1"
        />
      </div>

      <button 
        type="button"
        onClick={calculateEmissions}
        className="calculate-btn"
        disabled={!formData.distance}
      >
        Calculate Transport Emissions
      </button>
    </div>
  );
}