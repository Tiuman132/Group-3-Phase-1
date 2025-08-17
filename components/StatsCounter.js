import { useState, useEffect } from 'react';

export default function StatsCounter({ stats }) {
  const [displayStats, setDisplayStats] = useState({
    totalUsers: 0,
    carbonSaved: 0,
    countriesActive: 0
  });

  useEffect(() => {
    // Animate counters
    const animateCounter = (key, targetValue) => {
      let current = 0;
      const increment = targetValue / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(timer);
        }
        setDisplayStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 40);
    };

    animateCounter('totalUsers', stats.totalUsers);
    animateCounter('carbonSaved', stats.carbonSaved);
    animateCounter('countriesActive', stats.countriesActive);
  }, [stats]);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{displayStats.totalUsers.toLocaleString()}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{displayStats.carbonSaved.toLocaleString()}</div>
            <div className="stat-label">kg CO₂ Saved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{displayStats.countriesActive}</div>
            <div className="stat-label">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}