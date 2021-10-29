import '../styles/Nav.css';
import { useContext, useEffect } from 'react';
import { authContext } from '../provider/AuthProvider';

export default function Nav(props) {
  const { logout, user, setUser } = useContext(authContext);
  
  let userObj = JSON.parse(localStorage.getItem('user'))
  
  // user (which was once null) is now being set to the res.json in the local storage
  useEffect(() => {
    if (userObj) {
      setUser(userObj)
      
    }
  },[])
  
  //  if the user exists (the data from the local storage)
  if (user) {
    return (
    <nav className="nav">
      <span className="nav-span">{userObj.username}</span>
      <ul className="nav-list">
        <a href='/' className="nav-item"><i class="fas fa-home"></i></a>
        <a href='/#about-us' className="nav-item">about us</a>
        <a href='/#features-container' className="nav-item">features</a>
        <a href='/#contact' className="nav-item">contact</a>
        <span className="nav-item" onClick={() => logout()}><i class="fas fa-sign-in-alt"></i></span>
        <a href='/profile' className="nav-item"><i class="fas fa-user-cog"></i></a>
      </ul>
    </nav>
    )
  } else {
    return (
      <nav className="nav">
      <span className="nav-span"></span>
     <ul className="nav-list">
       <a href='/' className="nav-item"><i class="fas fa-home"></i></a>
       <a href='/#about-us' className="nav-item">about us</a>
       <a href='/#features-container' className="nav-item">features</a>
       <a href='/#contact' className="nav-item">contact</a>
       <a href='/register' className="nav-item"><i class="fas fa-user-plus"></i></a>
       <a href='/login' className="nav-item"><i class="fas fa-sign-in-alt"></i></a>
     </ul>
    </nav>
    )
  }
 
}