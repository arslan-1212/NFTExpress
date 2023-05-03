import React, { useEffect, useState } from "react";
import { Layout, CollectionNFT } from "../components";

import BgLayout from "../components/sharecomponent/BgLayout";
import "../assets/css/Nft.css";
import axios from "axios";
import {
  GLABA_NFT,
  GLABA_NFT_1000,
  GLABA_NFT_2500,
  GLABA_NFT_500,
  GLABA_NFT_5000,
  GLABA_NFT_ABI,
  GLABA_NFT_ABI_1000,
  GLABA_NFT_ABI_2500,
  GLABA_NFT_ABI_500,
  GLABA_NFT_ABI_5000,
  GLABA_NFT_Income,
  GLABA_NFT_Income_ABI,
} from "../utilies/constant";

import { toast } from "react-hot-toast";
import { loadWeb3 } from "../apis/api";

const Collection = () => {
  let [imageArray, setImageArray] = useState([]);

  const allImagesNfts = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      console.log("wallet");
      toast.error("No Wallet");
    } else if (acc == "Wrong Network") {
      toast.error("Wrong Network");
    } else {
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(GLABA_NFT_ABI, GLABA_NFT);
      let nftContractOf500 = new web3.eth.Contract(
        GLABA_NFT_ABI_500,
        GLABA_NFT_500
      );

      let nftContractOf1000 = new web3.eth.Contract(
        GLABA_NFT_ABI_1000,
        GLABA_NFT_1000
      );

      let nftContractOf2500 = new web3.eth.Contract(
        GLABA_NFT_ABI_2500,
        GLABA_NFT_2500
      );

      let nftContractOf5000 = new web3.eth.Contract(
        GLABA_NFT_ABI_5000,
        GLABA_NFT_5000
      );

      let nftContractOf_income_100 = new web3.eth.Contract(
        GLABA_NFT_Income_ABI,
        GLABA_NFT_Income
      );

      let simplleArray = [];
      let walletOfOwner = await nftContractOf.methods.WalletOfOwner(acc).call();
      let walletLength = walletOfOwner.length;

      console.log("walletOfOwner", walletOfOwner);
      console.log("walletLength", walletOfOwner);
      for (let i = 0; i < walletLength; i++) {
        console.log("check", i);

        try {
          let res = await axios.get(
            `https://red-tiny-piranha-757.mypinata.cloud/ipfs/QmZ1Cqx3sXZvtxtVjBpzUjQZw3hAzEGo8zwxrroQ9dpe29/${walletOfOwner[i]}.png`
          );
          // let res = await axios.get(`https://red-tiny-piranha-757.mypinata.cloud/ipfs/Qmbf5Xgoryr9ENA1XjbmJ3so8zfHMcBPrKeattUs2KPVJc/2500${walletOfOwner[i]}.png`)

          // let res = await axios.get(`/config/${walletOfOwner[i]}.json`)
          let imageUrl = res.config.url;
          // console.log("check",res);
          let tokenid = walletOfOwner[i];
          let title;
          if (tokenid == 0) {
            title = "Male";
          } else if (tokenid % 2 == 0) {
            title = "Male";
          } else {
            title = "Female";
          }

          simplleArray = [
            ...simplleArray,
            {
              imageUrl: imageUrl,
              tokenid: tokenid,
              title: title,
              token_value: "100",
            },
          ];
          setImageArray(simplleArray);
        } catch (e) {
          console.log("Error while Fetching Api", e);
        }
      }




      
    }
  };

  useEffect(() => {
    allImagesNfts();
  }, []);
  return (
    <>
      <Layout>
        <BgLayout>
          <div className="Tutorial_style">
            <div className="BgLayout_Header">
              <h6>Collection</h6>
            </div>
            <div className="row ">
              {imageArray.map((items, index) => {
                return (
                  <>
                    <div class="col-lg-3 d-flex justify-content-center align-items-center mt-5 ">
                      <div className="card card_div_collection">
                        <h6 className="text-center pt-3">
                          Mint with {items.token_value}
                        </h6>

                        <div class="nft-thumb">
                          <img
                            src={items.imageUrl}
                            alt="Metamax NFT"
                            width="100%"
                            class="img_nft"
                          />
                        </div>
                        <div className="bootom_div ">
                          <p>Token ID : {items.tokenid}</p>
                          <p>Gender : {items.title}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </BgLayout>
      </Layout>
    </>
  );
};

export default Collection;
