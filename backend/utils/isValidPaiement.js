const { isValidExpirationDate } = require("./isValidExpirationDate");

function isValidPaiement(data) {
  // Check name
  const carteName = data.carteName;
  const isValidCarteName =
 carteName != null &&
  typeof carteName === "string" &&
 carteName.trim().length > 0 &&
  /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(carteName.trim());

  // Check card number
const cardNumber = data.cardNumber;
const isValidCardNumber =
  typeof cardNumber === "string" &&
  /^\d{16}$/.test(cardNumber); // exactement 16 chiffres

// Check cryptogramme
const cryptograme = data.cryptograme;
const isValidCryptograme =
  typeof cryptograme === "string" &&
  /^\d{3}$/.test(cryptograme);

    //   Check expiration Date
  const expirationDate = data.expiryDate;
  
  if (
    !isValidCarteName ||
    !isValidCardNumber ||
    !isValidCryptograme ||
    !isValidExpirationDate(expirationDate)
  ) {
    return false;
  } else {
    return true;
  }
}

module.exports = { isValidPaiement };
