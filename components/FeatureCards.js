export default function FeatureCards() {
  const features = [
    {
      icon: '📊',
      title: 'Track Your Footprint',
      description: 'Monitor your carbon emissions across transportation, energy, and diet with our easy-to-use calculator.'
    },
    {
      icon: '🎯',
      title: 'Set & Achieve Goals',
      description: 'Set personal sustainability goals and track your progress with detailed analytics and insights.'
    },
    {
      icon: '💡',
      title: 'Get Recommendations',
      description: 'Receive personalized tips and suggestions to reduce your environmental impact effectively.'
    },
    {
      icon: '🏆',
      title: 'Earn Achievements',
      description: 'Stay motivated with our gamified system of badges and milestones for sustainable living.'
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="features-title">Why Choose EcoTrack?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}