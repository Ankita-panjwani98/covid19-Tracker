import React from "react";
import { Select } from "antd";
import styles from "../CountryPicker/CountryPicker.module.css";
const { Option } = Select;

function CountryPicker(props) {
  const { countries, onSelect } = props;
//   console.log("Countries", countries);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    onSelect(value);
  };
  return (
    <div className={styles.countryPickerContainer}>
      <Select
        defaultValue="Global"
        className={styles.countryPicker}
        onChange={handleChange}
      >
        {countries.length > 0
          ? countries.map((country, key) => (
              <Option key={key} value={country.name}>
                {country.name}
              </Option>
            ))
          : "No Data Available"}
      </Select>
    </div>
  );
}

export default CountryPicker;
