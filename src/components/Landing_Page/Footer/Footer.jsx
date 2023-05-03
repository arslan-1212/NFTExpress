import React from 'react'
import './footer copy.css'
import linkicon from './images/footer-link-icon.png'
import marilicon from './images/mail.png'
import logo from './images/logo.png'
import fb from './images/fb.png'
import tel from './images/tel.png'
import dcd from './images/dcd.png'
import tw from './images/tw.png'

function Footer() {
  return (
    <>
       <footer>
        <div className="footer-container">
            <div className="footer-container-flex">
                <div className="footer-heading">
                    <img className="footer-image" alt='nftxpress logo' src={logo}/>
                    <div className='footer-social'>
                        <ul>
                            <li><img src={fb} alt="facebook-image" /> </li>
                            <li><img src={tel} alt="twitter-image"  /> </li>
                            <li><img src={dcd} alt="discord-image"  /> </li>
                            <li><img src={tw} alt="telegram-image"  /> </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-content">
                    {/* <div className="footer-box">
                        <strong>QUICK LINKS</strong>
                        <ul>
                            <li><img src={linkicon} alt="link-image" /><a href="#">White Paper</a></li>
                            <li><img src={linkicon} alt="link-image"/><a href="#">User Support</a></li>
                            <li><img src={linkicon} alt="link-image" /><a href="#">Report A Bug</a></li>
                            <li><img src={linkicon} alt="link-image" /><a href="#">Explore</a></li>
                        </ul>
                    </div> */}
                    <div className="footer-box">
                        <strong>CONTACT US</strong>
                        <ul>
                            <li><img src={marilicon} alt="mail-image" /><a href="#">info@nftxpress.club</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="subcribe-container">
                <h3>SUBSCRIBE</h3>
                <div className="subcribe-input">
                    <input placeholder="Example@gmail.com" type="email" />
                    <a className="subcribe-btn" href="#">Send</a>
                </div>
            </section>

            <div className="footer-bottom">
                <div className="copyright">
                    <span className='copyright-p'>Copyright &#169; NFT Xpress all rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>
  
    </>
  )
}

export default Footer