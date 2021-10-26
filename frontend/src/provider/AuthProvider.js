import { createContext, useState } from "react";

 
export const authContext = createContext();

export default function AuthProvider(props){
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);


  function login(email, password, obj) {
    setAuth(true);
    
    // delete obj.password_confirm;
    // delete obj.password;

    const setAccountInfo = new Promise((res,rej) => {
      localStorage.setItem('user', JSON.stringify(obj))
      
      res(console.log('login successful'));
    })

    setAccountInfo
    .then(() => {
      console.log('authprovider 23')
      // window.location.reload()
    })
  }

  function logout() {
    setAuth(false);
    setUser(null);
    localStorage.setItem('user', null);
  }

  const userData = { auth, user, setUser, login, logout}

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  )
 
}