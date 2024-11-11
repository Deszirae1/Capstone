import BusinessCard from "./BusinessCard";
import BusinessDetailCard from "./BusinessDetailCard";
import BusinessReviews from "./BusinessReviews"; 


const BusinessDetail = ({ business })=> {
  return (
    <div>
        <BusinessDetailCard business={ business } />
        <BusinessReviews />
    </div>
  );
}


export default BusinessDetail;

//will need to change to functional component and add props to the function