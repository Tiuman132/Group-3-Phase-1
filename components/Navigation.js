import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          🌱 EcoTrack
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            href="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/calculator" 
            className={`nav-link ${isActive('/calculator') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Calculator
          </Link>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </nav>
  );
}