import React from "react";

const TotalEarningWidget = ({ withdrawl, netbalance, totalincome }) => {
  return (
    <>
      <div className="EarningWidgetMain">
        <h6>Total Earning</h6>
        <div className="TotalEarnChatMain">
          <div className="priceChart">
            <span className="priceChart_text">${totalincome}</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
        </div>
        <div className="earningChartText">
          <div className="">
            <span>${withdrawl}</span>
            <h5 className="Withdrawal">Total Withdrawal </h5>
          </div>
          <div className="">
            <span>${netbalance}</span>
            <h5 className="NetBalance">Net Balance</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalEarningWidget;
