import { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Body.css";
import Aos from "aos";
import "aos/dist/aos.css";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import ParticleBackground from "../components/Particles";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState([]);
  const userObj = JSON.parse(localStorage.getItem("user"));

  async function getUserData() {
    console.log("base home", home);
    if (userObj === null) {
      console.log("end of the road");
      return;
    }
    const userData = await axios.get(`http://localhost:8080`);
    
    const userArr = userData.data

    for (let obj of userArr) {
      if (obj.id === userObj.id) {
        setHome(obj)
      }
    }
  }

  console.log('home state', home)

  useEffect(() => {
    getUserData();
    setLoading(true);
    Aos.init({ duration: 1200 });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  
  if (loading && home) {
    return (
      <div className="master-loading-container">
        <PulseLoader className="loading" loading={loading} size={35} />
      </div>
    );
  } else {
    return (
        <>
        
        <div className="master-home-container">
        <div className="home-header-container" data-aos="fade-up">
        <ParticleBackground />
          <div className="header-container">
          <h1 className="home-header">
              Welcome to Chatter
            </h1>
          </div>
            <ParticleBackground />
            <ParticleBackground />
          </div>
          <span className="home-page-welcome-back" data-aos="fade-up">
            {home.id ? <p>Nice to see you back {home.username} 😊</p> : null}
          </span>
          <div data-aos="fade-up" className="the-about-container" id="about-us">
            <h2 className="about-us">About us</h2>
            <div className="about-us-container">
              <div
                data-aos="zoom-in"
                data-aos-duration="800"
                className="about-box"
              >
                <p className="about-us-text">
                  We value a user friendly experience! Our website serves as a
                  gateway to new relationships among all of our users.
                </p>
                <p className="about-us-picture">
                  <i class="fas fa-hands-helping"></i>
                </p>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration="800"
                className="about-box"
              >
                <p className="about-us-text">
                  We constantly look for feeback. Feel free to shoot us an email
                  for any constructive criticism you may have
                </p>
                <p className="about-us-picture">
                  <i class="fas fa-comment-alt"></i>
                </p>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration="800"
                className="about-box"
              >
                <p className="about-us-text">
                  Chatter appreicates all of your support! We wish you the best
                  in your hobbying journey! You rock Chatter Squad!
                </p>
                <p className="about-us-picture">
                  <i class="fas fa-heart"></i>
                </p>
              </div>
            </div>
          </div>

          <ParticleBackground />

          <div
            data-aos="fade-up"
            className="main-features-container"
            id="features"
          >
            <h2 className="features">Features</h2>
            <div data-aos="fade-left" className="features-container">
              <div className="features-image">
              <p className="features-icon"><i class="fas fa-search"></i></p>
              </div>
              <div className="features-description">
                <p className="features-text">Discover users in our website!</p>
              </div>
            </div>
            <div
              data-aos="fade-right"
              className="features-container"
              id="contact"
            >
              <div className="features-description">
              <p className="features-text">Message users from your friends list!</p>
              </div>
              <div className="features-image">
                <p className="features-icon"><i class="fas fa-comment-dots"></i></p>
              </div>
            </div>
          </div>
          <ParticleBackground />
          {home.id ? <a
            href="/view"
            className="home-page-view-users"
            id="click-to-register"
            data-aos="zoom-in-down"
            data-aos-duration="500"
          >
            View All of Our Users Here !
          </a> : <a href="/register" className="home-page-view-users" id="view-users" data-aos="zoom-in-down"
            data-aos-duration="500">Click to register</a>}
          <div className="footer">
            <p className="footer-email"><i class="fas fa-envelope"></i>aphason1@gmail.com</p>
            <p className="footer-github" id="footer-github"><i class="fab fa-github"></i> aphy18</p>
            <p className="frontend-libraries">Frontend Libraries: React, React Spinner, ParticleJS, Animate on Scroll, Socket io Client, Font Awesome, Axios</p>
            <p className="backend-libraries">Backend Libraries: Express, Nodemon, Socket io</p>
          </div>
          
        </div>
        </>
    );
  }
}
