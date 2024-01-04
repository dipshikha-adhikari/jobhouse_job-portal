export function convertMonthsToYearsAndMonths(totalMonths: number) {
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  const yearString = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
  const monthString =
    remainingMonths > 0
      ? `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
      : "";

  if (years > 0 && remainingMonths > 0) {
    return `${yearString} ${monthString}`;
  } else if (years > 0) {
    return yearString;
  } else if (remainingMonths > 0) {
    return monthString;
  } else {
    return "0 months";
  }
}

// Example usage:
