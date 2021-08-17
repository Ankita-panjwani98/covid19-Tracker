import React from "react";
import { Card, Col, Row } from "antd";
import "antd/dist/antd.css";
import CountUp from "react-countup";
import styles from "../DisplayCard/DisplayCard.module.css";

function DisplayCard(props) {
  const { classname, lastUpdateDate, lastUpdateTime, status, value } = props;
  let message = "";
  if (status === "Infected") {
    message = `Number of confirmed cases of COVID-19`;
  }
  if (status === "Recovered") {
    message = `Number of recoveries from COVID-19`;
  }
  if (status === "Deaths") {
    message = `Number of deaths caused by COVID-19`;
  }
  if (status === "Active") {
    message = `Number of Active Cases of COVID-19`;
  }
//   console.log("messgae", message);
  return (
    <div className={styles["site-card-border-less-wrapper"]}>
    <Col span={6}>
    <Card className={classname} bordered={false} id={styles.demo}>
      <div className={styles.status}>{status}</div>
      <div className={styles.value}>
        <CountUp duration={4} end={value} />
      </div>
      <div className={styles.lastupdate}>Last Updated at:</div>
      <div className={styles.date}>{lastUpdateDate}</div>
      <div className={styles.date}>{lastUpdateTime}</div>
      <div className={styles.lastupdate}>{message}</div>
    </Card>
    </Col>
    </div>
  );
}

export default DisplayCard;
