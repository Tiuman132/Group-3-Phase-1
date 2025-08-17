export default function CalculatorResults({ calculations, savedCalculations, onSave, onReset }) {
  const getRecommendation = (total) => {
    if (total < 2) {
      return { 
        level: 'Excellent', 
        color: '#22c55e',
        message: 'Great job! Your carbon footprint is well below average. Keep up the sustainable practices!' 
      };
    } else if (total < 4) {
      return { 
        level: 'Good', 
        color: '#eab308',
        message: 'You\'re doing well, but there\'s room for improvement. Consider using public transport more often.' 
      };
    } else {
      return { 
        level: 'Needs Improvement', 
        color: '#ef4444',
        message: 'Your footprint is above average. Try reducing car usage and energy consumption.' 
      };
    }
  };

  const recommendation = getRecommendation(calculations.total);

  return (
    <div className="calculator-results">
      <div className="results-header">
        <h3>Your Daily Carbon Footprint</h3>
      </div>

      <div className="results-breakdown">
        <div className="breakdown-item">
          <span className="category">🚗 Transport:</span>
          <span className="value">{calculations.transport.toFixed(2)} kg CO₂</span>
        </div>
        <div className="breakdown-item">
          <span className="category">⚡ Energy:</span>
          <span className="value">{calculations.energy.toFixed(2)} kg CO₂</span>
        </div>
        <div className="breakdown-item">
          <span className="category">🍽️ Diet:</span>
          <span className="value">{calculations.diet.toFixed(2)} kg CO₂</span>
        </div>
        <div className="breakdown-total">
          <span className="category">Total:</span>
          <span className="value total">{calculations.total.toFixed(2)} kg CO₂</span>
        </div>
      </div>

      <div 
        className="recommendation"
        style={{ backgroundColor: recommendation.color + '20', borderLeft: `4px solid ${recommendation.color}` }}
      >
        <h4 style={{ color: recommendation.color }}>
          {recommendation.level}
        </h4>
        <p>{recommendation.message}</p>
      </div>

      <div className="results-actions">
        <button onClick={onSave} className="save-btn">
          💾 Save Calculation
        </button>
        <button onClick={onReset} className="reset-btn">
          🔄 Reset All
        </button>
      </div>

      {savedCalculations.length > 0 && (
        <div className="saved-calculations">
          <h4>Recent Calculations</h4>
          <div className="saved-list">
            {savedCalculations.map(calc => (
              <div key={calc.id} className="saved-item">
                <span className="saved-date">{calc.date}</span>
                <span className="saved-total">{calc.total.toFixed(2)} kg CO₂</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}