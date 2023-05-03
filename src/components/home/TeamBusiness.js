import React from "react";
import { Image } from "react-bootstrap";
import leftSide from "../../assets/images/leftSide.png";
import rightSide from "../../assets/images/rightSide.png";
import totalChart from "../../assets/images/totalChart.png";
import EditSquare from "../../assets/images/EditSquare.png";

const TeamBusiness = ({ RightToday, Right, Left, LeftToday }) => {
  return (
    <>
      <div className="TeamSizeWidgetMain TeamBusinessMain">
        <h6>Team Business </h6>
        <div className="WidgetMainFlex">
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
              <span>Total : {Left}</span>
            </div>
            <div className="">
              <Image src={EditSquare} alt="Image description" fluid={true} />
              <span>Today : {LeftToday}</span>
            </div>
          </div>
          <div className="ItemRight">
            <div className="">
              <Image src={totalChart} alt="Image description" fluid={true} />
              <span>Total : {Right}</span>
            </div>
            <div className="">
              <Image src={EditSquare} alt="Image description" fluid={true} />
              <span>Today : {RightToday}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamBusiness;
