/**
 * @class ApplicationError
 * @description base error class for application
 * @extends Error
 */
export class ApplicationError extends Error {
    /**
     * @description initializes the error class
     *
     * @param {number} statusCode status code of the request
     * @param {string} message error message
     * @param {string} errors an array containing errors
     */
    constructor(statusCode, message = "an error occurred", errors) {
      super(message);
      this.statusCode = statusCode || 500;
      this.message = message;
      this.errors = errors;
    }
  }
  
  /**
   * @class BadRequestError
   * @description error class for bad request
   * @extends ApplicationError
   */
  export class BadRequestError extends ApplicationError {
    /**
     * @description initialize error class
     *
     */
    constructor(message) {
      super(400, message || "Bad request.");
    }
  }
  
  /**
   * @class NotFoundError
   * @description error class for not found
   * @extends ApplicationError
   */
  export class NotFoundError extends ApplicationError {
    /**
     * @description initialize error class
     *
     */
    constructor(message) {
      super(404, message || "Route not found.");
    }
  }
  
  /**
   * @class ConflictError
   * @description error class for conflicts.
   * @extends ApplicationError
   */
  export class ConflictError extends ApplicationError {
    /**
     * @description initialize error class
     *
     */
    constructor(message) {
      super(409, message);
    }
  }
  
  /**
   * @class UnauthorizedError
   * @description error class for unauthenticated users.
   * @extends ApplicationError
   */
  export class UnauthorizedError extends ApplicationError {
    /**
     * @description initialize error class
     *
     */
    constructor(message) {
      super(401, message || "You are unauthorized.");
    }
  }
  