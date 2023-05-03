import { useEffect, useState } from "react";

const RunningClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;
  // const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const secondAngle = (seconds / 60) * 360;

  return (
    <>
      <div className="RunningClock">
        <div className="clock">
          <div className="clock-face">
            <div
              className="hand hour-hand"
              style={{ transform: `rotate(${hourAngle}deg)` }}
            ></div>
            <div
              className="hand min-hand"
              // style={{ transform: `rotate(${minuteAngle}deg)` }}
            ></div>
            <div
              className="hand second-hand"
              style={{ transform: `rotate(${secondAngle}deg)` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RunningClock;
