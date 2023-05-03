import React from "react";
import { Image } from "react-bootstrap";
import Homeicon from "../../assets/images/Homeicon.png";
// import ArrowUpCircle from "../../assets/images/ArrowUpCircle.png";
// import ArrowdownCircle from "../../assets/images/Arrowdown-Circle.png";
import activehorse from "../../assets/images/activehorse.png";
import inactivehorse from "../../assets/images/inactivehorse.png";
import blackhorse from "../../assets/images/whitehorse.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateMobileMenu } from "../../redux/Slices/MobileSlice";

const MintingHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GoToMAin = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(UpdateMobileMenu(false));
  };
  return (
    <>
      <div className="MintingHeader">
        <div className="MintingHeader_left">
          <Image
            src={Homeicon}
            alt="Image description"
            fluid={true}
            className="mint_homeicn"
            onClick={GoToMAin}
          />
          <input type="text" />
          <button className="mintsibmit">Submit</button>
          <button className="mintsibmit" onClick={GoToMAin}>
            Home
          </button>
          <button className="mintsibmit">Back</button>

          {/* <Image
            src={ArrowUpCircle}
            alt="Image description"
            fluid={true}
            className="mintArrows"
          />
          <Image
            src={ArrowdownCircle}
            alt="Image description"
            fluid={true}
            className="mintArrows"
          /> */}
        </div>
        <div className="MintingHeader_right">
          <div className="Minting_statue_item">
            <Image
              src={activehorse}
              alt="Image description"
              fluid={true}
              className="mintArrows"
            />
            Active
          </div>
          <div className="Minting_statue_item">
            <Image
              src={inactivehorse}
              alt="Image description"
              fluid={true}
              className="mintArrows"
            />
            In-Active
          </div>
          <div className="Minting_statue_item">
            <Image
              src={blackhorse}
              alt="Image description"
              fluid={true}
              className="mintArrows"
            />
            Not Registered
          </div>
        </div>
      </div>
    </>
  );
};

export default MintingHeader;
