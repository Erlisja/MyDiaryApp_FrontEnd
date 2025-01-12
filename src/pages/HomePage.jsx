import React, { useState, useEffect } from 'react';
import { getUser } from '../utilities/users-services';
import NavBar from '../components/NavBar';

function HomePage() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    // Fetch user details on component mount
    setUser(getUser());
  }, []);

  return (
    <>
     <NavBar layout={"horizontal"} />
      <div className="home-container">
        {user ? (
          <>
            <h1 className='title'>Welcome to your diary, {user.username}</h1>
            <h1 className='subtitle-txt'>What are you thinking about today?</h1>
          </>
        ) : (
          <h1>Welcome! Please log in to access your diary.</h1>
        )}
      </div>
     
    </>
  );
}

export default HomePage;
