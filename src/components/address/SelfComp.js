import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import BgLayout from "../sharecomponent/BgLayout";
import copytext from "../../assets/images/copytext.png";
import toast from "react-hot-toast";
import { API } from "../../API/Api";
import { useSelector } from "react-redux";

const SelfComp = () => {
  const CopyAddressRef = useRef(null);
  const userDetail = useSelector((state) => state.nft.userDetail);

  const CopyAddressHandler = () => {
    const text = `https://bscscan.com/address/${userDetail.address}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Self Address</h6>
        </div>
        <div className="CopyAddressMain">
          <span>Self Address:</span>
          <span className="addressText" ref={CopyAddressRef}>
            {userDetail.address}
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

export default SelfComp;
