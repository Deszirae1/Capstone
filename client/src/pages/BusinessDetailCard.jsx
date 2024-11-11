import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BusinessDetailCard = ({ business })=> {
    return (
      <div>
          <BusinessDetailCard business={ business } />
          <BusinessReviews />
      </div>
    );
  }
  
  
  export default BusinessDetailCard;
  
//will need to change to functional component and add props to the function