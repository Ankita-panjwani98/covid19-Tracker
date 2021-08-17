import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { getDailyCovidData } from "../../services/axios";
import styles from "../Chart/Chart.module.css";

function Chart(props) {
  const { selectedCountry ,singleCountryDetail } = props;
  console.log("SIngle country DETAIL IN CHART", singleCountryDetail);

  const {confirmed, recovered, deaths} = singleCountryDetail;

  const [dailyCovidData, setDailyCovidData] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const responseCovidData = await getDailyCovidData();
        console.log("Covid DAILY Data", responseCovidData);
        setDailyCovidData(responseCovidData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      {selectedCountry === "" ? (
        <div className={styles.lineChart}>
          <Line
            data={{
              labels: dailyCovidData.map(({ date }) => date),
              datasets: [
                {
                  data: dailyCovidData.map(({ confirmed }) => confirmed),
                  label: "Infected",
                  borderColor: "#3333ff",
                  fill: true,
                },
                {
                  data: dailyCovidData.map(({ deaths }) => deaths),
                  label: "Deaths",
                  borderColor: "red",
                  backgroundColor: "rgba(255,0,0,0.5)",
                  fill: true,
                },
              ],
            }}
          />
        </div>
      ) : (
        
        <div className={styles.barChart}>
        <Bar
          data={{
            labels: ["Infected", "Recovered", "Deaths", "Active"],
            datasets: [
              {
                label: "People",
                backgroundColor: [
                  "rgba(0, 0, 255, 0.5)",
                  "rgba(0, 255, 0, 0.5)",
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(242, 234, 0, 0.5)",
                ],
                hoverBackgroundColor: [
                  "rgba(0, 77, 153)",
                  "rgba(30, 102, 49)",
                  "rgba(255, 51, 51)",
                  "rgba(204, 153, 0)",
                ],
                data: [
                  confirmed?.value,
                  recovered?.value,
                  deaths?.value,
                  confirmed?.value -
                    (recovered?.value + deaths?.value),
                ],
              },
            ],
          }}
         
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: `Current state in ${selectedCountry}`,
            },
          }}
        />
        </div>
      )}
    </div>
  );
}

export default Chart;
