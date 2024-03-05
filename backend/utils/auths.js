/**
 * @module utils/auths
 * @description Utility functions for authentication
 * @requires dotenv
 * @requires bcryptjs
 * @requires jsonwebtoken
 * @requires models/users
 * @requires errors
 * @requires utils/validations
 * @requires utils
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { NotAuthError } = require("./errors");

const KEY = process.env.AUTH_SECRET;

/*
 * @param {string} email
 * @returns {string}
 * @description Creates JSON Web Token
 */
function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

/*
 * @param {string} token
 * @returns {string}
 * @description Validates JSON Web Token
 */
function validateJSONToken(token) {
  return verify(token, KEY);
}

/*
 * @param {string} password
 * @param {string} storedPassword
 * @returns {boolean}
 * @description Checks if password is valid
 */
function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

/*
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @description Checks if authentication is valid
 */
function checkAuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }

  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }

  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }

  next();
}

module.exports = { createJSONToken, validateJSONToken, isValidPassword, checkAuthMiddleware };
