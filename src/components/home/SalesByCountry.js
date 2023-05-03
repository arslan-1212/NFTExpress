// replacment div 

import React from "react";
import { Col, Row } from "react-bootstrap";
import UserDetails from "../TeamDetails/UserDetails";
import LatestNews from "../allIncome/LatestNews";

const UserDetailsAllIncome = () => {
  return (
    <>
      {/* net rank section below  */}
      <div className="HomeMian pb-3 mb-3  ">
        <Row>
          <Col xs={12} sm={12} md={6} className="colMb" >
            <UserDetails />
          </Col>
          <Col xs={12} sm={12} md={6} className="colMb" >
            <LatestNews />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserDetailsAllIncome;




