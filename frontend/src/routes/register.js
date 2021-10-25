import '../styles/Register.css'
import '../styles/Body.css'
import useForm from '../customHooks/useForm'
import axios from 'axios'

export default function Register() {
  
  const { values, setValues, handleChange, handleSubmit } = useForm(handleRegistration)

  function handleRegistration(){
    // if (values.password.length < 4) {
    //   console.log('password must be more than 3 characters')
    //   return;
    // }
    if (values.password !== values.password_confirm) {
      console.log('passwords do not match')
      return;
    }
    console.log('form submitted')
    setValues({})
  }

  function submitFormData() {
    const sendData = async () => {
      const formData = await Promise.all([
        axios.post(`http://localhost:8080/register`, { values })
      ])
      await console.log('response data -->', formData)
      return formData.data;
    }
    sendData()
  }

  return (
    <>
    <div className="master-register-container">
     <div className="register-container">
     
      <h1 className="register-header"><i>Register</i></h1>
     
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-left-and-right">
        <div className="register-form-left">
        <input type="text" name="username" placeholder="username" required className="register-input-field" value={values.username} onChange={handleChange}></input>
        <input type="text" name="first_name" placeholder="first name" required className="register-input-field" value={values.first_name} onChange={handleChange}></input>
        <input type="text" name="last_name" placeholder="last name" required className="register-input-field" value={values.last_name} onChange={handleChange}></input>
        <select name="gender" className="register-input-field" id="gender-select" value={values.gender} onChange={handleChange}>
          <option>Select a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        </div>
        <div className="register-form-right">
        <input type="text" name="address" placeholder="address" required className="register-input-field" value={values.address} onChange={handleChange}></input>
        <input type="email" name="email" placeholder="email" required className="register-input-field" value={values.email} onChange={handleChange}></input>
        <input type="password" name="password" placeholder="password" required className="register-input-field" value={values.password} onChange={handleChange}></input>
        <input type="password" name="password_confirm"placeholder="re-enter password" required className="register-input-field" value={values.password_confirm} onChange={handleChange}></input>
        </div>
        <span className="register-image"><i class="fa-solid fa-registered"></i></span>
        <span className="register-image"><i class="fa-solid fa-user"></i></span>
        </div>
        <div className="button-container">
      <button type="submit" className="form-button-submit" onClick={submitFormData}>Submit</button>
      </div>
      </form>
    </div>
    </div>
    </>
  )
}