/*
 * @class NotFoundError
 * @classdesc Represents an error when a resource is not found
 */
class NotFoundError {
  constructor(message) {
    this.message = message;
    this.status = 404;
  }
}

/*
 * @class NotAuthError
 * @classdesc Represents an error when a authentication is not valid
 */
class NotAuthError {
  constructor(message) {
    this.message = message;
    this.status = 401;
  }
}

module.exports = { NotFoundError, NotAuthError };
