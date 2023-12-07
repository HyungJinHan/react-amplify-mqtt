export const CURRENT_TIME = () => {
  const timestamp = new Date();

  const YEAR = timestamp.getFullYear();
  const MONTH = ("00" + (timestamp.getMonth() + 1).toString()).slice(-2);
  const DATE = ("00" + timestamp.getDate().toString()).slice(-2);
  const HOUR = ("00" + timestamp.getHours().toString()).slice(-2);
  const MINUTE = ("00" + timestamp.getMinutes().toString()).slice(-2);
  const SECOND = ("00" + timestamp.getSeconds().toString()).slice(-2);

  return `${YEAR}.${MONTH}.${DATE} ${HOUR}:${MINUTE}:${SECOND}`;
};
