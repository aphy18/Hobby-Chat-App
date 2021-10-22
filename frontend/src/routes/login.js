import loginStyles from '../styles/Login.css'
import bodyStyles from '../styles/Body.css'

export default function Login() {
  return (
  <>
   <div className="master-login-container">
    <div className="login-container">
     <h1>Login</h1>
     <form className="login-form">
       <input type="email" placeholder="email" required></input>
       <input type="password" placeholder="password" required></input>
       <button type="submit" className="form-button-submit">Submit</button>
     </form>
   </div>
   </div>
   </>
  )
}