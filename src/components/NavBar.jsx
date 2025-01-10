import {Link} from 'react-router';
import { logOut } from '../utilities/users-services';




function NavBar() {

  function handleLogOut() {
    // call the logOut function from the users-services file to remove the token from local storage
    logOut();
    // set the user state to null to log out the user
    setUser(null);
  }



  return (
    <nav>
      <div className="nav-wrapper">
      
        <Link to = '/'>Home</Link>
        &nbsp;|&nbsp;
        <Link to='/diary'>Diary</Link>
        &nbsp;|&nbsp;
        <Link to='/affirmations'>Affirmations</Link>
        &nbsp;|&nbsp;
        <Link to='/goals'>Goals</Link>
        &nbsp;| &nbsp;
        <Link to='/profile'>Profile</Link>
      </div>
      <div>
        <Link to='' onClick={handleLogOut}>Log Out</Link>
      </div>
    </nav>
  );
}

export default NavBar;
