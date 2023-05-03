import React from "react";
import { Sidebar, Header } from "./";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import HorseProgress from "./home/HorseProgress";
import UserDetailsAllIncome from "./home/UserDetailsAllIncome";
import SalesByCountry from "./home/SalesByCountry";

const Layout = (props) => {
  const location = useLocation();

  return (
    <>
      <Container className="containerFluid_padding" fluid>
        <Row>
          <Col xs={12} sm={12} md={4} lg={3}>
            <Sidebar />
          </Col>
          <Col xs={12} sm={12} md={8} lg={9}>
            <Header />
            {props.children}
          </Col>
        </Row>
        {location.pathname === "/dashboard" ? (
          <>
            <HorseProgress />
            <UserDetailsAllIncome />
            <SalesByCountry />
          </>
        ) : null}
      </Container>
    </>
  );
};

export default Layout;
