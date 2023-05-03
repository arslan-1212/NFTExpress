import React from "react";

const WithdrawalShareWidget = () => {
  return (
    <>
      <div className="WithdrawalWidgetMain">
        <h5>Withdrawal Share Bouns</h5>
        <div className="WithdrawalChat">
          <div className="Yesterday">
            <div className="chat"></div>
            <span>Yesterday</span>
          </div>
          <div className="Today">
            <div className="chat"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalShareWidget;
