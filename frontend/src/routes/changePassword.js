import '../styles/ChangePassword.css'
import useForm from '../customHooks/useForm'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function ChangePassword() {
  const { values, setValues, handleChange, handleSubmit } = useForm(newPassword);
  let userObj = JSON.parse(localStorage.getItem('user'))
  const history = useHistory()

  async function newPassword() {
    const updatePassword = await axios.put('http://localhost:8080/changepassword', { values, userObj })
    console.log('update Password axios', updatePassword)
    setValues({});
    alert('password successfully changed')
    history.push(`/profile/${userObj.id}`)
  }

  console.log('values',values)

  return (
    <>
    <div className="change-password-container">
    <h1>Change Password</h1>
    <form onSubmit={handleSubmit} className="change-password-form">
     <input name="password" className="new-password" type="password" value={values.password} onChange={handleChange} placeholder="Enter New Password" required></input>
     <input name="password_confirm" className="new-password" type="password" value={values.password_confirm} onChange={handleChange} placeholder="Re-enter New Password"required></input>
     <button>Submit</button>
    </form>

    </div>
    </>
  )
}
