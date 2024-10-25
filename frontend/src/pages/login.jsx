import React, { useState, useEffect } from 'react';

// Sample franchise data
const franchises = [
  "McDonald's NYC Downtown",
  "McDonald's Brooklyn Heights",
  "McDonald's Queens Center",
  "Subway Manhattan Central",
  "Subway Times Square",
  "KFC Brooklyn Main",
  "KFC Staten Island",
  "Domino's Manhattan West",
  "Domino's East Village"
];

function Login() {
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredFranchises, setFilteredFranchises] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = franchises.filter(franchise =>
        franchise.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFranchises(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const handleFranchiseSelect = (franchise) => {
    setSearchTerm(franchise);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { franchise: searchTerm, password });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #ebf4ff, #c3dafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '32px', spaceY: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#ebf4ff', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '16px' }}>
              <i className="fas fa-building" style={{ fontSize: '2rem', color: '#5a67d8' }}></i>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>Franchise Login</h1>
            <p style={{ color: '#718096', marginTop: '8px' }}>Welcome back, please login to your franchise portal</p>
          </div>

          <form onSubmit={handleSubmit} style={{ spaceY: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '8px' }}>Franchise Name</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '0.5rem', border: '1px solid #cbd5e0', transition: 'border-color 0.3s', fontSize: '1rem' }}
                placeholder="Search your franchise..."
              />
              {showDropdown && filteredFranchises.length > 0 && (
                <div style={{ position: 'absolute', zIndex: 10, width: '100%', marginTop: '8px', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: '240px', overflowY: 'auto' }}>
                  {filteredFranchises.map((franchise, index) => (
                    <div
                      key={index}
                      style={{ padding: '12px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                      onClick={() => handleFranchiseSelect(franchise)}
                    >
                      {franchise}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4a5568', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '0.5rem', border: '1px solid #cbd5e0', fontSize: '1rem' }}
                placeholder="Enter your password"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ height: '1rem', width: '1rem', color: '#5a67d8', borderRadius: '0.25rem' }} />
                <label style={{ marginLeft: '8px', fontSize: '0.875rem', color: '#4a5568' }}>Remember me</label>
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <a href="#" style={{ fontWeight: '500', color: '#5a67d8', textDecoration: 'none' }}>Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: '#5a67d8',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              Sign in to Dashboard
              <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i>
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem' }}>
            <span style={{ color: '#718096' }}>Need help? </span>
            <a href="#" style={{ color: '#5a67d8', textDecoration: 'none', fontWeight: '500' }}>Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;