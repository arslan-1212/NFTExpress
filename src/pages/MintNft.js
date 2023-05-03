import React from "react";
import { Layout, CoupleNFT, SingleNFT, CollectionNFT } from "../components";
import "../assets/css/Nft.css";

const MintNft = () => {
  return (
    <>
      <Layout>
        <SingleNFT />
        <CoupleNFT />
        <div className="mb-3">
          <CollectionNFT />
        </div>
      </Layout>
    </>
  );
};

export default MintNft;
