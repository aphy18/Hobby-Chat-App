import navStyles from '../styles/Nav.css'


export default function Nav() {
  return (
    <nav className="nav">
      <span className="nav-span"></span>
     <ul className="nav-list">
       <li className="nav-item">about us</li>
       <li className="nav-item">features</li>
       <li className="nav-item">contact</li>
       <li className="nav-item"><i class="fas fa-sign-in-alt"></i></li>
       <li className="nav-item"><i class="fas fa-user-cog"></i></li>
     </ul>
    </nav>
  )
}