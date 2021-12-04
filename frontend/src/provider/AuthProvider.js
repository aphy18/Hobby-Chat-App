import { createContext, useState } from "react";



export const authContext = createContext();

export default function AuthProvider(props){

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
 
  
  // login function is for setting localstorage
  
  function login(email, password, obj) {
    setAuth(true);
    const setAccountInfo = new Promise((res,rej) => {
      localStorage.setItem('user', JSON.stringify(obj))
      
      res(console.log('login successful'));
    })

    setAccountInfo
    .then(() => {
      console.log('refresh')
    })
  }
   
  function logout() {
  window.location.href = '/login'
  setAuth(false);
  setUser(null);
  localStorage.setItem('user', null);
 }

  const userData = { auth, user, setUser, login, logout }

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  )
 
}