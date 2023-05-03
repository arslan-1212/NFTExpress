import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import BgLayout from "../sharecomponent/BgLayout";
import copytext from "../../assets/images/copytext.png";
import toast from "react-hot-toast";

const NftTokenComp = () => {
  const GLEBANFTRef = useRef(null);
  const WASSERNFTRef = useRef(null);
  const ZRAKNFTRef = useRef(null);
  const BRANNBILNFTRef = useRef(null);
  const FOUDRENFTRef = useRef(null);
  const GLEBANFTRefHandler = () => {
    const text = '0x808a12C6ac73eC9AE53C9128C4b7196717E66E10'
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };
  const WASSERNFTRefHandler = () => {
    const text = '0x25F20Dd10d40Dc7f209455eA98f3de559Fe3b067';
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };
  const ZRAKNFTRefHandler = () => {
    const text = '0x413b1891D69E1291aFA56f13ce2B2f44381BA227'
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };
  const BRANNBILNFTRefHandler = () => {
    const text = '0x0e7a4fe65caA8E98aeFD2022eE5480338Edb7877'
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };
  const FOUDRENFTRefHandler = () => {
    const text = '0x4bda9aACF53A2dADddFDD8e2eF88f0CDd566480B'
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>NFT Address</h6>
        </div>
        <div className="CopyAddressMain">
          <span>GLEBA NFT:</span>
          <span className="addressText" ref={GLEBANFTRef}>
            0x808a12C6ac73eC9AE53C9128C4b7196717E66E10
          </span>
          <Image
            src={copytext}
            alt="Image description"
            fluid={true}
            onClick={GLEBANFTRefHandler}
          />
        </div>
        <div className="CopyAddressMain">
          <span>WASSER NFT:</span>
          <span className="addressText" ref={WASSERNFTRef}>
            0x25F20Dd10d40Dc7f209455eA98f3de559Fe3b067
          </span>
          <Image
            src={copytext}
            alt="Image description"
            fluid={true}
            onClick={WASSERNFTRefHandler}
          />
        </div>
        <div className="CopyAddressMain">
          <span>ZRAK NFT:</span>
          <span className="addressText" ref={ZRAKNFTRef}>
            0x413b1891D69E1291aFA56f13ce2B2f44381BA227
          </span>
          <Image
            src={copytext}
            alt="Image description"
            fluid={true}
            onClick={ZRAKNFTRefHandler}
          />
        </div>
        <div className="CopyAddressMain">
          <span>BRANNBIL NFT:</span>
          <span className="addressText" ref={BRANNBILNFTRef}>
            0x0e7a4fe65caA8E98aeFD2022eE5480338Edb7877
          </span>
          <Image
            src={copytext}
            alt="Image description"
            fluid={true}
            onClick={BRANNBILNFTRefHandler}
          />
        </div>
        <div className="CopyAddressMain">
          <span>FOUDER NFT:</span>
          <span className="addressText" ref={FOUDRENFTRef}>
            0x4bda9aACF53A2dADddFDD8e2eF88f0CDd566480B
          </span>
          <Image
            src={copytext}
            alt="Image description"
            fluid={true}
            onClick={FOUDRENFTRefHandler}
          />
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>
    </>
  );
};

export default NftTokenComp;
