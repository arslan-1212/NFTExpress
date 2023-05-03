import React from "react";
import { Image } from "react-bootstrap";
import dashboard from "../../assets/images/dashboard.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateMobileMenu } from "../../redux/Slices/MobileSlice";

const DashboardIcon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GoToMAin = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(UpdateMobileMenu(false));
  };
  return (
    <>
      <div className="dashboardItem" onClick={GoToMAin}>
        <Image src={dashboard} alt="Image description" fluid={true} />
        <span>Dashboard</span>
      </div>
    </>
  );
};

export default DashboardIcon;
