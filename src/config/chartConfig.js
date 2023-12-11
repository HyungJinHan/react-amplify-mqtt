export const chartConfig = {
  colors: { scheme: "category10" },
  margin: {
    top: 50,
    right: 150,
    bottom: 50,
    left: 80,
  },
  xScale: {
    type: "point",
  },
  yScale: {
    type: "linear",
    min: "auto",
    max: "auto",
    // stacked: true,
    reverse: false,
  },
  yFormat: " >-.2f",
  axisTop: null,
  axisRight: null,
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Time",
    legendOffset: 36,
    legendPosition: "middle",
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Value",
    legendOffset: -60,
    legendPosition: "middle",
  },
  pointSize: 10,
  pointColor: {
    theme: "background",
  },
  pointBorderWidth: 2,
  pointBorderColor: { from: "serieColor" },
  pointLabelYOffset: -12,
  useMesh: true,
  legends: [
    {
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: "left-to-right",
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: "circle",
      symbolBorderColor: "rgba(0, 0, 0, .5)",
      effects: [
        {
          on: "hover",
          style: {
            itemBackground: "rgba(0, 0, 0, .03)",
            itemOpacity: 1,
          },
        },
      ],
    },
  ],
};