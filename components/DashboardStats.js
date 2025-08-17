import { useState } from 'react';

export default function DashboardStats({ profile, onGoalUpdate }) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(profile.goal);

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    onGoalUpdate(parseFloat(newGoal));
    setIsEditingGoal(false);
  };

  const progressPercentage = Math.min((profile.goal / profile.weeklyFootprint) * 100, 100);

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Weekly Footprint</h3>
        <div className="stat-value">{profile.weeklyFootprint} kg CO₂</div>
        <div className="stat-trend">📉 -15% from last week</div>
      </div>
      
      <div className="stat-card">
        <h3>Monthly Total</h3>
        <div className="stat-value">{profile.totalFootprint} kg CO₂</div>
        <div className="stat-trend">📈 +5% from last month</div>
      </div>
      
      <div className="stat-card goal-card">
        <h3>Weekly Goal</h3>
        {isEditingGoal ? (
          <form onSubmit={handleGoalSubmit} className="goal-form">
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              step="0.1"
              min="0"
            />
            <button type="submit">✓</button>
            <button type="button" onClick={() => setIsEditingGoal(false)}>✕</button>
          </form>
        ) : (
          <>
            <div className="stat-value">
              {profile.goal} kg CO₂
              <button 
                onClick={() => setIsEditingGoal(true)}
                className="edit-goal-btn"
              >
                ✏️
              </button>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}