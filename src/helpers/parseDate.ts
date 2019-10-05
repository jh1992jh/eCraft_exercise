export const getHour = date => {
  //2018-03-03T07:30:00
  const isDoubleDigit = date.substring(11, 12) > 0;
  if (isDoubleDigit) {
    return date.substring(11, 16);
  } else {
    return date.substring(12, 16);
  }
};
