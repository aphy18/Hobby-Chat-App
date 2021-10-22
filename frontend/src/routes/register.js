import registerStyles from '../styles/Register.css'

export default function Register() {
  return (
    <>
    <div className="master-register-container">
     <div className="register-container">
      <h1 className="register"><i>Register</i></h1>
      <form className="register-form">
        <input type="text" placeholder="first name" required className="input-field"></input>
        <input type="text" placeholder="last name" required className="input-field"></input>
        <select>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" placeholder="address" required className="input-field"></input>
        <input type="email" placeholder="email" required className="input-field"></input>
        <input type="password" placeholder="password" required className="input-field"></input>
        <input type="password" placeholder="re-enter password" required className="input-field"></input>
        <div className="button-container">
      <button type="submit" className="form-button-submit">Submit</button>
      </div>
      </form>
    </div>
    </div>
    </>
  )
}