import { useEffect } from 'react';
import { useUsersContext } from '../hooks/useUsersContext'
import { useAuthContext } from "../hooks/useAuthContext"

import UserDetails  from '../components/UserDetails'


const Home = () => {
  const {users, dispatch} = useUsersContext()
  const {auth_user} = useAuthContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users', {
        headers: {'Authorization': `Bearer ${auth_user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }

    if (auth_user) {
      fetchUsers();
    }
    
  }, [dispatch, auth_user]);

  return (
    <div className="home">
      <div className="users">
        {users && users.map((user) => (
          <UserDetails key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;