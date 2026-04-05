import { Routes, Route, Link } from 'react-router-dom';
import Schedule from './Schedule';
import Patients from './Patients';
import Inventory from './Inventory';

const LandingPage = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>St. Albatross Management System</h1>
    <p style={styles.subtitle}>Hospital Administration & Resource Tracking</p>
    
    <div style={styles.buttonGrid}>
      <Link to="/patients" style={styles.navCard}>
        <h3>Patients</h3>
        <p>View and manage patient records</p>
      </Link>

      <Link to="/schedule" style={styles.navCard}>
        <h3>Schedule</h3>
        <p>View appointment calendar</p>
      </Link>

      <Link to="/inventory" style={styles.navCard}>
        <h3>Inventory</h3>
        <p>Track medical supplies and stock</p>
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.navLogo}>St. Albatross</Link>
        <div>
          <Link to="/patients" style={styles.navLink}>Patients</Link>
          <Link to="/schedule" style={styles.navLink}>Schedule</Link>
          <Link to="/inventory" style={styles.navLink}>Inventory</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    background: '#2c3e50',
    color: 'white',
    alignItems: 'center'
  },
  navLogo: { color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' },
  navLink: { color: '#ecf0f1', marginLeft: '20px', textDecoration: 'none' },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    textAlign: 'center'
  },
  title: { fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px' },
  subtitle: { fontSize: '1.1rem', color: '#7f8c8d', marginBottom: '40px' },
  buttonGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' },
  navCard: {
    width: '200px',
    padding: '20px',
    textDecoration: 'none',
    color: '#2c3e50',
    border: '1px solid #ddd',
    borderRadius: '12px',
    transition: '0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  }
};

export default App;