import axios from "axios";

export const getCovidData = async () => {
    // console.log("Inside Get Covid Data");
    const res = await axios.get(`https://covid19.mathdro.id/api`);
    // console.log("data", res.data);
    return res.data;
  };

export const getAffectedCountries = async () => {
  // console.log("Inside Get Covid Data");
  const res = await axios.get(`https://covid19.mathdro.id/api/countries`);
  // console.log("data", res.data);
  return res.data;
};

export const getSingleCountryDetail = async (country) => {
  let res;
  // if (country) {
   res = await axios.get(
      `https://covid19.mathdro.id/api/countries/${country}`
      );
      
  // } else {
  //   res = await axios.get(`https://covid19.mathdro.id/api`);
    
  // }

  return res.data;
};

export const getDailyCovidData = async () => {
  // console.log("Inside Get Covid Data");
  const res = await axios.get(`https://covid19.mathdro.id/api/daily`);
  // console.log("data", res.data);
  const modifiedData = res.data.map((dailyData) => ({
    confirmed: dailyData.confirmed.total,
    deaths: dailyData.deaths.total,
    date: dailyData.reportDate,
  }));
  return modifiedData;
};
