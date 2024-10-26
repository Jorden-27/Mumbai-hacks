import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Example array of franchises
const franchises = ["Andheri", "Borivali", "Malad", "Airoli"];

function Login() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredFranchises, setFilteredFranchises] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Filter franchises based on search term
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:9002/api/franchise/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ franchiseName: searchTerm, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Use the ID from the response to navigate to the correct route
      navigate(`/inventory`);
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #ebf4ff, #c3dafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#ebf4ff', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '16px' }}>
              <i className="fas fa-building" style={{ fontSize: '2rem', color: '#5a67d8' }}></i>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>Franchise Login</h1>
            <p style={{ color: '#718096', marginTop: '8px' }}>Welcome back, please login to your franchise portal</p>
          </div>

          {/* Error message display */}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
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

            <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '0.5rem', backgroundColor: '#5a67d8', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
