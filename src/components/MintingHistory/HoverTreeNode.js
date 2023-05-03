import React from "react";
import styled from "styled-components";
const HoverTreeNode = ({ data }) => {
  // console.log('props', props)
  const HoverNode = styled.div`
   
  `;
  return (
    <>
      <HoverNode className="HoverNodeItemMain">
        <div className="HoverNodeChiled">
          <div className="HoverNodeHeadedr">
            <h6>Sponsor :{data?.Sponsor}</h6>
          </div>
          <div className="HoverNodeItem">
            <div className="HoverNodeRight">
              <h5>
                Registration Date : <span>{data?.registration_date}</span>
              </h5>
              <h5>
                Package : <span>0</span>
              </h5>
              <h5>
                Total Left : <span>{data?.total_left}</span>
              </h5>
              <h5>
                Total Left Active : <span>{data?.total_left_active}</span>
              </h5>
              <h5>
                Total Left Business : <span>{data?.left_business}</span>
              </h5>
              <h5>
                Today Left Business : <span>{data?.today_left_business}</span>
              </h5>
              <h5>
                Left Carry Forward : <span>{data?.left_carry_forward}</span>
              </h5>
              <h5>
                Rank : <span>{data?.rank}</span>
              </h5>
              {/* <h5>
                 Rank : <span>0</span>
              </h5> */}
            </div>
            <div className="HoverNodeLeft">
              <h5>
                Activation Date : <span>{data?.Activation_date}</span>
              </h5>
              <h5>
                Package amount: <span>{data?.package_amount}</span>
              </h5>
              <h5>
                Total Right : <span>{data?.total_right}</span>
              </h5>
              <h5>
                Total Right Active: <span>{data?.total_right_active}</span>
              </h5>
              <h5>
                Total Right Business: <span>{data?.right_business}</span>
              </h5>
              <h5>
                Today Right Business: <span>{data?.today_right_business}</span>
              </h5>

              <h5>
                Right Carry Forward : <span>{data?.right_carry_forward}</span>
              </h5>
              <h5>
                Country : <span>{data?.country}</span>
              </h5>
              {/* <h5>
                Rank : <span>0</span>
              </h5> */}
            </div>
          </div>
        </div>
      </HoverNode>
    </>
  );
};

export default HoverTreeNode;
