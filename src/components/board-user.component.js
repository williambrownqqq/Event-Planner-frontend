import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line, Doughnut, Bubble } from "react-chartjs-2";
import monitoringService from "../services/monitoring.service";
import EventBus from "../common/EventBus";
import "../styles/UserStyles.css"; // Import the CSS file

function BoardUser() {

  const [content, setContent] = useState(null);

  useEffect(() => {
    monitoringService.getData()
      .then(response => {
        console.log(response.data);
        setContent(response.data);
        console.log("content" + response.data);
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }, []); // Empty array means this effect runs once on mount


    // Function to map content to chart data
    const mapContentToChartData = (content) => {
      if (!content) return null;
  
      const labels = content.map(item => item.date);
      const data = content.map(item => item.value);
      const products = content.map(item => item.product);
      console.log(data);
      console.log(labels);
  
      return {
        labels,
        datasets: [
          {
            label: "Revenue",
            data,
            backgroundColor: 'rgba(75,192,192,0.4)', // Example color
            borderColor: 'rgba(75,192,192,1)', // Example color
            borderWidth: 1,
          },
        ],
      };
    };

    const chartData = mapContentToChartData(content);

return (  
  <section id="pattern" class="pattern">
      <ul class="grid">
        <li>
          <div>
            {chartData && <Bar data={chartData} />}
          </div>
        </li>
        <li>
        {/* <div>
            <Doughnut 
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200,300,400],
                    },
                  ],
                }}/>
          </div> */}
           <div>
            {chartData && <Doughnut data={chartData} />}
          </div>
        </li>
        <li>
          <div>
          {/* <div>
            <Line 
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200,300,400],
                    },
                  ],
                }}/>
          </div> */}
          <div>
            {chartData && <Line data={chartData} />}
          </div>
          </div>
        </li>

        <li>
        <div>
            <Bubble
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200,300,400],
                    },
                  ],
                }}/>
          </div>
        </li>
      </ul>
    </section>
  );
}
export default BoardUser;