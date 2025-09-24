export function isValidExpirationDate(expirationDate) {
  // Gestion des formats MM/YY et MMYY
  let formattedDate = expirationDate;

  // Add the /
  if (/^\d{4}$/.test(expirationDate)) {
    formattedDate =
      expirationDate.substring(0, 2) + "/" + expirationDate.substring(2, 4);
  }

  // Check format MM/YY
  if (!/^\d{2}\/\d{2}$/.test(formattedDate)) {
    return false;
  }

  const [month, year] = formattedDate.split("/").map(Number);

  // Check Month
  if (month < 1 || month > 12) {
    return false;
  }

  // Convert year
  const fullYear = 2000 + year;

  // Day is 0 to say that it is the last day of the preceding month
  const expDate = new Date(fullYear, month, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return expDate >= today;
}
