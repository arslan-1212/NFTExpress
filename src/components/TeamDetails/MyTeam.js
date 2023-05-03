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
    text: "Date ",
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
    dataField: "rewardrankname",
    text: " Rank ",
    sort: false,
  },
  {
    dataField: "TotalBusiness",
    text: "Total Business",
    sort: false,
  },
];

const MyTeam = () => {
  const user = useSelector((state) => state.UserAuth.userId);
  const [dataArray, setdataArray] = useState([])
  const [positionfilter, setpositionfilter] = useState("0")
  const [StatusFilter, setStatusFilter] = useState("2")
  const [fromdatefilter, setfromdatefilter] = useState("")
  const [todateFilter, settodateFilter] = useState("")


  // const [FilterRight, setFilterRight] = useState("")
  let arr = []


  const referral_API = async () => {
    try {

      let responceRight = await API?.post('/MyLeftDownline', {
        "uid": user,
        "position": positionfilter,
        "status": StatusFilter,
        "fdate": fromdatefilter,
        "tdate": todateFilter
      })
      console.log("My_Team", responceRight?.data?.data?.recordset);
      responceRight = responceRight?.data?.data?.recordset;
      // setleftreferralApi([])


      responceRight.forEach((item, index) => {
        arr.push({
          Number: index + 1,
          UserId: `${item?.uid} `,
          Position: item?.pos,
          DateTime: `${item?.edate} `,
          Status: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
          ActivationDate: item.top_update || "Null",
          TotalBusiness: `$ ${item.packageamount}`,
          Country: item.countryname,
          rewardrankname:item.rewardrankname

        })

        setdataArray([...arr])
      })

    } catch (e) {
      console.log("Error While calling Myteam API", e);
    }
  }

  useEffect(() => {
    referral_API()
  }, [positionfilter, StatusFilter])

  return (
    <>
      <BgLayout>
        <div className="BgLayout_Header">
          <h6>My Team</h6>
        </div>
        <div className="LevelDetailsSelect">
          <div className="LevelDetailsInputs">
            <span>Select Status</span>
            <Form.Select aria-label="Default select example" onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Select Status</option>
              <option value="0">All</option>
              <option value="1">Active</option>
              <option value="2">In-Active</option>
            </Form.Select>
          </div>
          <div className="LevelDetailsInputs">
            <span>Position</span>
            <Form.Select aria-label="Default select example" onChange={(e) => setpositionfilter(e.target.value)}>
              <option>Select Position</option>
              <option value="0">All</option>
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
          {/* filter input */}
          <div className="LevelDetailsInputs">
            <span>Rank</span>
            <Form.Select aria-label="Default select example">
              <option value="0">All </option>
              <option value="1">Silver</option>
              <option value="2">Jade</option>
              <option value="3">Pearl</option>
              <option value="4">Emerald</option>
              <option value="5">Sapphire</option>
              <option value="6">Blue Sapphire</option>
              <option value="7">Diamond</option>
              <option value="8">Double Diamond</option>
              <option value="9">Black Diamond</option>
              <option value="10">Royal Diamond</option>
              <option value="11">Crown Ambassodor</option>
              <option value="12">Global President</option>
            </Form.Select>
          </div>
          {/* filtr input */}
          <div className="LevelDetailsInputs">
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

export default MyTeam;
