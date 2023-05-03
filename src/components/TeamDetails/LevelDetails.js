import React, { useEffect, useState } from "react";
import BgLayout from "../sharecomponent/BgLayout";
import ShareTable from "../sharecomponent/ShareTable";
import Form from "react-bootstrap/Form";
import { API } from "../../API/Api";
import { useSelector } from "react-redux";
import moment from "moment";

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
    dataField: "Level",
    text: "Level",
    sort: false,
  },

  {
    dataField: "DateTime",
    text: "Date",
    sort: false,
  },
  {
    dataField: "ActivationDate",
    text: "Activation Date ",
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
    dataField: "Package",
    text: "Package",
    sort: false,
  },
];


const LevelDetails = () => {
  const user = useSelector((state) => state.UserAuth.userId);

  const [dataArray, setdataArray] = useState([])
  const [positionfilter, setpositionfilter] = useState("0")
  const [StatusFilter, setStatusFilter] = useState("2")
  const [LevelFilter, setLevelFilter] = useState("0")
  const referral_API = async () => {
    try {

      let responce = await API.post('/level_details', {
        "uid": user,
        "level": LevelFilter,
        "position": positionfilter,
        "status": StatusFilter
      })
      responce = responce?.data?.data;
      console.log("Level", responce.date1);

      let arr = []
      responce.forEach((item, index) => {
        arr.push({
          Number: item.row,
          UserId: `${item?.user_id} `,
          Level: item.Leveltype,
          Package: `$ ${item?.pp}  `,
          DateTime: item.date1 || "Null",
          Status: (<>{item.top_update == null ? (<>InActive</>) : (<>Active</>)}</>),
          ActivationDate: item.top_update || "Null",
          reg_date: item.date1 || "Null",
          Position: item.position
        })

        setdataArray([...arr])

      })



    } catch (e) {
      console.log("Error While calling Referrer API", e);
    }
  }


  useEffect(() => {
    referral_API()
  }, [])
  useEffect(() => {
    referral_API()
  }, [LevelFilter, positionfilter, StatusFilter])

  return (
    <>
      <BgLayout>
        <div className= {dataArray.length == 0 ? "responce_div":""} >


        <div className="BgLayout_Header">
          <h6>Level Details</h6>
        </div>
        <div className="LevelDetailsSelect  ">
          <div className="LevelDetailsInputs">
            <span>Select Level</span>
            <Form.Select aria-label="Default select example" onChange={(e) => setLevelFilter(e.target.value)}>
              <option>Select Level</option>
              <option value="0">All Level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
              <option value="7">Level 7</option>
              <option value="8">Level 8</option>
            </Form.Select>
          </div>
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
              <option value="0">All </option>
              <option value="1">Left</option>
              <option value="2">Right</option>
            </Form.Select>
          </div>
        </div>
        <div className="Share_tableMain">
          <ShareTable columns={columns} Data={dataArray} />
        </div>
        </div>
      </BgLayout>
    </>
  );
};

export default LevelDetails;
