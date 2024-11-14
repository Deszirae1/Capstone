import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const BusinessForm = ({ businessFormAction, onClose }) => {
  const [name, setName] = useState('');
  const [businessname_full, setBusinessnameFull] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form with data:", { name, businessname_full, address, description, productType });
    
    if (!name || !businessname_full || !address || !description || !productType) {
      setError('All fields are required.');
      return;
    }

    try {
      await businessFormAction({ name, businessname_full, address, description, productType });
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
          label="Business Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />
        
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />
        
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />
        
        <TextField
          label="Product Type(s) and Name(s)"
          variant="outlined"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
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