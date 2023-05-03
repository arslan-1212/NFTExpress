import React from 'react'
import './contactsocial.css'
import social1 from './images/social1.webp'
import social2 from './images/social2.webp'
import social3 from './images/social3.png'
import social4 from './images/social4.png'

function ContactSocial() {
  return (
    <section id="feature-wallet">
        <h2><span>STAY UPDATED</span> WITH US</h2>
        <ul id="feature-boxes"  className="container cs-hidden">
            <li className="item" data-aos="flip-up">
                <div className="feature-box">
                    <a href="#">
                        <img src={social1} alt="facebook" />
                    </a>
                </div>
                <span>Join Us On<br/> Facebook</span>
            </li>
            <li className="item" data-aos="flip-up">
                <div className="feature-box">
                    <a href="#">
                        <img src={social2} alt="telegram" />
                    </a>
                </div>
                <span>Join Us On<br/> Telegram</span>
            </li>
            <li className="item" data-aos="flip-up">
                <div className="feature-box">
                    <a href="#">
                        <img src={social3} alt="discord"/>
                    </a>
                </div>
                <span>Join Us On<br/> Discord</span>
            </li>
            <li className="item" data-aos="flip-up">
                <div className="feature-box">
                    <a href="#">
                        <img src={social4}alt="twitter" />
                    </a>
                </div>
                <span>Join Us On<br/> Twitter</span>
            </li>
            
        </ul>
    </section>
  )
}

export default ContactSocial