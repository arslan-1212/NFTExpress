import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import Layout from "../Layout";
import "./Coupon.css";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";


const columns = [
    {
      dataField: "Number",
      text: "S.Number",
      sort: false,
    },
    
    {
      dataField: "toUserid",
      text: "Reciever Id",
      sort: false,
    },
    {
        dataField: "coupon",
        text: "Coupon Number",
        sort: false,
      },
    {
      dataField: "amount",
      text: "Amount",
      sort: false,
    },
   
    {
      dataField: "DateTime",
      text: "Date & Time",
      sort: false,
    },
  ];
  

function Recieve_Coupon_History() {
    const user = useSelector((state) => state.UserAuth.userId);
  const [dataArray, setdataArray] = useState([]);

      const referral_API = async () => {
        try {
          let responce = await API.post("/UserToUserCouponFundTransferHistory", {
            uid: user,
            type: "Other",
          });
          responce = responce.data.data[0];
          console.log("responceresponce", responce);
    
          let arr = [];
          responce.forEach((item, index) => {
            arr.push({
                Number: index + 1,
                toUserid: item?.toUserid,
                amount: item?.amount,
                fromUserid: item?.fromUserid,
              //   id: item?.uid,
                coupon: item?.coupon,
                // Txn: <><a href={`https://bscscan.com/tx/${item?.traxn}`} target="_blank" className='text-white'>View Txn</a></>,
                DateTime: moment(item?.edate).format("DD/MM/YYYY h:m:s A"),
            });
          });
          console.log("responce", arr);
    
          setdataArray(arr);
        } catch (e) {
          console.log("Error While calling Referrer API", e);
        }
      };
    
      useEffect(() => {
        referral_API();
      }, []);
  return (
    <div>

<Layout>
        <BgLayout>
          
          <div className="BgLayout_Header">
            <h6>Recieve Coupon History</h6>
          </div>
          <div className="Share_tableMain">
            <ShareTable columns={columns} Data={dataArray} />
          </div>
        </BgLayout>
      </Layout>
        
    </div>
  )
}

export default Recieve_Coupon_History