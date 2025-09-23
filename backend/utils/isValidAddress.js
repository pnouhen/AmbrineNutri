function isValidAddress(coordonate) {
  // Check firstName
  const firstName = coordonate.firstName;
  const isValidFirstName =
    firstName != null &&
    typeof firstName === "string" &&
    firstName.trim().length >= 2 &&
    firstName.trim().length <= 50 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(firstName.trim());

  // Check lastName
  const lastName = coordonate.lastName;
  const isValidLastName =
    lastName != null &&
    typeof lastName === "string" &&
    lastName.trim().length >= 2 &&
    lastName.trim().length <= 50 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(lastName.trim());

  // CheckAddress
  const address = coordonate.lastName;
  const isValidAddress =
    address != null &&
    typeof address === "string" &&
    address.trim().length >= 5 &&
    address.trim().length <= 100 &&
    /^[0-9A-Za-zÀ-ÖØ-öø-ÿ\s,.'-]+$/.test(address.trim());

  // Check postal code
  const postalCode = coordonate.postalCode;
  const isValidPostalCode =
    postalCode != null &&
    typeof postalCode === "string" &&
    /^[0-9]{5}$/.test(postalCode.trim());

  //Check city
  const city = coordonate.city;
  const isValidCity =
    city != null &&
    typeof city === "string" &&
    city.trim().length >= 2 &&
    city.trim().length <= 50 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(city.trim());

  // Check country
  const country = coordonate.country;
  const isValidCountry =
    country != null &&
    typeof country === "string" &&
    country.trim().length >= 2 &&
    country.trim().length <= 56 &&
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(country.trim());

  // Check all the elements
  if (
    !isValidFirstName ||
    !isValidLastName ||
    !isValidPostalCode ||
    !isValidAddress ||
    !isValidCity ||
    !isValidCountry
  ) {
    return false;
  } else {
    return true;
  }
}

module.exports = { isValidAddress };
