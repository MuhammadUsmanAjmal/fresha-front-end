import moment from "moment";
import { useHistory } from "react-router-dom";
// import "moment-duration-format";
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  // window.history.go();
  // if (userRole === "BranchAdmin") {
  //   return { name: "/app" };
  // } else if (userRole === "SalonAdmin") {
  //   return { name: "/app" };
  // } else if (userRole === "SuperAdmin") {
  //   debugger;
  //   return { name: "/app" };
  // } else {
  //   return { name: "/login" };
  // }
  if (userRole === "BranchAdmin") {
    return window.location.reload();
  } else if (userRole === "SalonAdmin") {
    return window.location.reload();
  } else if (userRole === "SuperAdmin") {
    return window.location.reload();
  } else {
    return { name: "/login" };
  }
  // if (userRole === "client") return { name: "access-control" };
  // if (userRole === "client") return { name: "/access-control" };
  // return { name: "/login" };
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});

// export const SortingArray = (a, b) => {
//   const name1 = a.categoryTitle.toUpperCase();
//   const name2 = b.categoryTitle.toUpperCase();

//   let comparison = 0;

//   if (name1 > name2) {
//     comparison = 1;
//   } else if (name1 < name2) {
//     comparison = -1;
//   }
//   return comparison;
// };

// export const SortingArray1 = (a, b) => {
//   const name1 = a.label.toUpperCase();
//   const name2 = b.label.toUpperCase();

//   let comparison = 0;

//   if (name1 > name2) {
//     comparison = 1;
//   } else if (name1 < name2) {
//     comparison = -1;
//   }
//   return comparison;
// };

// const alljobsArray = [];

// export const allJobs = (allOrders) => {
//   allOrders.forEach((order) => {
//     let date = order.orderDate;
//     let expObj = {};
//     order.orderJobs.forEach((job) => {
//       expObj = { date, ...job };
//       alljobsArray.push(expObj);
//     });

//     return alljobsArray;
//   });
// };

export const timeConvert = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours == 0
    ? rminutes + "min"
    : rminutes == 0
    ? rhours + "h"
    : rhours + "h " + rminutes + "min";
};

export const timeFormatConvert = (n) => {
  var duration = moment.duration(n, "minutes");
  var x = duration.format("hh:mm");

  return x;
};
export const endTimeCalculate = (startTime, endTime) => {
  const Initial = startTime;
  const durationInMinutes = endTime.toString();

  const TotalTime = moment(Initial, "HH:mm")
    .add(durationInMinutes, "minutes")
    .format("HH:mm");

  return TotalTime;
};

export const tConvert24hour = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};

export const DateFormat = (date) => {
  var Date = date?.split("T")[0];
  return Date;
};

export const DateObjAppoint = (date) => {
  let isoDate = date;
  let newDate = moment.utc(isoDate).format("M/D/YYYY");
  return newDate;
};

export const DateAppointView = (date) => {
  let isoDate = date;
  let newDate = moment.utc(isoDate).format("dddd,DD MMMM yyyy");
  return newDate;
};
