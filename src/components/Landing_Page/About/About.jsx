import React from 'react';
import './about copy.css'
import aboutimg from './images/About.webp'
// import 'aos/dist/aos.css';s


function About() {
    return (
        <div>
            <section id="about">
        <div className="about-text" data-aos="zoom-in-right">
            <h1>WHAT IS <span>NFT-XPRESS?</span></h1>
            <p>At NFT-Xpress our primary aim to offer our community opportunities to generate financial gains. As a company we seek to continually innovate and adapt to global economic changes to ensure NFT purchase, trading and investing is available to all. We offer our investors and affiliate partners the most secure and transparent platform through our advanced ecosystem.</p>
        </div>
        <div className="about-img" data-aos="zoom-in">
            <img alt="what is nftxpress" src={aboutimg} />
        </div>
        
    </section>
        </div>
    )
}

export default About