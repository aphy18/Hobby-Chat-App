import { useState, useEffect, useContext } from 'react';
import { authContext } from '../provider/AuthProvider';
import '../styles/Home.css';
import '../styles/Body.css';
import Aos from "aos";
import 'aos/dist/aos.css';
import PulseLoader from "react-spinners/PulseLoader";


export default function Home() {

  const [loading, setLoading] = useState(false);

  const { user } = useContext(authContext);

  useEffect(() => {
    Aos.init({duration: 1000})
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  if (loading && user) {
    return (
      <div className="master-loading-container">
      <PulseLoader className="loading" loading={loading} size={35} />
      </div>
    )
  } else {
      
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
   <div className="footer">
     
   </div>

   </div>
    
   </>
  )
  }
}