import BusinessForm from "./BusinessForm";
import UserCard from "./UserCard";
import BusinessesContainer from "./BusinessesContainer";

const Admin = ({ auth: { username }, users, businesses }) => {
  return (
    <div>
      <h1>Hi {username}!</h1>

      <h2>Add a business</h2>
      <BusinessForm />
      
      <h2>Businesses</h2>
      <BusinessesContainer businesses={businesses} auth={{ username }} />

      <h2>Users</h2>
      {users.map((user) => (
        <UserCard key={user.id} user={user} auth={{ username }} />
      ))}
    </div>
  );
};

export default Admin;