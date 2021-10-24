import navStyles from '../styles/Nav.css'


export default function Nav() {
  return (
    <nav className="nav">
      <span className="nav-span"></span>
     <ul className="nav-list">
       <li className="nav-item">about</li>
       <li className="nav-item">features</li>
       <li className="nav-item">login</li>
       <li className="nav-item">profile</li>
     </ul>
    </nav>
  )
}