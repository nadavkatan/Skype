import React, {useState, useEffect} from 'react';

const CallTimer = ({time,setTime}) => {
    const [running, setRunning] = useState(true);

    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1000);
        }, 1000);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    return (
      <div className="stopwatch">
        <div className="numbers">
          <span>{new Date(time).toISOString().slice(11, 19)}</span>
        </div>
      </div>
    );
}

export default CallTimer