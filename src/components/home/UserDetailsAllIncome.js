

import React from "react";
import { Col, Row } from "react-bootstrap";
import AllSales from "../allIncome/AllSales";
import AllIncomeChat from "./AllIncomeChat";
const SalesByCountry = () => {
  return (
    <>
      <div className="HomeMian pb-3 mb-3  xsd">
        <Row>
          <Col xs={12} sm={12} md={6} className="colMb allincome-chart">
            <AllIncomeChat />
          </Col>
          <Col xs={12} sm={12} md={6} className="top_id">
            <AllSales />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SalesByCountry;








