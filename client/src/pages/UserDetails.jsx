import { useParams } from 'react-router-dom';
import UserDetail from './UserDetail';
import UserReviews from './UserReviews';

function UserDetails({ auth }) {
    const { id } = useParams();
  
    return (
      <div>
        <UserDetail UserId={id} />
        <UserReviews UserId={id} auth={auth} />
      </div>
    );
}

export default UserDetails;


  //possibly done. 