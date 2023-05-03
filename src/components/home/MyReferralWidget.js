import React from "react";
import { Image } from "react-bootstrap";
import leftSide from "../../assets/images/leftSide.png";
import rightSide from "../../assets/images/rightSide.png";
import totalChart from "../../assets/images/totalChart.png";
import EditSquare from "../../assets/images/EditSquare.png";
// import widgetchat from "../../assets/images/widgetchat.png";
// import widgetpercantege from "../../assets/images/widgetpercantege.png";

const MyReferralWidget = ({ RightActiveDirect, RightDirect, LeftDirect, LeftActiveDirect }) => {
  return (
    <>
      <div className="TeamSizeWidgetMain MyReferralMain widthfix">
        <h6>My Referral </h6>
        <div className="WidgetMainFlex" >
          <div className="WidgetMainLeft">
            <span>Left</span>
            <Image src={leftSide} alt="Image description" fluid={true} />
          </div>
          <div className="WidgetMainRight">
            <Image src={rightSide} alt="Image description" fluid={true} />
            <span>Right</span>
          </div>
        </div>
        <div className="WidgetMainFlexItem">
          <div className="ItemLeft">
            <div className="">
              <Image src={totalChart} alt="Image description" fluid={true} />
              <span>Total : {LeftDirect}</span>

            </div>
            <div>
              <Image src={EditSquare} alt="Image description" fluid={true} />
              <span>Active : {LeftActiveDirect}</span>

            </div>
          </div>
          <div className="ItemRight">
            <div>
              <Image src={totalChart} alt="Image description" fluid={true} />
              <span>Total : {RightDirect}</span>

            </div>
            <div className="">
              <Image src={EditSquare} alt="Image description" fluid={true} />
              <span>Active : {RightActiveDirect}</span>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReferralWidget;
