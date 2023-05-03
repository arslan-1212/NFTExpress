import React from "react";
import { Layout } from "../components";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();
  const GoToHome = () => {
    navigation("/");
  };
  return (
    <>
      <Layout>
        <div className="notfoundMain">
          <h1>404</h1>
          <button onClick={GoToHome}>Home</button>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
