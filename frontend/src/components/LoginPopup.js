import React from 'react'

export default function LoginPopup(props) {
  return (props.trigger) ? (
    <div className='pop-up-container'>
      <p>You have logged in! Click <a href="/">here</a> to go to home page</p>
      <button>Close</button>
    </div>
  ) : ""
}
