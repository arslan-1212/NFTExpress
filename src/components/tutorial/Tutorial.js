import React from "react";
import BgLayout from "../sharecomponent/BgLayout";
import nftvideo2 from "../../assets/images/nftvideo2.mp4";
import howtomint from "../../assets/images/How to mint an NFT Horse_Video.mp4";
import MINTANNFT from "../../assets/images/MINT AN NFT HORSE WITH NFT-XPRESS_2.mp4";
import pdf_image from '../../assets/pdf_image.png'
import pdf_lar from '../../assets/images/Steps to add LAR.pdf'
const Tutorial = () => {
  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Tutorial</h6>
        </div>

        <div className="mt-3 Tutorial_style " >
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="Nft_cardMain cardmaina">
                <video controls className="CollectionCrdvid">
                  <source src={howtomint} type="video/mp4" />
                </video>

                {/* <div className="nftsPrice">
                  <span>20$</span>
                  <span>500</span>
                </div> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="Nft_cardMain cardmaina">
                <video controls className="CollectionCrdvid">
                  <source src={MINTANNFT} type="video/mp4" />
                </video>

              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="Nft_cardMain cardmaina">
              <a href={pdf_lar} target="_blank" >
                <img src={pdf_image} alt="" width="100%" className="CollectionCrdvid " />
              </a>

              </div>
            </div>
          </div>


        </div>
      </BgLayout>
    </>
  );
};

export default Tutorial;

// pdf viewer in react js
