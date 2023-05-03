import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import BgLayout from "../sharecomponent/BgLayout";
import copytext from "../../assets/images/copytext.png";
import toast from "react-hot-toast";

const GovernanceTokenCom = () => {
  const CopyAddressRef = useRef(null);
  const CopyAddressHandler = () => {
    const text = '0x052775cf897b3ec894f26b8d801c514123c305d1'
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Governance Token</h6>
        </div>
        <div className="CopyAddressMain">
          <span>Governance Token Address:</span>
          <span className="addressText" ref={CopyAddressRef}>
            0x052775cf897b3ec894f26b8d801c514123c305d1
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

export default GovernanceTokenCom;
