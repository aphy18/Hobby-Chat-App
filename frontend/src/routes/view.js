
// store username and id, store it in a message table on POST, on GET receive it back
import { useEffect, useState } from 'react';
import '../styles/MessageList.css';
import MessageOption from '../components/MessageOption';
import axios from 'axios';

export default function View() {

  async function userData() {
    const getUserData = await axios.get('http://localhost:8080/view')

    console.log('getting userData -->', getUserData)
  }

  useEffect(() => {
    userData()
  },[])
  

 return (
   <h1>View Users</h1>
 )
 
  
}