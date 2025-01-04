import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PerformanceChart = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const chartRef = useRef(null);

  const onRenderCallback = (id, phase, actualDuration) => {

    setDataPoints((prev) => [
      ...prev,
      {
        id,
        phase,
        time: actualDuration,
      },
    ]);
  };

  return (
    <div>

      <h1>React Profiler Performance Tracker</h1>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Line
          ref={chartRef}
          data={{
            labels: dataPoints.map((_, index) => index + 1), // شماره رندر
            datasets: [
              {
                label: "زمان رندر (ms)",
                data: dataPoints.map((point) => point.time),
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          }}
        />
      </div>


      <React.Profiler id="TrackedComponent" onRender={onRenderCallback}>
        <TrackedComponent />
      </React.Profiler>
    </div>
  );
};

const TrackedComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

export default PerformanceChart;
