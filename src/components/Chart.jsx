import { ResponsiveLine } from "@nivo/line";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "../App.css";
import { chartConfig } from "../config/chartConfig";
import { getData, getId } from "../utils/utils";

export default function Chart({ pubsub }) {
  const [device, setDevice] = useState({ value: "test", label: "test" });
  const [id, setId] = useState({ value01: "", value02: "", value03: "" });
  const location = useLocation();

  const [dataArray, setDataArray] = useState([
    {
      id: "",
      temperature: { x: 0, y: 0 },
      value01: { x: 0, y: 0 },
      value02: { x: 0, y: 0 },
      value03: { x: 0, y: 0 },
    },
  ]);

  useEffect(() => {
    getId(location.pathname, setId);
  }, [location.pathname]);

  useEffect(() => {
    pubsub
      .subscribe({
        topics: location.state.topics,
      })
      .subscribe({
        next: (data) => getData(data, location.pathname, setDataArray),
        complete: () => {},
        error: (error) => {
          console.log(error);
        },
      });

    return console.log("Subscribe Complete");
  }, [device.value, location.pathname, location.state.topics, pubsub]);

  return (
    <div>
      <div
        style={{
          width: "30%",
          height: "7vh",
          margin: "0 auto",
          paddingTop: "30px",
        }}
      >
        <Select
          defaultValue={device}
          onChange={setDevice}
          options={[
            { value: "test", label: "test" },
            { value: "ansim01", label: "ansim01" },
            { value: "ansim02", label: "ansim02" },
          ]}
        />
      </div>
      <div style={{ height: "90vh" }}>
        <ResponsiveLine
          {...chartConfig}
          data={[
            {
              id: "Temperature (°C)",
              data: dataArray
                .filter((item) => item.id === device.value)
                .map((item) => item.temperature),
            },
            {
              id: id.value01,
              data: dataArray
                .filter((item) => item.id === device.value)
                .map((item) => item.value01),
            },
            {
              id: id.value02,
              data: dataArray
                .filter((item) => item.id === device.value)
                .map((item) => item.value02),
            },
            {
              id: id.value03,
              data: dataArray
                .filter((item) => item.id === device.value)
                .map((item) => item.value03),
            },
          ]}
        />
      </div>
    </div>
  );
}
