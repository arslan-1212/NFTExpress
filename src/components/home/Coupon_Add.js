import React from "react";

const Coupon_Add = ({ TotalAddFund ,TotalRecieveFund,mintCouponFund  }) => {
  return (
    <>
    <div className="LADChatWidgetMain">
     <div className="LADChatText">
          <div className="">
            <h6>Coupon Fund</h6>
          </div>
          <div className="LADChatText_total">
            <span>Total Add Fund : {TotalAddFund}</span>
            
          </div>
          <div className="LADChatText_total">
            <span>Total Recieve Fund : {TotalRecieveFund}</span>
          
          </div>
          <div className="LADChatText_total">
            <span>Mint Coupon Fund : {mintCouponFund}</span>
         
          </div>
        </div>
        </div>
    </>
  );
};

export default Coupon_Add;
