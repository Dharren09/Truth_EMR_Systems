import { useEffect, useState } from 'react';

import UserDetails  from '../components/UserDetails'


const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users');
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };
    fetchUsers();
  }, []);

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