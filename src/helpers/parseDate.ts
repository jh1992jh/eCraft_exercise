export const getHour = date => {
  //2018-03-03T07:30:00
  const isDoubleDigit = date.substring(11, 12) > 0;
  if (isDoubleDigit) {
    return date.substring(11, 16);
  } else {
    return date.substring(12, 16);
  }
};

export const getDay = date => {
  const dayNum = new Date(date).getDay();

  switch (dayNum) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return date;
  }
};

export const getDisplayDate = date => {
  const displayDay = getDay(date);

  const displayDate = date
    .substring(0, 10)
    .split("-")
    .reverse()
    .map(num => {
      if (num[0] === "0") {
        return num[1];
      } else {
        return num;
      }
    });

  console.log(displayDate);
  return `${displayDay.toUpperCase()}, ${displayDate[0]}.${displayDate[1]}.${
    displayDate[2]
  }`;
};
