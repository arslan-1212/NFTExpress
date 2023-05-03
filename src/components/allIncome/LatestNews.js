import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import nftuser from "../../assets/images/Banner.jpeg";

const LatestNews = () => {

  const userDetail = useSelector((state) => state.nft.userDetail);
  const user = useSelector((state) => state.UserAuth.userId);

  const [newsArray, setnewsArray] = useState({ content: "" });

  const userNewsData = async () => {
    let responce = await axios.post(`https://nftxpress-1.nakshtech.info/news`,)
    console.log('https://nftxpress-1.nakshtech.info/news', responce.data.data[0][0])
    setnewsArray({ ...newsArray, content: responce.data.data[0][0].content })
  }
  useEffect(() => {
    userNewsData()


  }, []);

  return (
    <>
      <div className="MatchingLevelMain latestnewsmain">
        {/* <div className="SalesMain"> */}
        {/* <SalesItems />
          <SalesItems /> */}
        {/* </div> */}
        {/* <div className="SalesMain"> */}
        {/* <SalesItems />
          <SalesItems /> */}
        {/* </div> */}
        <div className="SalesMain_table LatestNewsMain">
          <h6>Latest News</h6>
          <div className="LatestNewsDetails">
            <p>

              {newsArray?.content}

            </p>
          </div>
        </div>
        <div className="SalesMain_table LatestNewsImage">
          <div className="NewsImagescroll">
            <Image src={nftuser} art="image details" fluid={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNews;
