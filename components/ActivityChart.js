export default function ActivityChart({ period, activities }) {
  const getChartData = () => {
    // Mock data for different periods
    switch (period) {
      case 'week':
        return [
          { day: 'Mon', transport: 0.8, energy: 1.2, diet: 0.5 },
          { day: 'Tue', transport: 0.6, energy: 1.1, diet: 0.4 },
          { day: 'Wed', transport: 0.9, energy: 1.0, diet: 0.6 },
          { day: 'Thu', transport: 0.7, energy: 1.3, diet: 0.3 },
          { day: 'Fri', transport: 0.8, energy: 0.9, diet: 0.5 },
          { day: 'Sat', transport: 0.4, energy: 1.4, diet: 0.7 },
          { day: 'Sun', transport: 0.3, energy: 1.5, diet: 0.8 },
        ];
      case 'month':
        return [
          { period: 'Week 1', transport: 5.2, energy: 8.1, diet: 3.5 },
          { period: 'Week 2', transport: 4.8, energy: 7.9, diet: 3.2 },
          { period: 'Week 3', transport: 5.5, energy: 8.3, diet: 3.8 },
          { period: 'Week 4', transport: 4.9, energy: 7.7, diet: 3.1 },
        ];
      default:
        return [];
    }
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.flatMap(item => [item.transport, item.energy, item.diet]));

  return (
    <div className="activity-chart">
      <h3>Carbon Footprint Trends - {period}</h3>
      <div className="chart-container">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color transport"></span>
            <span>Transport</span>
          </div>
          <div className="legend-item">
            <span className="legend-color energy"></span>
            <span>Energy</span>
          </div>
          <div className="legend-item">
            <span className="legend-color diet"></span>
            <span>Diet</span>
          </div>
        </div>
        
        <div className="chart">
          {chartData.map((item, index) => (
            <div key={index} className="chart-bar-group">
              <div className="chart-bars">
                <div 
                  className="chart-bar transport"
                  style={{ height: `${(item.transport / maxValue) * 100}%` }}
                  title={`Transport: ${item.transport} kg CO₂`}
                ></div>
                <div 
                  className="chart-bar energy"
                  style={{ height: `${(item.energy / maxValue) * 100}%` }}
                  title={`Energy: ${item.energy} kg CO₂`}
                ></div>
                <div 
                  className="chart-bar diet"
                  style={{ height: `${(item.diet / maxValue) * 100}%` }}
                  title={`Diet: ${item.diet} kg CO₂`}
                ></div>
              </div>
              <div className="chart-label">
                {item.day || item.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}