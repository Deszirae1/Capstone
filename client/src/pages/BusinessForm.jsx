import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const BusinessForm = ({ businessFormAction, onClose }) => {
  const [businessname_full, setBusinessnameFull] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [price_range, setPriceRange] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form with data:", { businessname_full, street_address, city, state, zip, price_range });

    if (!businessname_full || !street_address || !city || !state || !zip || !price_range) {
      setError('All fields are required.');
      return;
    }

    try {
      await businessFormAction({ businessname_full, street_address, city, state, zip, price_range });
      console.log("Form submitted successfully");
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError('Failed to submit info. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px' }}>
        <h2>Business for Review</h2>
        {error && <div className="error">{error}</div>}
        
        <TextField
          label="Full Business Name"
          variant="outlined"
          value={businessname_full}
          onChange={(e) => setBusinessnameFull(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />

        <TextField
          label="Street Address"
          variant="outlined"
          value={street_address}
          onChange={(e) => setStreetAddress(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />

        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />

        <TextField
          label="State"
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />

        <TextField
          label="Zip"
          variant="outlined"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />

        <TextField
          label="Price Range"
          variant="outlined"
          value={price_range}
          onChange={(e) => setPriceRange(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: '#FFFFFF',
              padding: '6px 12px',
              fontSize: '14px',
              width: 'auto',
              marginTop: '16px',
              '&:hover': {
                backgroundColor: '#ff00cc',
              },
            }}
          >
            Submit Info
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;