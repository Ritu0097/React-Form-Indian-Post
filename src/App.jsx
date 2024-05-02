import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/; 
    if (regex.test(value) || value === '') {
      setSearchTerm(value);
      if (value.length !== 6) {
        setErrorMessage('Postal code must be 6 digits.');
      } else {
        setErrorMessage('');
      }
    }
  };

  const handleLookupClick = () => {
    if (searchTerm.length !== 6) {
      setErrorMessage('Postal code must be 6 digits.');
      return;
    }
    setIsLoading(true);
    fetch(`https://api.postalpincode.in/pincode/${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false); 
        if (data && data.length > 0 && data[0].Status === 'Success') {
          const pincodeData = data[0].PostOffice;
          navigate('/pincode-details', { state: pincodeData });
          setErrorMessage('');
        } else {
          setErrorMessage('Invalid pincode. Please try again.');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('An error occurred while fetching data. Please try again later.');
      });
  };

  return (
    <div className="container mt-3">
      <h1>Enter Pincode</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          maxLength="6"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
        />
        <div className="input-group-append">
          <button
            className="btn"
            style={{
              borderRadius: '5px',
              padding: '10px',
              marginTop: '10px',
              width: '180px',
              background: 'black',
              color: 'white',
            }}
            onClick={handleLookupClick}
          >
            Lookup
          </button>
        </div>
      </div>
      {isLoading && <Loader />} 
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default App;