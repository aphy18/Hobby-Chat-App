import '../styles/Register.css'
import '../styles/Body.css'
import useForm from '../customHooks/useForm'

export default function Register() {
  
  

  return (
    <>
    <div className="master-register-container">
     <div className="register-container">
     
      <h1 className="register-header"><i>Register</i></h1>
     
      <form className="register-form">
        <div className="register-form-left-and-right">
        <div className="register-form-left">
        <input type="text" placeholder="username" required className="register-input-field" value="username"></input>
        <input type="text" placeholder="first name" required className="register-input-field" value="first_name"></input>
        <input type="text" placeholder="last name" required className="register-input-field" value="last_name"></input>
        <select className="register-input-field" id="gender-select" value="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        </div>
        <div className="register-form-right">
        <input type="text" placeholder="address" required className="register-input-field" value="address"></input>
        <input type="email" placeholder="email" required className="register-input-field" value="email"></input>
        <input type="password" placeholder="password" required className="register-input-field" value="password"></input>
        <input type="password" placeholder="re-enter password" required className="register-input-field" value="password_confirm"></input>
        </div>
        <span className="register-image"><i class="fa-solid fa-registered"></i></span>
        <span className="register-image"><i class="fa-solid fa-user"></i></span>
        </div>
        <div className="button-container">
      <button type="submit" className="form-button-submit">Submit</button>
      </div>
      </form>
    </div>
    </div>
    </>
  )
}