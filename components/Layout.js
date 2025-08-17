import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}