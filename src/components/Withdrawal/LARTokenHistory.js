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
    dataField: "DateTime",
    text: "Date ",
    sort: false,
  },
  {
    dataField: "WithdrawalAmount",
    text: "Withdrawal Amount",
    sort: false,
  },
  // {
  //   dataField: "WithdrawalSharePool",
  //   text: "Withdrawal Share Pool",
  //   sort: false,
  // },
  {
    dataField: "WithdrawalFees",
    text: "Withdrawal Fees",
    sort: false,
  },
  {
    dataField: "NetAmount",
    text: "Net Amount",
    sort: false,
  },
  {
    dataField: "WithdrawalToken",
    text: "Withdrawal Token",
    sort: false,
  },
  {
    dataField: "TXN",
    text: "TXN",
    sort: false,
  },
];
const dataArray = [
  {
    Number: 213213,
    UserId: 222,
    DateTime: "12/12/2020",
    WithdrawalAmount: 121212,
    // WithdrawalSharePool: 1212,
    WithdrawalFees: 1212,
    NetAmount: 1212,
    WithdrawalToken: 7812,
    TXN: 233,
  },
];

const LARTokenHistory = () => {

  const [dataArray, setdataArray] = useState([])
  const user = useSelector((state) => state.UserAuth.userId);


  const referral_API = async () => {
    try {


      let responce = await API?.get(`/LarWithdrawalHistory?id=${user}`)
      responce = responce?.data?.data;

      console.log("Res", responce);
      let arr = []
      responce.forEach((item, index) => {

        arr.push({
          Number: item.row,
          UserId: item.uid,
          withdrawal_token: `${item?.tokenvalue} `,
          TXN: <><a href={`https://bscscan.com/tx/${item?.txn}`} target="_blank" className='text-white'>View Txn</a></>,
          DateTime: `${item?.rdate} `,
          WithdrawalAmount: item.Request_amount,
          WithdrawalFees: item.admincharge,
          tds: item.tds,
          NetAmount: item.amountusd,
          WithdrawalToken: `${item?.tokenvalue} `,

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
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>LAR Token History</h6>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>
    </>
  );
};

export default LARTokenHistory;
