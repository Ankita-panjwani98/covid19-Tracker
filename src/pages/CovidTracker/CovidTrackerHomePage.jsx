import React, { useEffect, useState } from "react";
import {
  getCovidData,
  getAffectedCountries,
  getSingleCountryDetail,
} from "../../services/axios";
import { Row } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import styles from "../CovidTracker/CovidTrackerHomePage.module.css";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import CountryPicker from "../../components/CountryPicker/CountryPicker";
import Chart from "../../components/Chart/Chart";

function CovidTrackerHomePage() {
  const [covidData, setCovidData] = useState("");
  const [countries, setCountries] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [singleCountryDetail, setSingleCountryDetail] = useState("");
  useEffect(() => {
    (async function () {
      try {
        const responseCovidData = await getCovidData();
        setCovidData(responseCovidData);
      } catch (error) {
        console.log(error);
      }
    })();
    (async function () {
      try {
        const responseCountries = await getAffectedCountries();
        setCountries(responseCountries.countries);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const activeCaseValues =
    covidData?.confirmed?.value -
    covidData?.deaths?.value -
    covidData?.recovered?.value;
  const dateFormat = "ddd MMM D YYYY";
  const time = "h:mm:ss A";
  let lastUpdateDate = moment(covidData?.lastUpdate).format(dateFormat);
  let lastUpdateTime = moment(covidData?.lastUpdate).format(time);

  const handleSelectedCountry = async (value) => {
    setSelectedCountry(value);
    if (value) {
      try {
        const responseSingleCountry = await getSingleCountryDetail(value);
        setSingleCountryDetail(responseSingleCountry);
        setCovidData(responseSingleCountry);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const displayCard = () => {
    return (
      <>
        <DisplayCard
          classname={styles.statusCardInfected}
          status="Infected"
          lastUpdateDate={lastUpdateDate}
          lastUpdateTime={lastUpdateTime}
          value={covidData?.confirmed?.value}
        />

        <DisplayCard
          classname={styles.statusCardRecovered}
          status="Recovered"
          lastUpdateDate={lastUpdateDate}
          lastUpdateTime={lastUpdateTime}
          value={covidData?.recovered?.value}
        />

        <DisplayCard
          classname={styles.statusCardDeaths}
          status="Deaths"
          lastUpdateDate={lastUpdateDate}
          lastUpdateTime={lastUpdateTime}
          value={covidData?.deaths?.value}
        />

        <DisplayCard
          classname={styles.statusCardActive}
          status="Active"
          lastUpdateDate={lastUpdateDate}
          lastUpdateTime={lastUpdateTime}
          value={activeCaseValues}
        />
      </>
    );
  };
  return (
    <div>
      <div className={styles.header}>
        <img
          src={process.env.PUBLIC_URL + "/images/covid19.png"}
          className={styles.covidImage}
        />
        <div className={styles.heading1}>
          Global and Country Wise Cases of Corona Virus
        </div>
        <div className={styles.heading2}>
          (For a Particlar select a Country from below)
        </div>
      </div>

      <div className={styles.siteCardWrapper}>
        <Row justify="center">{displayCard()}</Row>
      </div>

      <CountryPicker countries={countries} onSelect={handleSelectedCountry} />
      <Chart
        singleCountryDetail={singleCountryDetail}
        selectedCountry={selectedCountry}
      />
    </div>
  );
}

export default CovidTrackerHomePage;
