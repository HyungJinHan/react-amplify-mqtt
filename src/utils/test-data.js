const CURRENT_TIME = () => {
  const timestamp = new Date();

  const YEAR = timestamp.getFullYear();
  const MONTH = ("00" + (timestamp.getMonth() + 1).toString()).slice(-2);
  const DATE = ("00" + timestamp.getDate().toString()).slice(-2);
  const HOUR = ("00" + timestamp.getHours().toString()).slice(-2);
  const MINUTE = ("00" + timestamp.getMinutes().toString()).slice(-2);
  const SECOND = ("00" + timestamp.getSeconds().toString()).slice(-2);

  return `${YEAR}.${MONTH}.${DATE} ${HOUR}:${MINUTE}:${SECOND}`;
};

const oxygenData = {
  "odn/test/sensors/oxygen": {
    device_id: "test",
    serial_number: "SN-PODOC-3733",
    measure_time: (Math.random() * 10000000000000).toFixed(0),
    timestamp: CURRENT_TIME(),
    coordinates: {
      latitude: 34.444309234619141,
      longitude: 127.02432250976562,
    },
    temperature: {
      value: Math.random() * 100,
      unit: "°C",
    },
    oxygen_per: {
      value: Math.random() * 100,
      unit: "%",
    },
    oxygen_mpl: {
      value: Math.random() * 10,
      unit: "mg/L",
    },
    oxygen_ppm: {
      value: Math.random() * 10,
      unit: "ppm",
    },
  },
};

const phData = {
  "odn/test/sensors/ph": {
    device_id: "test",
    serial_number: "SN-PPHRB-9957",
    measure_time: (Math.random() * 10000000000000).toFixed(0),
    timestamp: CURRENT_TIME(),
    coordinates: {
      latitude: 34.444309234619141,
      longitude: 127.02432250976562,
    },
    temperature: {
      value: Math.random() * 100,
      unit: "°C",
    },
    ph: {
      value: Math.random() * 100,
      unit: "pH",
    },
    redox: {
      value: Math.random() * 10,
      unit: "mV",
    },
    ph_meter: {
      value: Math.random() * 10,
      unit: "mV",
    },
  },
};

const conductivityData = {
  "odn/test/sensors/conductivity": {
    device_id: "test",
    serial_number: "SN-PC4EB-9760",
    timestamp: CURRENT_TIME(),
    measure_time: (Math.random() * 10000000000000).toFixed(0),
    coordinates: {
      latitude: 34.444309234619141,
      longitude: 127.02432250976562,
    },
    temperature: {
      value: Math.random() * 100,
      unit: "°C",
    },
    conductivity: {
      value: Math.random() * 100,
      unit: "µS/cm",
    },
    salinity: {
      value: Math.random() * 10,
      unit: "g/Kg",
    },
    tds: {
      value: Math.random() * 10,
      unit: "ppm",
    },
  },
};

console.log(oxygenData, phData, conductivityData);
