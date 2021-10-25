import '../styles/Nav.css';


export default function Nav() {
  return (
    <nav className="nav">
      <span className="nav-span">Username</span>
     <ul className="nav-list">
       <a href='/#about-us' className="nav-item">about us</a>
       <a href='/#features-container' className="nav-item">features</a>
       <a href='/#contact' className="nav-item">contact</a>
       <a href='/login' className="nav-item"><i class="fas fa-sign-in-alt"></i></a>
       <a href='/profile' className="nav-item"><i class="fas fa-user-cog"></i></a>
     </ul>
    </nav>
  )
}