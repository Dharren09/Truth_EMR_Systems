import { useUsersContext } from '../hooks/useUsersContext';
import { useAuthContext } from '../hooks/useAuthContext'

const UserDetails = ({ user }) => {
  const { dispatch } = useUsersContext();
  const { auth_user } = useAuthContext()

  const handleClick = async () => {
    if (!auth_user) {
      return
    }

    const response = await fetch(`/users/${user.id}`, {
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${auth_user.token}`
        }
    });
    const json = await response.json();

    if (response.ok) {
        dispatch({ type: 'DELETE_USER', payload: json });
    }
  };

  return (
    <div className="user-details">
      <h4>{user.name}</h4>
      <p>
        <strong>Username: </strong>
        {user.username}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <p>
        <strong>Role: </strong>
        {user.role}
      </p>
      <p>
        <strong>Gender: </strong>
        {user.gender}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default UserDetails;
