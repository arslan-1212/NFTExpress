import React from "react";
import boycover from "../../assets/images/boycover.png";
import Buy from "../../assets/images/Buy.png";
import { Image } from "react-bootstrap";

const SalesItems = () => {
  return (
    <>
      <div className="SalesMainItems">
        <div className="SalesItemsText">
          <h6>Sales</h6>
          <h5>
            $103, 430
            <span>+10%</span>
          </h5>
        </div>
        <div className="SalesItemsImg">
          <Image src={boycover} alt="Image description" fluid={true} />
          <Image src={Buy} alt="Image description" fluid={true} />
        </div>
      </div>
    </>
  );
};

export default SalesItems;
