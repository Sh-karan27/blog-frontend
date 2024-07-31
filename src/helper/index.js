export const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()]; // Get month name from the array
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
