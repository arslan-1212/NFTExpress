import React from "react";
import Header from './Landing_Page/Header/Header';
import Landing from './Landing_Page/Landing/Landing';
import About from './Landing_Page/About/About';
import Explore from './Landing_Page/Explore/Explore';
import How_to_play from './Landing_Page/How_to_play/How_to_play';
import Tokenomics from './Landing_Page/Tokenomics/Tokenomics';
import Footer from './Landing_Page/Footer/Footer';
// import Newfile from "./Newfile";


function Index_main() {
  return (
    <div className="front_ip">
      <Header />
      <Landing />
      <About />
      <How_to_play />
      <Explore />
      <Tokenomics />
      <Footer />

      
    </div>
  );
}

export default Index_main;