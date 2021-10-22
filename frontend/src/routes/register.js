import registerStyles from '../styles/Register.css'

export default function Register() {
  return (
    <>
    <div className="master-register-container">
     <div className="register-container">
      <h1 className="register">Register</h1>
      <form className="register-form">
        <input type="email" placeholder="email" required className="input-field"></input>
        <input type="password" placeholder="password" required className="input-field"></input>
        <button type="submit" className="form-button-submit">Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}