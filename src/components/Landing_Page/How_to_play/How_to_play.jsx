import React from 'react';
import './productslider.css'
import branbil from './images/branbil.webp'
import zrak from './images/zrak.webp'
import wasser from './images/wasser.webp'
import gleba from './images/gleba.webp'
import { Link } from 'react-router-dom'
import img5 from './images/foudre.gif'

function How_to_play() {
    return (
        <div>
          <section class="products-slider">
        <div class="product-heading-slider">
            <h1>OUR <span>PRODUCTS</span></h1>
        </div>
        <div class="slider">
            <div className='box-1'>
                <img src={gleba} alt="gleba nft" />
                <h1>GLEBA</h1>
                <Link to="/login">$100</Link>
            </div>
            <div className='box-2'>
                <img src={wasser} alt="wasser nft" />
                <h1>WASSER</h1>
                <Link to="/login">$500</Link>
            </div>
            <div className='box-3'>
                <img src={zrak} alt="zrak nft" />
                <h1>ZRAK</h1>
                <Link to="/login">$1000</Link>
            </div>
            <div className='box-4'>
                <img src={branbil} alt="brannbil nft" />
                <h1>BRANNBIL</h1>
                <Link to="/login">$2500</Link>
            </div>
            <div className='box-5'>
                <img src={img5} alt="foudre nft" />
                <h1>FOUDRE</h1>
                <Link to="/login">$5000</Link>
            </div>
        </div>
    </section>
        </div>
    )
}

export default How_to_play