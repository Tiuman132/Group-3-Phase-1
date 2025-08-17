import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Track Your Impact, <span className="highlight">Change The World</span>
        </h1>
        <p className="hero-description">
          Take control of your carbon footprint with EcoTrack. Monitor your daily activities, 
          get personalized recommendations, and join a community committed to environmental sustainability.
        </p>
        <div className="hero-buttons">
          <Link href="/calculator" className="btn btn-primary">
            Start Tracking
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            View Dashboard
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="earth-animation">🌍</div>
      </div>
    </section>
  );
}