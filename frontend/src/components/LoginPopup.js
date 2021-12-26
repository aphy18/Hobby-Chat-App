import React from 'react'
import '../styles/Popup.css'

export default function LoginPopup(props) {


    return (props.trigger) ? (
      <div className='pop-up-container'>
        <button className='pop-up-button' onClick={() => props.setTrigger(false)}>Close</button>
        <p>You have logged in! Click <a href="/">here</a> to go to home page</p>
      </div>
    ) : ""
  
  
}


// {(user !== null) ?
//   <>
//     <span className="nav-item" onClick={() => logout()}><i class="fas fa-sign-in-alt"></i></span>
//     <a href="/friends" className="nav-item"><i class="fas fa-user-friends"></i></a>
//     <a href="/requests" className="nav-item"><i class="fas fa-inbox"></i></a>
//     <a href={`/profile/${userObj.id}`} className="nav-item"><i class="fas fa-user-cog"></i></a>
//   </>
//   : <>
//     <a href='/register' className="nav-item fixed"><i class="fas fa-user-plus fixed"></i></a>
//     <a href='/login' className="nav-item"><i class="fas fa-sign-in-alt"></i></a>
//   </>}
// </ul>