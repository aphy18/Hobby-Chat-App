import '../styles/Message.css'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';


export default function Message(){
  const [state, setState] = useState({message: '', name: ''})
  const [chat, setChat] = useState([])
  return (
   <div className="master-message-container">
     <form className="message-form">
       <input type="text"></input>
       <button>Send Message</button>
     </form>

   </div>
  )
}