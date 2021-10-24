import { useEffect } from 'react';
import '../styles/Home.css';
import '../styles/Body.css';
import Aos from "aos";
import 'aos/dist/aos.css';


export default function Home() {

  useEffect(() => {
    Aos.init({duration: 1000})
  }, [])

  return (
    <>
    <div className="master-home-container">
   <div className="home-header-container">
   <h1 className="home-header">Welcome to Chattr</h1>
   </div>

   <div data-aos="fade-up" className="the-about-container">
   <h2 className="about-us">About us</h2>
     <div className="about-us-container">
       <div data-aos="zoom-in"  data-aos-duration="1000" className="about-box"></div>
       <div data-aos="zoom-in" data-aos-duration="2000" className="about-box"></div>
       <div data-aos="zoom-in" data-aos-duration="3000" className="about-box"></div>
     </div>
   </div>
  
   
   <div data-aos="fade-up" className="main-features-container">
   <h2 className="features">Features</h2>
    <div data-aos="fade-left" className="features-container">
    <div className="features-image"></div>
      <div className="features-description"></div>
    </div>
    <div data-aos="fade-right" className="features-container">
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