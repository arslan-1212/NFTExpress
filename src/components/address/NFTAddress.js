import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import qaCode from "../../assets/images/qaCode.png";
import copytext from "../../assets/images/copytext.png";
import swap from "../../assets/images/swap.png";
import share from "../../assets/images/share.png";

const NFTAddress = () => {
  const pRef = useRef(null);

  const CopyTextHandle = () => {
    const range = document.createRange();
    range.selectNode(pRef.current);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };
  return (
    <>
      <div className="LARToken_Main">
        <div className="LARToken_Header">
          <h6>NFT Address </h6>
        </div>
        <div className="NFTAddressQa">
          <h6>GLEBA NFT</h6>
          <div className="NFTQaImg">
            <Image
              src={qaCode}
              alt="Image description"
              fluid={true}
              className="QA_code"
            />
            <p>
              Lorem ipsum dolor sit abet, constituter adipescent alit, sed diam
              nonarmy nib eulimid incident ut labret dolore magna aliquot era
              volitant
            </p>
          </div>
          <div className="LARWalletAddress">
            <h5>Wallet Address</h5>
            <div className="LaAddressMain">
              <p ref={pRef}>GELARNFT348fjajakjnsghuanGHRAG5 5658gahjhf</p>
              <Image
                src={copytext}
                alt="Image description"
                fluid={true}
                onClick={CopyTextHandle}
              />
            </div>
          </div>
          <div className="lar_Network">
            <div className="">
              <h6>Network</h6>
              <p>GLEBA NFT</p>
            </div>
            <div className="">
              <Image src={swap} alt="Image description" fluid={true} />
            </div>
          </div>
          <div className="lar_Button">
            <div className="NftArt_sharebtn">
              <button>
                <Image src={share} alt="Image description" fluid={true} />
                Share this NFT
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default NFTAddress;
