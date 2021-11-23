import '../styles/Nav.css';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../provider/AuthProvider';

export default function Nav() {
  const { logout, user, setUser } = useContext(authContext);
  const [nav, setNav] = useState(false);
  let userObj = JSON.parse(localStorage.getItem('user'))

  
  const changeShadow = () => {
    if (window.scrollY > 0) {
      setNav(true)
    }
    else setNav(false);
  }
  window.addEventListener('scroll', changeShadow);
  // user (which was once null) is now being set to the res.json in the local storage
  useEffect(() => {
    if (userObj) {
      setUser(userObj)
    }
  }, [])
  
  return (
    <nav className={nav ? 'nav active' : 'nav'}>
      <span className="nav-span">{userObj && userObj.username}</span>
      <ul className="nav-list">
        <a href='/' className="nav-item"><i class="fas fa-home"></i></a>
        <div className="nav-expand">
          <a href='/#about-us' className="nav-item">about us</a>
          <p>|</p>
          <a href='/#features' className="nav-item">features</a>
          <p>|</p>
          <a href='/#contact' className="nav-item">contact</a>
        </div>
        {(user !== null) ?
          <>
            <span className="nav-item" onClick={() => logout()}><i class="fas fa-sign-in-alt"></i></span>
            <a href="/friends" className="nav-item"><i class="fas fa-user-friends"></i></a>
            <a href={`/profile/${userObj.id}`} className="nav-item"><i class="fas fa-user-cog"></i></a>
          </>
          : <>
            <a href='/register' className="nav-item fixed"><i class="fas fa-user-plus fixed"></i></a>
            <a href='/login' className="nav-item"><i class="fas fa-sign-in-alt"></i></a>
          </>}
      </ul>
    </nav>
  )


}