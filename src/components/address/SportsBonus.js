import React from "react";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

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
    dataField: "Amount",
    text: "Amount",
    sort: false,
  },

  {
    dataField: "OnAmount",
    text: "On Amount",
    sort: false,
  },
  {
    dataField: "Date",
    text: "Date",
    sort: false,
  },
  {
    dataField: "IncomeType",
    text: "Income Type",
    sort: false,
  },
];
const dataArray = [
  {
    Number: 213213,
    UserId: 222,
    Amount: 124,
    OnAmount: 233,
    DateTime: "12/12/2020",
    IncomeType: "demo",
  },
];

const SportsBonus = () => {
  const user = useSelector((state) => state.UserAuth.userId);

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>Sports Bonus</h6>
        </div>


        <div className="SelectIncomeType">
          <form>
            <span>Select Income Type</span>
            <Form.Select aria-label="Default select example">
              <option>All Income </option>
              <option value="1">Referral Income</option>
              <option value="2">Quick Starter Bonus</option>
              <option value="3">Team Bonus</option>
              <option value="4">Matching Level Income</option>
              <option value="5">Withdrawal Share Bonus</option>

            </Form.Select>
          </form>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
    </>
  );
};

export default SportsBonus;
