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


    const mapContentTo1ChartData = (content) => {
      if (!content) return null;
  
      // const dates = content.map(item => item.date);
      // const uniqueDates = [...new Set(dates)];
      //  console.log(uniqueDates);

      const data = content.map(item => item.value);
      console.log(data);

      return {
        labels: ["01.2024","02.2024","03.2024","04.2024","05.2024"],
        datasets: [
          {
            label: "Electricity Generation, Gw",
            data,
            backgroundColor: 'rgba(75,192,192,0.4)', // Example color
            borderColor: 'rgba(75,192,192,1)', // Example color
            borderWidth: 1,
          },
        ],
      };
    };

     const chartData = mapContentTo1ChartData(content);

     const mapContentTo2ChartData = (content) => {
      if (!content) return null;
    
      const products = content.map(item => item.product);
    
      const counts = {};
      products.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    
      const keys = Object.keys(counts);
      const values = Object.values(counts);
      const slicekeys = keys.slice(1,7);
      const slicevalues = values.slice(1,7);
    
      // Generate a color for each unique product
      const backgroundColors = keys.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`);
      //const borderColors = keys.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`);
    
      return {
        labels: slicekeys,
        datasets: [
          {
            label: "Types of electricity generation facilities",
            data: slicevalues,
            backgroundColor: backgroundColors,
            //borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      };
    };
      const chart2Data = mapContentTo2ChartData(content);
      
    
      const mapContentTo3ChartData = (content) => {
        if (!content) return null;
        
        const data = content.map(item => item.value);
        const revdata = data.map(item => item * 1.5);
        console.log(data);

        const products = content.map(item => item.product);
        // const uniqueProducts = [...new Set(products)];
      
        const counts = {};
        products.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      
        const keys = Object.keys(counts);
        const values = Object.values(counts);
        const slicekeys = keys.slice(1,7);
        const slicevalues = values.slice(1,7);
      
        // Generate a color for each unique product
        const backgroundColors = keys.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`);
        //const borderColors = keys.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`);
      
        return {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"],
          datasets: [
            {
              label: "Electricity export power, Kw",
              data,
              backgroundColor: "#FC4100",
              //borderColor: borderColors,
              borderWidth: 1,
            },
            // {
            //   label: "Electricity export power, Kw",
            //   revdata,
            //   backgroundColor: "#064FF0",
            //   borderWidth: 1,
            // },
          ],
        };
      };
        const chart3Data = mapContentTo3ChartData(content);  

return (  
  <div className="chart-container-box" >
    
     {/* <div>
             <Bar
              data={{
                labels: ["01.2024","02.2024","03.2024","04.2024","05.2024"],
                datasets: [
                  {
                    label: "Electricity Generation, Gw",
                    data: [1,2,3,4,5], // content.map(item => item.value)
                    },
                  ],
                }}/>
     </div> */}

      <div className="chart-container">
      <h3>Electricity generation power, Gw</h3>
        {chartData && <Bar data={chartData} />}
     
      </div>

{/*   
      <div className="chart-container">
        {chart3Data && <Bubble data={chart3Data} />}
        <h3>Electricity export power, Kw</h3>
      </div> */}

      <div className="chart-container">
      <h3>Electricity export power, Kw</h3>
        {chart3Data && <Line data={chart3Data} />}
     
      </div>

      <div className="chart-container">
      <h3>Types of electricity generation facilities</h3>
        {chart2Data && <Doughnut data={chart2Data} />}
       
      </div>
  </div>
       
  );
}
export default BoardUser;