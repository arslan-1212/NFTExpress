import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";
import Layout from "../Layout";

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
    dataField: "TotalPackageAmount",
    text: "Total Package Amount",
    sort: false,
  },
  {
    dataField: "AdjustmentAmount",
    text: "Adjustment Amount",
    sort: false,
  },
  {
    dataField: "RemainAmount",
    text: "Remain Amount",
    sort: false,
  }
];
const dataArray = [
  {
    Number: 213213,
    UserId: 222,
    TotalPackageAmount: 121212,
    AdjustmentAmount: 1212,
    RemainAmount: 1212
  },
];

const LeadersContractHistory = () => {

  const [dataArray, setdataArray] = useState([])
  const user = useSelector((state) => state.UserAuth.userId);


  const referral_API = async () => {
    try {
      let responce = await API?.get(`/LeadersContractHistory?id=${user}`)
      responce = responce?.data?.data;

      console.log("Res", responce);
      let arr = []
      responce.forEach((item, index) => {

        arr.push({
          Number: item.row,
          UserId: item.uid,
          AdjustmentAmount: item.adjustment,
          TotalPackageAmount: item.totalpackageamount,
          RemainAmount: item.remain,

        });
      })

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
    <Layout>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Leaders Contract History</h6>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>
      </Layout>
    </>
  );
};

export default LeadersContractHistory;
