import React, { useEffect, useState } from "react";
// import SalesItems from "./SalesItems";
import { Image } from "react-bootstrap";
import unitedstates from "../../assets/images/unitedstateflag.png";
import GreatBritainflag from "../../assets/images/GreatBritainflag.png";
import brasilflag from "../../assets/images/brasilflag.png";

import canada from "../../assets/images/canada.jpg";
import { API } from "../../API/Api";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
// const dataArray = [
//   {
//     countryImg: brasilflag,
//     countryName: "Brasil",
//     sales: 562,
//     value: "143,960",
//     bounce: "32.14",
//   },
//   {
//     countryImg: canada,
//     countryName: "canada",
//     sales: 782,
//     value: "12,960",
//     bounce: "4.14",
//   },
//   {
//     countryImg: GreatBritainflag,
//     countryName: "Great Britain",
//     sales: 1.4,
//     value: "190,700",
//     bounce: "23.44",
//   },
//   {
//     countryImg: brasilflag,
//     countryName: "Brasil",
//     sales: 562,
//     value: "143,960",
//     bounce: "32.14",
//   },
//   {
//     countryImg: unitedstates,
//     countryName: "United State",
//     sales: 250,
//     value: "230,900",
//     bounce: "29.9",
//   },
//   {
//     countryImg: canada,
//     countryName: "canada",
//     sales: 782,
//     value: "12,960",
//     bounce: "782",
//   },
// ];

const AllSales = () => {
  const user = useSelector((state) => state.UserAuth.userId);
  const [dataArray, setdataArray] = useState([]);

  const countryData = async () => {
    let responce = await API.get(
      `https://nftxpress-1.nakshtech.info/dasboardcountry?uid=${user}`
    );
    console.log("dasboardcountry", responce.data.data);
    setdataArray([...responce.data.data]);
  };
  useEffect(() => {
    countryData();
  }, []);
  return (
    <>
      <div className="mainflex">
        <div className="MatchingLevelMain firflex main_sels">
          <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={530}>
            {/* <div className="SalesMain"> */}
            {/* <SalesItems />
          <SalesItems /> */}
            {/* </div> */}
            {/* <div className="SalesMain"> */}
            {/* <SalesItems />
          <SalesItems /> */}
            {/* </div> */}

            <div className={dataArray.length=="0" ? "SalesMain_table tableqa" :"SalesMain_table" }>
              <h6>Sales by Country</h6>
              <table className="TableMain ">
                <tr className="TableMainTitleNew">
                  <th className="countryTit">Country</th>
                  <th className="countryTit">Sales</th>
                  <th className="countryTit">Value</th>
                  <th className="countryTit">Percentage</th>
                </tr>
                {dataArray
                  .sort((a, b) => b.totalbusiness - a.totalbusiness)
                  ?.map((value, index) => (
                    <tr className="Table_item" key={index}>
                      <td className="table_country">
                        <img
                          src={`https://gold-obvious-sparrow-517.mypinata.cloud/ipfs/QmW84WEsurTru38ccZG83BwYvrCC7LZaa1U68Lru9zWLLW/${value.countryvalue}.png`}
                          art="image details"
                          className="country_Img"
                          fluid={true}
                        />

                        <td className="table_tit">
                          <h6>{`${value.countryname || null}`}</h6>
                        </td>
                      </td>
                      <td className="table_sales">
                        <h6>{value?.totaluser}</h6>
                      </td>
                      <td className="table_value">
                        {/* <h6>Value:</h6> */}
                        <h6>${value?.totalbusiness}</h6>
                      </td>
                      <td className="table_bounce">
                        {/* <h6>Percentage:</h6> */}
                        <h6>{value?.totalper}%</h6>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default AllSales;
