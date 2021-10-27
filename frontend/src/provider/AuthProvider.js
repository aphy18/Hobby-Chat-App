import { createContext, useState, useEffect, useRef } from "react";
import lottie from "lottie-web";

export const authContext = createContext();

export default function AuthProvider(props){

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
   
  const container = useRef(null)

  // login function is for setting localstorage
  function login(email, password, obj) {
    setAuth(true);
    const setAccountInfo = new Promise((res,rej) => {
      localStorage.setItem('user', JSON.stringify(obj))
      
      res(console.log('login successful'));
    })

    setAccountInfo
    .then(() => {
      console.log('authprovider 23')
      window.history.go()
        lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: require('../animations/9930-loading-ring-medium.json')
        })
      })
     }

  function logout() {
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