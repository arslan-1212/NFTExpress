import React from 'react'
import './fproduct.css'
import pf1 from './images/pf1.png'
import pf2 from './images/pf2.png'
import pf3 from './images/pf3.png'
import pf4 from './images/pf4.png'
import pf5 from './images/pf5.png'
import pf6 from './images/pf6.png'

function FProduct() {
  return (
<section id="productfeatures">
    <div className="product-box-container">
        <div className="product-box" data-aos="flip-down" data-aos-duration="2000">
            <div className="box-top">
                <div className="profile">
                    <div className="profile-img">
                        <img src={pf1} alt="Play2Earn" />
                    </div>
                </div>
            </div>
            <div className="product-comment">
                <h3>Play2Earn</h3>
                <p>Race to Earn</p>
            </div>
        </div>
        <div className="product-box" data-aos="flip-down" data-aos-duration="2000">
            <div className="box-top">
                <div className="profile">
                    <div className="profile-img">
                        <img src={pf2}  alt="Engage2Earn" />
                    </div>
                </div>
            </div>
            <div className="product-comment">
                <h3>Engage2Earn</h3>
                <p>Player Activity</p>
            </div>
        </div>
        <div className="product-box" data-aos="flip-down" data-aos-duration="2000">
            <div className="box-top">
                <div className="profile">
                    <div className="profile-img">
                        <img src={pf3} alt="Govern2Earn" />
                    </div>
                </div>
            </div>
            <div className="product-comment">
                <h3>Govern2Earn</h3>
                <p>Host Races</p>
            </div>
        </div>
        <div className="product-box" data-aos="flip-down" data-aos-duration="2000">
            <div className="box-top">
                <div className="profile">
                    <div className="profile-img">
                        <img src={pf4} alt="Learn2Earn" />
                    </div>
                </div>
            </div>
            <div className="product-comment">
                <h3>Learn2Earn</h3>
                <p>Academy Q&A</p>
            </div>
        </div>
        <div className="product-box" data-aos="flip-down" data-aos-duration="2000">
            <div className="box-top">
                <div className="profile">
                    <div className="profile-img">
                        <img src={pf5} alt="Breed2Earn" />
                    </div>
                </div>
            </div>
            <div className="product-comment">
                <h3>Breed2Earn</h3>
                <p>Mint NFTs</p>
            </div>
        </div>
        <div className="product-box" data-aos="flip-down" data-aos-duration="2000">
            <div className="box-top">
                <div className="profile">
                    <div className="profile-img">
                        <img src={pf6} alt="Trade2Earn" />
                    </div>
                </div>
            </div>
            <div className="product-comment">
                <h3>Trade2Earn</h3>
                <p>Marketplace</p>
            </div>
        </div>
    </div>
</section>
  )
}

export default FProduct