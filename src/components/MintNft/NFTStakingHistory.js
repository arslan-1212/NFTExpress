import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../API/Api";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";

const NFTStakingHistory = () => {
  // eslint-disable-next-line no-sparse-arrays
  const columns = [
    {
      dataField: "Number",
      text: "S.Number",
      sort: false,
    },
    {
      dataField: "PackageAmount",
      text: "Package Amount",
      sort: false,
    },
    {
      dataField: "TokenID",
      text: "Token ID",
      sort: false,
    },
    ,
    {
      dataField: "Txn",
      text: "Txn",
      sort: false,
    },
    {
      dataField: "DateTime",
      text: "Date",
      sort: false,
    },
  ];
  const user = useSelector((state) => state.UserAuth.userId);

  const [dataArray, setdataArray] = useState([])


  const referral_API = async () => {
    try {



      let responce = await API?.get(`nft_Staking_history?id=${user}`)
      responce = responce.data.data;
      console.log("responce", responce);

      let arr = []
      responce.forEach((item, index) => {

        arr.push({
          Number: index + 1,
          PackageAmount: item?.usdvalue,
          TokenID: item?.tokenid,
          Txn: <><a href={`https://bscscan.com/tx/${item?.txn}`} target="_blank" className='text-white'>View Txn</a></>,
          DateTime: moment(item?.edate).format("DD/MM/YYYY h:m:s A")
        });



      }
      )
      console.log("responce", arr);


      setdataArray(arr)





    } catch (e) {
      console.log("Error While calling Referrer API", e);
    }
  }


  useEffect(() => {
    referral_API()
  }, [])
  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>NFT Staking History</h6>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
      <div className="bg_usser_main"></div>
    </>
  );
};

export default NFTStakingHistory;
