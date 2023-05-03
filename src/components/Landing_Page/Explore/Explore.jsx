import React from 'react'
import './product.css'
import productimg from './images/product.webp'
import FProduct from './ProductFeatures/FProduct'

function Explore() {
  return (
    <div>
      <section className="product">
        <div className="product-heading">
          <h2>
            OUR <span>BUSINESS MODEL</span>
          </h2>
          <p>
            LaRace is set to take the Play2Earn industry to new heights with their customisable range of NFT horses.
            With the launch imminent excitement has been building within the community. The NFT horses are not just a
            piece of digital art, they can also engage within the LaRace platform where there are numerous methods of
            earning financial gains from. Listed below are the main categories with earning potential.
          </p>
        </div>
        <div className="product-image" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="1000">
          <img className="img-hiw" src={productimg} alt="nftxpress business model" />
        </div>
      </section>
      <FProduct />
    </div>
  )
}

export default Explore
