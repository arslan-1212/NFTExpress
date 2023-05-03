import React from "react";

const Coupon = ({ TotalCouponBalance ,TransferCouponFund ,NetCouponBalance }) => {
  return (
    <>
    <div className="LADChatWidgetMain">
     <div className="LADChatText">
          <div className="">
            <h6>Coupon Balance</h6>
          </div>
          <div className="LADChatText_total">
            <span>Total Coupon Balance : {TotalCouponBalance}</span>
            
          </div>
          <div className="LADChatText_total">
            <span>Transfer Coupon Fund : {TransferCouponFund}</span>
          
          </div>
          <div className="LADChatText_total">
            <span>Net Coupon Balance : {NetCouponBalance}</span>
         
          </div>
        </div>
        </div>
    </>
  );
};

export default Coupon;
