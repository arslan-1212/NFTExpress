import React from "react";
import { useSelector } from "react-redux";
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
    dataField: "Pool",
    text: "Pool",
    sort: false,
  },

  {
    dataField: "NetIncome",
    text: "Net Income",
    sort: false,
  },
  {
    dataField: "DateTime",
    text: "",
    sort: false,
  },
];
const dataArray = [
  {
    Number: 213213,
    UserId: 222,
    Pool: "demo",
    NetIncome: 233,
    DateTime: "12/12/2020",
  },
];

const WithdrawalShareBonus = () => {
  const user = useSelector((state) => state.UserAuth.userId);

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Withdrawal Share Bonus</h6>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
    </>
  );
};

export default WithdrawalShareBonus;
