import { useLocation } from 'react-router-dom';

const UserDetail = ({ businesses, auth }) => {
  const location = useLocation(); 

  console.log(location); 

  const businessCount = businesses ? businesses.length : 0;

  return (
    <h1>Placeholder for Businesses {businessCount}</h1>
  );
}

export default UserDetail;



//possibly done
