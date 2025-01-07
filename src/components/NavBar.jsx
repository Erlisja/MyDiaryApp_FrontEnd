import {Link} from 'react-router';




function NavBar() {
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
    </nav>
  );
}

export default NavBar;
