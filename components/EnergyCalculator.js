import { useState } from 'react';

export default function EnergyCalculator({ onCalculate }) {
  const [formData, setFormData] = useState({
    electricity: '',
    gas: '',
    heating: '',
    region: 'average'
  });

  const emissionFactors = {
    electricity: { average: 0.5, renewable: 0.1, coal: 0.9 },
    gas: 2.0,
    heating: 2.3
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateEmissions = () => {
    const electricity = parseFloat(formData.electricity) || 0;
    const gas = parseFloat(formData.gas) || 0;
    const heating = parseFloat(formData.heating) || 0;
    
    const electricityFactor = emissionFactors.electricity[formData.region];
    const totalEmissions = 
      (electricity * electricityFactor) + 
      (gas * emissionFactors.gas) + 
      (heating * emissionFactors.heating);
    
    onCalculate(totalEmissions / 100); // Convert to reasonable scale
  };

  return (
    <div className="calculator-form">
      <h3>⚡ Energy Calculator</h3>
      
      <div className="form-group">
        <label htmlFor="region">Energy Grid Type</label>
        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleInputChange}
        >
          <option value="average">Average Grid</option>
          <option value="renewable">Renewable Heavy</option>
          <option value="coal">Coal Heavy</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="electricity">Daily Electricity Usage (kWh)</label>
        <input
          type="number"
          id="electricity"
          name="electricity"
          value={formData.electricity}
          onChange={handleInputChange}
          placeholder="Enter daily kWh usage"
          min="0"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gas">Daily Natural Gas Usage (cubic meters)</label>
        <input
          type="number"
          id="gas"
          name="gas"
          value={formData.gas}
          onChange={handleInputChange}
          placeholder="Enter daily gas usage"
          min="0"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="heating">Daily Heating Oil (liters)</label>
        <input
          type="number"
          id="heating"
          name="heating"
          value={formData.heating}
          onChange={handleInputChange}
          placeholder="Enter daily heating oil"
          min="0"
          step="0.1"
        />
      </div>

      <button 
        type="button"
        onClick={calculateEmissions}
        className="calculate-btn"
      >
        Calculate Energy Emissions
      </button>
    </div>
  );
}