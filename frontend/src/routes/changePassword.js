import '../styles/ChangePassword.css'

export default function ChangePassword() {
  return (
    <>
    <div className="change-password-container">
    <h1>Change Password</h1>
    <form className="change-password-form">
     <input name="password" className="new-password" type="password" placeholder="Enter New Password" required></input>
     <input name="password_confirm" className="new-password" type="password" placeholder="Re-enter New Password"required></input>
     <button>Submit</button>
    </form>

    </div>
    </>
  )
}
