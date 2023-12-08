import { CURRENT_TIME } from "./timestamp";

export const getId = (pathname, setId) => {
  if (pathname === "/chart/oxygen") {
    setId({
      value01: "oxygen_per (%)",
      value02: "oxygen_mpl (mg/L)",
      value03: "oxygen_ppm (ppm)",
    });
  } else if (pathname === "/chart/ph") {
    setId({
      value01: "ph (pH)",
      value02: "redox (mg/L)",
      value03: "ph_meter (ppm)",
    });
  } else if (pathname === "/chart/conductivity") {
    setId({
      value01: "conductivity (µS/cm)",
      value02: "salinity (g/Kg)",
      value03: "tds (ppm)",
    });
  }
};

export const getData = (data, pathname, setDataArray) => {
  data.timestamp = CURRENT_TIME();
  if (pathname === "/chart/oxygen") {
    setDataArray((prevState) => [
      ...prevState,
      {
        id: data.device_id,
        temperature: { x: data.timestamp, y: data.temperature.value },
        value01: { x: data.timestamp, y: data.oxygen_per.value },
        value02: { x: data.timestamp, y: data.oxygen_mpl.value },
        value03: { x: data.timestamp, y: data.oxygen_ppm.value },
      },
    ]);
  } else if (pathname === "/chart/ph") {
    setDataArray((prevState) => [
      ...prevState,
      {
        id: data.device_id,
        temperature: { x: data.timestamp, y: data.temperature.value },
        value01: { x: data.timestamp, y: data.ph.value },
        value02: { x: data.timestamp, y: data.redox.value },
        value03: { x: data.timestamp, y: data.ph_meter.value },
      },
    ]);
  } else if (pathname === "/chart/conductivity") {
    setDataArray((prevState) => [
      ...prevState,
      {
        id: data.device_id,
        temperature: { x: data.timestamp, y: data.temperature.value },
        value01: { x: data.timestamp, y: data.conductivity.value },
        value02: { x: data.timestamp, y: data.salinity.value },
        value03: { x: data.timestamp, y: data.tds.value },
      },
    ]);
  }
};
