import React from "react";
import Countdown from "react-countdown";
import RunningClock from "./RunningClock";

const TimeWidget = ({ timetoearn, timeToQualify }) => {

  console.log('timetoearn', timetoearn)
  console.log('timetoqualify', typeof time)
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div style={{ color: "#fff" }}>

        <div className="d-flex"> 
          <span>
            0 <p className="itec">Day</p>
          </span>
          :
          <span>
            0 <p className="itec xs">Hour</p>{" "}
          </span>
          :
          <span>
            0 <p className="itec">Min</p>
          </span>
          :
          <span>
            0 <p className="itec ">Sec</p>{" "}
          </span>
        </div>
      </div>;
    } else {
      // Render a countdown
      return (
        <div>
          <span>
            {days} <p className="itec">Day</p>
          </span>
          :
          <span>
            {hours} <p className="itec xs">Hour</p>{" "}
          </span>
          :
          <span>
            {minutes} <p className="itec">Min</p>
          </span>
          :
          <span>
            {seconds} <p className="itec ">Sec</p>{" "}
          </span>
        </div>
      );
    }
  };



  // const date = new Date();
  // date.setHours(date.getHours() + 22);
  // date.setDate(date.getDate() + 10);

  return (
    <>
      <div className="TimeWidgetMain">
        <h6>Quick Starter Bonus</h6>
        <div className="TimeWidgetFlex">
          <div className="TimeWidgetLeft">
            <h6>Time to Qualify</h6>
            <RunningClock />
            {timetoearn && <div className="showTimer">
              <Countdown date={
                Date.now() +
                (parseInt(timetoearn) - Date.now())
              } renderer={renderer} />
            </div>}
          </div>
          <div className="TimeWidgetRight">
            <h6>Time to Earn</h6>
            <RunningClock />
            {timeToQualify && <div className="showTimer">
              <Countdown date={
                Date.now() +
                (parseInt(timeToQualify) - Date.now())
              } renderer={renderer} />
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeWidget;
