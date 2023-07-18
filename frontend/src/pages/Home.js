import { useEffect } from 'react';
import { useUsersContext } from '../hooks/useUsersContext'

import UserDetails  from '../components/UserDetails'


const Home = () => {
  const {users, dispatch} = useUsersContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    };
    fetchUsers();
  }, [dispatch]);

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