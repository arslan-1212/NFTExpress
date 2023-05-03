import React, { useEffect, useRef, useState } from "react";
import { Image, Form } from "react-bootstrap";
import allincome from "../../assets/images/allincome.png";
import ShareTable from "../sharecomponent/ShareTable";
import BgLayout from "../sharecomponent/BgLayout";
import tableimg from "../../assets/images/tableimg.png";
import { API } from "../../API/Api";
import moment from "moment";
import { useSelector } from "react-redux";



const columns = [
  {
    dataField: "Number",
    text: "S. Number",
    sort: false,
    // formatter: (cell, row) => (
    //   <img
    //     alt={row.name}
    //     style={{ width: "20px", height: "20px" }}
    //     src={row.image}
    //   />
    // ),
  },
  {
    dataField: "UserID",
    text: "User ID",
    sort: false,
  },
  {
    dataField: "FromID",
    text: "From ID",
  },
  {
    dataField: "Level",
    text: "Level",
  },
  {
    dataField: "Amount",
    text: "On Amount",
  },
  {
    dataField: "Income",
    text: "Income",
  },
  {
    dataField: "Time",
    text: "Date ",
  },
];

const MatchingLevelIncome = () => {
  const FromDateref = useRef();
  const ToDateref = useRef();

  const user = useSelector((state) => state.UserAuth.userId);


  const [dataArray, setdataArray] = useState([])

  const [levelFilter, setLevelFilter] = useState(0);

  const referral_API = async () => {
    try {
      // const user = localStorage?.getItem("user");

      let responce = await API?.post("/MatchingLevel", {
        "uid": user,
        "level": levelFilter
      })
      responce = responce?.data?.data?.recordset;

      let arr = []
      responce.forEach((item, index) => {

        arr.push({
          Number: index + 1,
          FromID: item?.user_id,
          UserID: item?.sid,

          Level: `${item?.leveltype}`,
          Amount: ` $ ${item?.package} `,
          Income: `$ ${item?.level_income} `,
          Time: moment(item?.edate).format("DD/MM/YYYY h:m:s A")
        });

      })

      setdataArray(arr)

    } catch (e) {
      console.log("Error While calling Referrer API", e);
    }
  }

  useEffect(() => {
    referral_API()
  }, [levelFilter])

  return (
    <>
      <BgLayout>
        <div className={dataArray.length>2 ? "" : "MatchingLevelMain_income"}>

        <div className="MatchingLevelMain">
          <div className="Matching_Header">
            <div className="Matching_Tit">
              <Image src={allincome} alt="Image description" fluid={true} />
              <span>Matching Level Income</span>
            </div>
            <div className="Matching_Inputs">
              <Form.Select aria-label="Default select example" onChange={(e) => setLevelFilter(e.target.value)}>
                <option>Select Level</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <input
                type="text"
                placeholder="From Date"
                ref={FromDateref}
                onChange={(e) => console.log(e.target.value)}
                onFocus={() => (FromDateref.current.type = "date")}
                onBlur={() => (FromDateref.current.type = "text")}
              />
              <input
                type="text"
                placeholder="To Date"
                ref={ToDateref}
                onChange={(e) => console.log(e.target.value)}
                onFocus={() => (ToDateref.current.type = "date")}
                onBlur={() => (ToDateref.current.type = "text")}
              />
              <button>Search</button>
            </div>
          </div>
          <ShareTable columns={columns} Data={dataArray} />
        </div>
        </div>
      </BgLayout>
    </>
  );
};

export default MatchingLevelIncome;
