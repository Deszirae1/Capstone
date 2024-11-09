// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CardHeader from '@mui/material/CardHeader';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import CardContent from '@mui/material/CardContent'; (not used, Javier showed us this. May use later.)

import { useState } from "react";
import BusinessesContainer from "../components/BusinessesContainer";
import BusinessForm from "../components/BusinessForm";
import Footer from './Footer1'; 

const Businesses = ({ auth, businesses, businessFormAction }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleShowForm = () => setIsFormVisible(true);
  const handleHideForm = () => setIsFormVisible(false);

  return (
    <Container>
      <div>Businesses ({businesses.length})</div>
      <div>Share facts and reviews about our {businesses.length} businesses.</div>

      <BusinessesContainer businesses={businesses} auth={auth} />

      {/* Show/hide form */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleShowForm}
      >
        Add New Business
      </Button>

      {isFormVisible && (
        <BusinessForm 
          authId={auth?.id} 
          businessFormAction={businessFormAction} 
          onClose={handleHideForm} 
        />
      )}
    </Container>
  );
};

export default Businesses;


