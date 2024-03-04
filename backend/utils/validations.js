/*
 * @params {string} value, {number} minLength
 * @returns {boolean}
 * @description Checks if value is valid text otherwise returns false
 */
function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

/*
 * @params {string} value
 * @returns {boolean}
 * @description Checks if value is valid date format otherwise returns false
 */
function isValidDate(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

/*
 * @params {string} value
 * @returns {boolean}
 * @description Checks if value starts with {http} is true otherwise returns false
 */
function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

/*
 * @params {string} value
 * @returns {boolean}
 * @description Checks if value includes {@} is true otherwise returns false
 */
function isValidEmail(value) {
  return value && value.includes("@");
}

module.exports = { isValidDate, isValidEmail, isValidImageUrl, isValidText };
