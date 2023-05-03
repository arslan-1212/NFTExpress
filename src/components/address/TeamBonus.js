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
    dataField: "MatchingBusiness",
    text: "Matching Business",
    sort: false,
  },

  {
    dataField: "NetIncome",
    text: "$ Net Income",
    sort: false,
  },
  {
    dataField: "DateTime",
    text: "Date",
    sort: false,
  },
];
const dataArray = [
  {
    Number: 213213,
    UserId: 222,
    MatchingBusiness: "demo",
    NetIncome: 233,
    DateTime: "12/12/2020",
  },
];

const TeamBonus = () => {


  const [dataArray, setdataArray] = useState([])

  const user = useSelector((state) => state.UserAuth.userId);

  const referral_API = async () => {
    try {



      let responce = await API?.post("/MatchingBonus", {
        "uid": user
      })
      responce = responce?.data?.data?.recordset;
      console.log('response', responce)
      let arr = []
      responce.forEach(item => {
        arr.push(
          {
            Number: item.RowNumber,
            UserId: String(item.user_id).substring(0, 4) + "..." + String(item.user_id).substring(item.user_id.length - 4),
            MatchingBusiness: item.paidpv,
            NetIncome: `$ ${item.netincome}`,
            DateTime: item.dd,
          },
        )
      });
      setdataArray(arr)

    } catch (e) {
      console.log("Error While calling Referrer API", e);
    }
  }


  useEffect(() => {
    referral_API()
  }, [])

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Team Bonus</h6>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>

    </>
  );
};

export default TeamBonus;
