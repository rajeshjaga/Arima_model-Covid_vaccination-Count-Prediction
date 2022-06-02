const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

let mergerData = [];

const recuFunc = (dateDay, info) => {
  info.forEach((item) => {
    if (dateDay > 5) {
      dateDay = 0;
    } else {
      dateDay++;
    }
    mergerData.push({ ...item, day: weekdays[dateDay] });
  });
  return mergerData;
};

export default recuFunc;
