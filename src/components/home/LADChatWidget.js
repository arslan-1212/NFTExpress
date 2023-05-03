import React from "react";
import { useSelector } from "react-redux";
import { AreaChart, Area, Tooltip } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LADChatWidget = ({ TotalAirdropToken, ReceivedAirdropToken }) => {

  return (
    <>
      <div className="LADChatWidgetMain">
        <div className="LADChatText">
          <div className="">
            <h6>LAG Token</h6>
          </div>
          <div className="LADChatText_total">
            <span>Total : {TotalAirdropToken}</span>
            {/* <span>Received :  {ReceivedAirdropToken}</span> */}
          </div>
          <div className="LADChatText_total">
            {/* <span>Total : {TotalAirdropToken}</span> */}
            <span>Received :  {ReceivedAirdropToken}</span>
          </div>
        </div>
        <AreaChart
          width={332}
          height={90}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1ED2E3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8F4DEA" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1ED2E3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8F4DEA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip cursor={false} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#1ED2E3"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#8F4DEA"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    </>
  );
};

export default LADChatWidget;
