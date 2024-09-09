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

export function getAge(birthdate: string) {
  if (!birthdate) return "";
  const petBirthdate = birthdate.split("-");
  const petDate = new Date(
    +petBirthdate[0],
    +petBirthdate[1] - 1,
    +petBirthdate[2],
  );
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
      : `${years} ${years === 1 ? "año" : "años"}${months === 0 ? "" : ", "}`;

  const monthsString =
    months === 0 ? "" : `${months} ${months === 1 ? "mes" : "meses"}`;
  return `${yearsString}${monthsString}`;
}
