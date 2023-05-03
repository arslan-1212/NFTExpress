import React, { useEffect, useState } from "react";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";
import Form from "react-bootstrap/Form";
import { API } from "../../API/Api";
import { useSelector } from "react-redux";

const columns = [
  {
    dataField: "Number",
    text: "S.Number",
    sort: false,
  },
  {
    dataField: "UserId",
    text: "User Id",
    sort: false,
  },
  {
    dataField: "Country",
    text: "Country",
    sort: false,
  },

  {
    dataField: "Package",
    text: "Package",
    sort: false,
  },
  {
    dataField: "DateTime",
    text: "Date",
    sort: false,
  },
  {
    dataField: "Status",
    text: "Status",
    sort: false,
  },
  {
    dataField: "Position",
    text: "Position",
    sort: false,
  },
  {
    dataField: "ActivationDate",
    text: "Activation Date ",
    sort: false,
  },
  {
    dataField: "TotalBusiness",
    text: "Total Business",
    sort: false,
  },
];

const MyReferral = () => {

  const user = useSelector((state) => state.UserAuth.userId);

  const [dataArray, setdataArray] = useState([])



  const [positionfilter, setpositionfilter] = useState("0")
  const [StatusFilter, setStatusFilter] = useState("2")
  const [fromdatefilter, setfromdatefilter] = useState("")
  const [todateFilter, settodateFilter] = useState("")

  let arr = []
  const referral_API = async () => {
    try {

      let responce = await API?.post('/Direct', {
        "uid": user,
        "position": positionfilter,
        "status": StatusFilter,
        "fdate": fromdatefilter,
        "tdate": todateFilter
      })
      responce = responce?.data?.data?.recordset;
      console.log("myrefreal response", responce);
      // setreferralApi([])

      responce.forEach((item, index) => {
        arr.push({
          Number: index + 1,
          UserId: `${item?.user_id} `,
          Country: item.countryname,
          Package: `$ ${item?.packageamount}  `,
          DateTime: item?.ee,
          Status: (<>{item.top_up == 1 ? (<>Active</>) : (<>InActive</>)}</>),
          Position: item?.pos,
          ActivationDate: item.dd ? item.dd : "Null",
          TotalBusiness: `$ ${item?.packageamount}`,

        })
        setdataArray([...arr])


      })


    } catch (e) {
      console.log("Error While calling Referrer API", e);
    }
  }


  useEffect(() => {
    referral_API()
  }, [positionfilter, StatusFilter,fromdatefilter,todateFilter])

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>My Referral</h6>
        </div>
        <div className="LevelDetailsSelect">
          <div className="LevelDetailsInputs">
            <span>Select Status</span>
            <Form.Select aria-label="Default select example" onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Select Status</option>
              <option value="2">All</option>
              <option value="1">Active</option>
              <option value="0">In-Active</option>
            </Form.Select>
          </div>
          <div className="LevelDetailsInputs">
            <span>Position</span>
            <Form.Select aria-label="Default select example" onChange={(e) => setpositionfilter(e.target.value)}>
              <option>Select Position</option>
              <option value="0">All </option>
              <option value="1">Left</option>
              <option value="2">Right</option>
            </Form.Select>
          </div>
          <div className="LevelDetailsInputs">
            <span>From Date</span>
            <input type="date" onChange={(e) => setfromdatefilter(e.target.value)} />
          </div>
          <div className="LevelDetailsInputs">
            <span>To Date</span>
            <input type="date" onChange={(e) => settodateFilter(e.target.value)} />
          </div>
          <div className="">
            <button onClick={referral_API}>Search</button>
          </div>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
      </BgLayout>
    </>
  );
};

export default MyReferral;
