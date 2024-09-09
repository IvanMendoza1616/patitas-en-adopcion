export function ageInRange(ageArray: string[], birthdate: string): boolean {
  // range in days
  const ranges = {
    baby: 180, // up to six months
    young: 720, // up to 2 years
    adult: 2520, // up to 7 years
    //senior, more than adults range
  };

  const petBirthdate = new Date(birthdate);
  const today = new Date();

  const differenceInTime = +today - +petBirthdate;
  const ageInDays = Math.round(differenceInTime / (1000 * 60 * 60 * 24));

  let result = false;

  ageArray.forEach((age) => {
    if (age === "baby" && ageInDays <= ranges.baby) result = true;

    if (age === "young" && ageInDays > ranges.baby && ageInDays <= ranges.young)
      result = true;
    if (
      age === "adult" &&
      ageInDays > ranges.young &&
      ageInDays <= ranges.adult
    )
      result = true;
    if (age === "senior" && ageInDays > ranges.adult) result = true;
  });

  return result;
}
