function BadRequest(err) {
  this.status = 400;
  this.message = err || 'Bad Request';
}
BadRequest.prototype = new Error();
global.BadRequest = BadRequest;

function Unauthorized(err) {
  this.status = 401;
  this.message = err || 'Unauthorized';
}
Unauthorized.prototype = new Error();
global.Unauthorized = Unauthorized;

function Forbidden(err) {
  this.status = 403;
  this.message = err || 'Forbidden';
}
Forbidden.prototype = new Error();
global.Forbidden = Forbidden;

function NotFound(err) {
  this.status = 404;
  this.message = err || 'Not Found';
}
NotFound.prototype = new Error();
global.NotFound = NotFound;

function InternalServiceError(err) {
  this.status = 500;
  this.message = err || 'Internal Service Error';
}
InternalServiceError.prototype = new Error();
global.InternalServiceError = InternalServiceError;
