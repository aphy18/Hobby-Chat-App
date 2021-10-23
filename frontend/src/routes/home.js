import homeStyles from '../styles/Home.css'

export default function Home() {
  return (
    <>
    <div className="master-home-container">
      <div className="header-container">
   <h1 className="home">Welcome to Chattr</h1>
   </div>
   <div className="master-about-container">
     <h2 className="about-us">About us</h2>
     <div className="about-us-container">
       <div className="about-box"></div>
       <div className="about-box"></div>
       <div className="about-box"></div>
     </div>
   </div>
   <div className="master-features-container">
    <h2 className="features">Features</h2>
    <div className="features-container">
    <div className="features-image"></div>
      <div className="features-description"></div>
    </div>
    <div className="features-container">
      <div className="features-description"></div>
      <div className="features-image"></div>
    </div>
   </div>
   <div className="master-footer-container">

   </div>
   </div>
   </>
  )
}