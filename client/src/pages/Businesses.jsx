import { useState } from "react";
import { Button } from '@mui/material';
import BusinessForm from "./BusinessForm";
import Footer from './Footer1'; 
import BusinessesContainer from "./BusinessesContainer";

const Businesses = ({ auth, businesses, businessFormAction }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleShowForm = () => setIsFormVisible(true);
  const handleHideForm = () => setIsFormVisible(false);

  return (
    <div>
      <div>Businesses ({businesses.length})</div>
      <div>Share facts and reviews about our {businesses.length} businesses.</div>

      <BusinessesContainer businesses={businesses} auth={auth} />

      {!isFormVisible && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#ff00cc',
              },
            }}
            onClick={handleShowForm}
          >
            Add New Business for Review
          </Button>
        </div>
      )}

      {isFormVisible && (
        <BusinessForm 
          authId={auth?.id} 
          businessFormAction={businessFormAction} 
          onClose={handleHideForm} 
        />
      )}
    </div>
  );
};

export default Businesses;

