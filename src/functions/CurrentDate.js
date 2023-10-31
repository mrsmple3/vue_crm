export default function getCurrentDate(format = "date") {
  const today = new Date();
  let date = "";
  if (format.includes("date")) {
    date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear();
  }
  if (format.includes("time")) {
    date +=
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
  }

  return date;
}
