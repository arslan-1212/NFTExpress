import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";

const AllIncomeChat = () => {

  const [chartText, setChartText] = useState();
  const userDetail = useSelector((state) => state.nft.userDetail);
  console.log("userDetail",userDetail);
  const data = [
    ["Task", "Hours per Day"],
    ["Staking Reward", userDetail.roiincomeNFT ],
    ["Matching Income", userDetail.levelincome],
    ["Team Bonus", userDetail.binary],
    ["Quick Starter Bonus", userDetail.TeamBonus],
    ["Referral Income ", userDetail.directIncome == 0 ? "1":userDetail.directIncome],
    ["Airdrop Reward ", userDetail.roiincome],
    ["Rank Reward ", userDetail.rewardIncome],
    ["Withdrawal Bonous", userDetail.cto_income]
  ];
  const options = {
    chartArea: {
      width: "100%",
      // height: "70%",
    },
    fontName: "'sans-serif'",
    pieSliceText: "label",
    fontSize: chartText,
    backgroundColor: "transparent",
    legend: "none",
    pieSliceBorderColor: "transparent",
    pieStartAngle: 100,
    // bold: true,
    colors: [
      "#A03B7C",
      "#9A38A3",
      "#D3452F",
      "#2BECA7",
      "#ECB62B",
      "#4C7F98",
      "#4638A3",
      "#2BECA7",

    ],

  };

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--text-size');
    setChartText(color)
  }, [])
  return (
    <>
      <div className="AllIncomeChatMain">
        <h6>All Income</h6>
        <div className="AllIncomeChat">
          <Chart className="chart-pie newStyle"
            chartType="PieChart"
            // style={{fontSize:"16px"}}
            data={data}
            options={options}
            width={"100%"}
            height={"530px"}
          />
        </div>
      </div>
    </>
  );
};

export default AllIncomeChat;
