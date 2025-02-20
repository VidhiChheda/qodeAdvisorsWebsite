import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DiscreteChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/test2.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        if (!jsonData.Sheet1) {
          throw new Error("No data found in the JSON response");
        }

        const currentYear = new Date().getFullYear(); // Get the current year
        const allData = jsonData.Sheet1.map((item) => {
          const [month, day, year] = item.Date.split("/");
          return {
            ...item,
            dateObject: new Date(year, month - 1, day), // Adding a date object for sorting and filtering
          };
        }).sort((a, b) => a.dateObject - b.dateObject); // Ensure the data is sorted

        // Historical chart data
        const chartData = allData
          .filter(
            (item) =>
              item.dateObject.getMonth() === 0 &&
              item.dateObject.getDate() === 1
          )
          .map((item, index, array) => {
            const nextItem = array[index + 1];
            const momentumPercentage = nextItem
              ? (nextItem["Vol Adjusted Momentum"] /
                  item["Vol Adjusted Momentum"] -
                  1) *
                100
              : 0;
            const niftyPercentage = nextItem
              ? (nextItem["Nifty 50"] / item["Nifty 50"] - 1) * 100
              : 0;

            return {
              name: item.Date.split("/")[2], // Extract the year from the date
              momentum: momentumPercentage,
              nifty: niftyPercentage,
            };
          });

        // Current year special computation
        const currentYearData = allData.filter(
          (item) => item.dateObject.getFullYear() === currentYear
        );
        if (currentYearData.length) {
          const firstData = currentYearData[0]; // First data point of the year
          const lastData = currentYearData[currentYearData.length - 1]; // Last data point of the year
          const momentumPercentage =
            (lastData["Vol Adjusted Momentum"] /
              firstData["Vol Adjusted Momentum"] -
              1) *
            100;
          const niftyPercentage =
            (lastData["Nifty 50"] / firstData["Nifty 50"] - 1) * 100;

          chartData.push({
            name: currentYear.toString(),
            momentum: momentumPercentage,
            nifty: niftyPercentage,
          });
        }

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: "column",
      height: "50%", // Increase the chart height
      backgroundColor: "none",
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Year",
      },
      labels: {
        formatter: function () {
          return this.value; // This will display the year on the X-axis
        },
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineWidth: 0,
      plotLines: [
        {
          color: "darkgray", // Color of the X-axis line
          width: 1, // Width of the line
          value: 0, // Positioning the X-axis at Y=0
        },
      ],
      // Ensure that the axis doesn't automatically adjust to exclude 0 if there are only positive values
      minRange: 0.1,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true, // Enable data labels
          crop: false,
          overflow: "none",
          format: "{y:.2f}%", // Display values with 2 decimal places and '%' sign
        },
      },
    },
    series: [
      {
        name: "Momentum",
        data: chartData.map((item) => ({ name: item.name, y: item.momentum })),
        color: "rgba(255,133,3)",
      },
      {
        name: "Nifty 50",
        data: chartData.map((item) => ({ name: item.name, y: item.nifty })),
        color: "rgba(6,118,141)",
      },
    ],
  };

  useEffect(() => {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ",",
      },
    });
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default DiscreteChart;
