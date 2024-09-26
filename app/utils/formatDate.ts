export function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  // Format the date
  const formattedDate = date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}

export function getAge(birthdate: Date) {
  if (!birthdate) return "";

  const petDate = new Date(birthdate);
  const currentDate = new Date();

  const petAgeTimestamp = currentDate.valueOf() - petDate.valueOf();
  const years = Math.floor(petAgeTimestamp / (1000 * 3600 * 24 * 30 * 12));
  const months = Math.floor(
    (petAgeTimestamp - years * (1000 * 3600 * 24 * 30 * 12)) /
      (1000 * 3600 * 24 * 30),
  );
  const yearsString =
    years === 0
      ? ""
      : `${years} ${years === 1 ? "year" : "years"}${months === 0 ? "" : ", "}`;

  const monthsString =
    months === 0 ? "" : `${months} ${months === 1 ? "month" : "months"}`;

  if (`${yearsString}${monthsString}` === "") return "Less than a month";
  return `${yearsString}${monthsString}`;
}

export function getTimeAgo(time: Date) {
  const currentTimestamp = new Date().getTime();
  const timeAgo = currentTimestamp - new Date(time).getTime();

  const daysAgo = Math.floor(timeAgo / (1000 * 3600 * 24));
  const monthsAgo = Math.floor(timeAgo / (1000 * 3600 * 24 * 30));
  const yearsAgo = Math.floor(timeAgo / (1000 * 3600 * 24 * 30 * 12));

  if (daysAgo === 0) return "today";
  if (daysAgo < 31) return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  if (monthsAgo < 12)
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
}
