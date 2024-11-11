import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const BusinessForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',  // Horizontally center the form
        paddingTop: '40px',         // Adjusts space from top of page 
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
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
          label="Street Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
          style={{ width: '100%' }}
        />
        
        <TextField
          label="Product Type(s) and Name(s)"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
