import UserReviews from "./UserReviews";
import UserDetail from "./UserDetail";

const Account = ({ auth }) => {
  if (!auth) {
    return <p>Loading...</p>; 
  }

  const { username, id } = auth;

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <UserDetail user={{ username, id }} />
      <UserReviews auth={{ username, id }} UserId={id} />
    </div>
  );
};

export default Account;