import '../styles/Login.css'
import '../styles/Body.css'

export default function Login() {
  return (
  <>
   <div className="master-login-container">
    <div className="login-container">
     <h1 className="login"><i>Login</i></h1>
     <form className="login-form">
       <input type="email" placeholder="email" required className="input-field"></input>
       <input type="password" placeholder="password" required className="input-field"></input>
       <button type="submit" className="form-button-submit">Submit</button>
     </form>
   </div>
   </div>
   </>
  )
}