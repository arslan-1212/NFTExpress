import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";

const columns = [
  {
    dataField: "Number",
    text: "S.Number",
    sort: false,
  },
  {
    dataField: "UserId",
    text: "User Id",
    sort: false,
  },
  {
    dataField: "SelfInvestment",
    text: "Self Investment",
    sort: false,
  },

  {
    dataField: "TeamBusiness",
    text: "Team Business",
    sort: false,
  },
  {
    dataField: "TotalBusiness",
    text: "Total Business",
    sort: false,
  },
];

const DirectLegBusiness = () => {
  const user = useSelector((state) => state.UserAuth.userId);

  const [dataArray, setdataArray] = useState([]);
  const referral_API = async () => {
    try {
      let responce = await API?.get(`/directlegbussiness_report?id=${user}`);
      responce = responce?.data?.data;
      let arr = [];
      responce.forEach((item, index) => {
        arr.push({
          Number: index + 1,
          UserId: `${item?.uid} `,
          SelfInvestment: `${item?.investment} USD `,
          TeamBusiness: `${item?.teambusiness} `,
          TotalBusiness: item.gbv,
        });
      });

      setdataArray(arr);
    } catch (e) {
      console.log("Error While calling Referrer API", e);
    }
  };
  useEffect(() => {
    referral_API();
  }, []);

  return (
    <>
      <div className={dataArray.length > 2 ? "" : "MatchingLevelMain_income"}>
        <BgLayout>
          <div className="BgLayout_Header">
            <h6>Direct Leg Business</h6>
          </div>

          <div className="Share_tableMain">
            <ShareTable columns={columns} Data={dataArray} />
          </div>
        </BgLayout>
      </div>
      {/* <div className="bg_usser_main"></div> */}
    </>
  );
};

export default DirectLegBusiness;
