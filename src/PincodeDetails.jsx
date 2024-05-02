import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PincodeDetails.css';
const PincodeDetails = () => {
  const location = useLocation();
  const pincodeData = location.state;
  const [filterTerm, setFilterTerm] = useState('');

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const filteredData = pincodeData?.filter((place) =>
    place.Name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="container mt-3">
      {pincodeData && (
        <div className="mb-3">
          <p><b>Pincode:{pincodeData[0].Pincode}</b> </p>
          <p><b>Number of results found:</b> {filteredData.length}</p>
        </div>
      )}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Post Office..."
          value={filterTerm}
          onChange={handleFilterChange}
          style={{ width: '100%', padding: '8px', marginTop: '10px' }}
        />
      </div>
      <div className="pincode-details-container">
        {filteredData &&
          filteredData.map((place, index) => (
            <div key={index} className="pincode-detail">
              <p>Post office name: {place.Name}</p>
              <p>Pincode: {place.Pincode}</p>
              <p>District: {place.District}</p>
              <p>State: {place.State}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PincodeDetails;