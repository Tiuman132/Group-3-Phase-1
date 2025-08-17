import { useState } from 'react';

export default function RecentActivities({ activities, onAddActivity }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'transport',
    description: '',
    emissions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddActivity({
      ...newActivity,
      emissions: parseFloat(newActivity.emissions)
    });
    setNewActivity({ type: 'transport', description: '', emissions: '' });
    setShowAddForm(false);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'transport': return '🚗';
      case 'energy': return '⚡';
      case 'diet': return '🍽️';
      default: return '📊';
    }
  };

  return (
    <div className="recent-activities">
      <div className="activities-header">
        <h3>Recent Activities</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-activity-btn"
        >
          {showAddForm ? '✕' : '+ Add Activity'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="add-activity-form">
          <select 
            value={newActivity.type}
            onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
          >
            <option value="transport">Transport</option>
            <option value="energy">Energy</option>
            <option value="diet">Diet</option>
          </select>
          
          <input
            type="text"
            placeholder="Description"
            value={newActivity.description}
            onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
            required
          />
          
          <input
            type="number"
            placeholder="Emissions (kg CO₂)"
            value={newActivity.emissions}
            onChange={(e) => setNewActivity({...newActivity, emissions: e.target.value})}
            step="0.1"
            min="0"
            required
          />
          
          <button type="submit">Add Activity</button>
        </form>
      )}

      <div className="activities-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-details">
              <div className="activity-description">{activity.description}</div>
              <div className="activity-date">{activity.date}</div>
            </div>
            <div className="activity-emissions">
              {activity.emissions} kg CO₂
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}