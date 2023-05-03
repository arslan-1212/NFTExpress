import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import scrollreveal from "scrollreveal";
import { useDispatch } from "react-redux";
import { SetSingleNFT } from "../../redux/Slices/NFTSlice";
import nftvideo2 from "../../assets/images/nftvideo2.mp4";

import { nfts } from "./data";

const SingleNFT = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "15px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `.NftMain .Nft_Items .NftcolMb
      `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);

  return (
    <>
      <div className="NftMain">
        <div className="Nft_header">
          <h6>Single NFT</h6>
          <h6>Mint NFT</h6>
        </div>
        <Row className="Nft_Items">
          {nfts?.map((value, index) => {
            return (
              <>
                <Col key={index} className="NftcolMb ">
                  <div
                    className="Nft_cardMain"
                    onClick={() => dispatch(SetSingleNFT(value))}
                  >
                    {value.imageUrl ? (
                      <Image

                        src={value?.imageUrl}
                        alt="Image description"
                        fluid={true}
                      />
                    ) : (
                      <video controls className="CollectionCrdvid">
                        <source src={nftvideo2} type="video/mp4" />
                      </video>
                    )}

                    {/* <h6>{value?.title}</h6> */}
                    {/* <p>{value?.dec}</p> */}
                    <div className="nftsPrice">
                      <span>{value?.title}</span>
                      <span>${value?.count} </span>
                    </div>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default SingleNFT;
