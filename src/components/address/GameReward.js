import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import BgLayout from "../sharecomponent/BgLayout";
import copytext from "../../assets/images/copytext.png";
import toast from "react-hot-toast";

const GameReward = () => {
  const CopyAddressRef = useRef(null);
  const CopyAddressHandler = () => {
    const text = '0x3a49e91e69e18d886f33155c4de23dd3819626e9';
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Game Reward </h6>
        </div>
        <div className="CopyAddressMain">
          <span>In Game Reward Token Address:</span>
          <span className="addressText" ref={CopyAddressRef}>
            0x3a49e91e69e18d886f33155c4de23dd3819626e9
          </span>
          <Image
            src={copytext}
            alt="Image description"
            fluid={true}
            onClick={CopyAddressHandler}
          />
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>
    </>
  );
};

export default GameReward;
