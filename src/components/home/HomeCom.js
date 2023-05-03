import React, { useEffect, useState } from "react";
import Pricewidget from "./Pricewidget";
import TeamSizeWidget from "./TeamSizeWidget";
import TeamBusiness from "./TeamBusiness";
import MyReferralWidget from "./MyReferralWidget";
import LADChatWidget from "./LADChatWidget";
import TotalEarningWidget from "./TotalEarningWidget";

// import WithdrawalShareWidget from "./WithdrawalShareWidget";

import TimeWidget from "./TimeWidget";
import AffiliateLeftWidget from "./AffiliateLeftWidget";
// import AffiliateRightWidget from "./AffiliateRightWidget";
import { Col, Row } from "react-bootstrap";
import scrollreveal from "scrollreveal";
import { API } from "../../API/Api";
import { useDispatch, useSelector } from "react-redux";
import { userDetailed } from "../../redux/Slices/NFTSlice";
import Coupon from "./Coupon";
import Coupon_Add from "./Coupon_Add";

const HomeCom = () => {
  const [userDetail, setUserDetail] = useState({})
  const [timeToQualify, settimeToQualify] = useState(0)
  const [timeToEarn, settimeToEarn] = useState(0)
  const [totalcoupon, settotalCoupon] = useState(0)
  const [netCoupon, setNetCoupon] = useState(0)
  const [transferfund, setTransferfund] = useState(0)
  const [totaladdfund, setAddFund] = useState(0)
  const [totalrecievefund, setRecieveFund] = useState(0)
  const [mintFund, setMintFund] = useState(0)

  const user = useSelector((state) => state.UserAuth.userId);

  const dispatch = useDispatch();
  const DashboardAPI = async () => {

    try {

      let res = await API.get(`/getDashboardValues?id=${user}`)
      console.log('response time', res.data.data[0].address)

      res = res.data.data[0]
      setNetCoupon(res.NetCouponBalance)
      setMintFund(res.MintCouponFund)
      settotalCoupon(res.TotalCouponBalance)
      setTransferfund(res.TransferCouponFund)
      setAddFund(res.AddFundCoupon	)
      setRecieveFund(res.ReceiveCouponFund)
      console.log("coupon_res",res);

      let time1

      if (res.Bonus30DayTimer == 'Stop 30 Day Timer' || res.Bonus30DayTimer == '') {
        time1 = new Date()
        time1 = time1.getTime()
        settimeToQualify(time1)
      }
      else {
        time1 = new Date(res.Bonus30DayTimer)
        time1 = time1.getTime()
        settimeToQualify(time1)

      }

      let timetoEarn
      if (res.Bonus7DayTimer == 'Stop 7 Day Timer' || res.Bonus7DayTimer == '') {
        timetoEarn = new Date()
        timetoEarn = timetoEarn.getTime()
        settimeToEarn(timetoEarn)

      }
      else {
        timetoEarn = new Date(res.Bonus7DayTimer)
        timetoEarn = timetoEarn.getTime()
        settimeToEarn(timetoEarn)
      }


      setUserDetail(res)
      dispatch(userDetailed(res))


    } catch (e) {
      console.log("Error While Fatch Dashboard API", e);
    }
  }
  useEffect(() => {



    DashboardAPI()



    const sr = scrollreveal({
      origin: "top",
      distance: "15px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `.HomeMian .colMb 
      `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);

  return (
    <>
      {/* home main div  */}
      <div className="HomeMian">
        <Row className="RowMb">
          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <Pricewidget nftpkg={userDetail.totalactivationamount} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <TeamSizeWidget
              LeftActive={userDetail.LeftActiveDownline}
              Left={userDetail.LeftDownline}
              Right={userDetail.RightDownline}
              RightActive={userDetail.RightActiveDownline}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <TeamBusiness
              LeftToday={userDetail.lefttodaybusiness}
              Left={userDetail.leftbusiness}
              Right={userDetail.rightbusiness}
              RightToday={userDetail.righttodaybusiness} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <MyReferralWidget
              LeftActiveDirect={userDetail.LeftActiveDirect}
              LeftDirect={userDetail.LeftDirect}
              RightDirect={userDetail.RightDirect}
              RightActiveDirect={userDetail.RightActiveDirect} />
          </Col>

          {/* referal div here  */}

          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <AffiliateLeftWidget />
          </Col>

          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <LADChatWidget ReceivedAirdropToken={userDetail.ReceivedAirdropToken} TotalAirdropToken={userDetail.TotalAirdropToken} />
          </Col>
          
        </Row>
        <br />
        <Row>
          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <Coupon
             TotalCouponBalance={totalcoupon}
             TransferCouponFund={transferfund}
             NetCouponBalance={netCoupon} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className="colMb mb-lg-0 mb-md-3">
            <Coupon_Add
             TotalAddFund={totaladdfund}
             TotalRecieveFund={totalrecievefund}
             mintCouponFund={mintFund}
              />
          </Col>
        </Row>
      </div>

      {/* home page second div flex section  */}
      <div className="HomeMian pb-3 mb-3 flexz">
        <Row className="RowMb">
          <Col xs={12} sm={12} md={12} lg={6} className="colMb mb-lg-0 mb-md-3">
            <TotalEarningWidget withdrawl={userDetail.withdrawal} netbalance={userDetail.netbal} totalincome={userDetail.totalincome} />
          </Col>
          {/* <Col xs={12} sm={12} md={6} className="colMb">
            <AffiliateLeftWidget />
          </Col> */}
          <Col xs={12} sm={12} md={12} lg={6} className="colMb mx-auto">
            <TimeWidget timeToQualify={timeToQualify} timetoearn={timeToEarn} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomeCom;
