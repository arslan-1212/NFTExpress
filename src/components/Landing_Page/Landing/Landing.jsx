import React, { useEffect } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import headerimg from './images/header.webp'
// import AOS from 'aos'
// import 'aos/dist/aos.css';

function Landing() {
    // useEffect(()=>{
    //     AOS.init({duration:2000});
    // })

  return (
    <div>
      <section id="main">
            <div className="main-text" >
                <h1>DECENTRALIZED<br/>AFFILIATE<br/> <span>PROGRAM</span></h1>
                <p><b>NFT-Xpress</b> is an affiliate marketing platform providing our community with early access to some of the most innovative NFT projects. Carefully selected NFT projects are then set within a decentralised autonomous organisation where the smart contracts ensure the system is dependable, secure, and trustless. Early access ensures our investors see the ultimate financial gain.</p>
                <div className="main-btns">
                    <Link className="active-btn-header service-btn" to="/Login_main">LOGIN</Link>
                    <Link to="/Register_main" className="about-btn">REGISTER</Link>
                </div>
            </div>
            <div className="main-img" data-aos="zoom-out">
                <img alt="nftxpress feature images" src={headerimg} />
            </div>
        </section>
      

      
     
    </div>


  );
}

export default Landing;
