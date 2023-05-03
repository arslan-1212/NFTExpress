import React, { useEffect } from "react";
import { Nav, NavItem, Image } from "react-bootstrap";
import MintNFT from "../../assets/images/MintNFT.png";
import ArrowDown from "../../assets/images/ArrowDown.png";
import TeamDetails from "../../assets/images/TeamDetails.png";
import allincome from "../../assets/images/allincome.png";
import withdrawal from "../../assets/images/withdrawal.png";
import addressicon from "../../assets/images/addressicon.png";
import customericon from "../../assets/images/customericon.png"
import { Link } from "react-router-dom";
import scrollreveal from "scrollreveal";
import MenuData from "./MenuData";
import { useDispatch } from "react-redux";
import { UpdateMobileMenu } from "../../redux/Slices/MobileSlice";


const MenuList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `.SideBarMain,.MainNabBar .nav-item ,.dashboardItem,.logoutIcon,.SideBottomMain
      `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);

  const closeMobileMenu = (e) => {
    e.preventDefault();
    dispatch(UpdateMobileMenu(false));
  };

  return (
    <>
      <Nav className="flex-column MainNabBar" style={{ lineheight: "60px" }}>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={MintNFT} alt="Image description" fluid={true} />
            Mint NFT
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>
          <div className="Sidebar_submenu">
            {MenuData?.MintNFT?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={TeamDetails} alt="Image description" fluid={true} />
            Team Details
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>

          <div className="Sidebar_submenu">
            {MenuData?.TeamDetails?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={allincome} alt="Image description" fluid={true} />
            All Income
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>

          <div className="Sidebar_submenu">
            {MenuData?.AllIncome?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={allincome} alt="Image description" fluid={true} />
           Coupon
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>

          <div className="Sidebar_submenu">
            {MenuData?.Generate_Coupon?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={withdrawal} alt="Image description" fluid={true} />
            Withdrawal
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>

          <div className="Sidebar_submenu">
            {MenuData?.Withdrawal?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={addressicon} alt="Image description" fluid={true} />
            Address
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>

          <div className="Sidebar_submenu">
            {MenuData?.Address?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={TeamDetails} alt="Image description" fluid={true} />
            User
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>
          <div className="Sidebar_submenu">
            {MenuData?.users?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
        <NavItem className="SideMain HaveSubItem">
          <div className="MainMenu">
            <Image src={customericon} alt="Image description" fluid={true} />
            Support
            <Image src={ArrowDown} alt="Image ArrowDown" fluid={true} />
          </div>
          <div className="Sidebar_submenu">
            {MenuData?.tutorial?.map((value, index) => {
              return (
                <>
                  <div key={index} onClick={closeMobileMenu}>
                    <Link to={value.url} className={value.className}>
                      {value.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </NavItem>
      </Nav>
    </>
  );
};

export default MenuList;
