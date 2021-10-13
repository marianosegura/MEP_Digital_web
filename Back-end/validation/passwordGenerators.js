/**
 * Generates a password of a given length.
 * @param int length 
 * @returns Password of the given length
 */
exports.generatePassword = (length=8) => {
  lowerCaseChars = "abcdefghijklmnopqrstuvxyz";
  upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
  numbers = "0123456789";
  specialChars = "~-+*?!@#$%^&<>[]{}";
  charSets = [lowerCaseChars, upperCaseChars, numbers, specialChars];
  
  password = "";
  for (let i = 0; i < length; i++) {
    optionIndex = Math.floor(Math.random() * charSets.length);  // random set
    charSet = charSets[optionIndex];

    charIndex = Math.floor(Math.random() * charSet.length);  // random character
    password += charSet[charIndex];  // append random character
  }

  return password;
};