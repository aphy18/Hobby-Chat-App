import { useState, useEffect } from 'react';
import '../styles/Home.css';
import '../styles/Body.css';
import Aos from "aos";
import 'aos/dist/aos.css';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';


export default function Home() {

  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState([]);
  const userObj = JSON.parse(localStorage.getItem('user'));
  
  
  async function getUserData(){
    console.log('base home', home)
    if (userObj === null) {
      console.log('end of the road')
      return;
    }
    const userData = await axios.get(`http://localhost:8080`)
    setHome(userData.data)
  }

  useEffect(() => {
    getUserData();
    setLoading(true);
    Aos.init({duration: 1200})
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  
  for (let obj of Object.keys(home)) {
   if (home[obj].id === userObj.id) {
     console.log('YES', home[obj])
     setHome(home[obj])
    }
  }
  
  console.log('new state', home)

 



  if (loading && home) {
    return (
      <div className="master-loading-container">
      <PulseLoader className="loading" loading={loading} size={35} />
      </div>
    )
  } else if (!loading && home.id) {
      
  return (
    <>
  <div className="master-home-container">
    <div className="home-header-container">
     <h1 data-aos="fade-up" className="home-header">Welcome to Chatter</h1>
    </div>
    <span className="home-page-welcome-back" data-aos="fade-up">Nice to see you back {home.username}! 😊 </span>
   <div data-aos="fade-up" className="the-about-container" id="about-us">
   <h2 className="about-us">About us</h2>
     <div className="about-us-container">
       <div data-aos="zoom-in"  data-aos-duration="800" className="about-box"></div>
       <div data-aos="zoom-in" data-aos-duration="800" className="about-box"></div>
       <div data-aos="zoom-in" data-aos-duration="800" className="about-box"></div>
     </div>
   </div>
  
   
   <div data-aos="fade-up" className="main-features-container" id="features">
   <h2 className="features">Features</h2>
    <div data-aos="fade-left" className="features-container">
    <div className="features-image"></div>
      <div className="features-description"></div>
    </div>
    <div data-aos="fade-right" className="features-container" id="contact">
      <div className="features-description"></div>
      <div className="features-image"></div>
    </div>
   </div>
   <a href='/messageList' className="home-page-view-users" data-aos="zoom-in-up" data-aos-duration="500">View all users here</a>
   <div className="footer">
  </div>
  </div>
  </>
   )
  } else if (!loading && !home.id) {
    return (
    <>
    <div className="master-home-container">
     
     <div className="home-header-container">
     <h1 data-aos="fade-up" className="home-header">Welcome to Chatter</h1>
     </div>
  
     <div data-aos="fade-up" className="the-about-container" id="about-us">
     <h2 className="about-us">About us</h2>
       <div className="about-us-container">
         <div data-aos="zoom-in"  data-aos-duration="800" className="about-box"></div>
         <div data-aos="zoom-in" data-aos-duration="800" className="about-box"></div>
         <div data-aos="zoom-in" data-aos-duration="800" className="about-box"></div>
       </div>
     </div>
    
     
     <div data-aos="fade-up" className="main-features-container" id="features-container">
     <h2 className="features">Features</h2>
      <div data-aos="fade-left" className="features-container">
      <div className="features-image"></div>
        <div className="features-description"></div>
      </div>
      <div data-aos="fade-right" className="features-container" id="contact">
        <div className="features-description"></div>
        <div className="features-image"></div>
      </div>
     </div>
     <a className="home-page-click-here" href="/register" data-aos="zoom-in-up" data-aos-duration="500">Click to Register Now!</a>
     <div className="footer">
    </div>
    </div>
    </>
    )
  }
}