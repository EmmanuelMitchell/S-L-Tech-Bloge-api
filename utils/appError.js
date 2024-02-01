const appError = (message, statusCode, stack) => {
  const error = new Error(message);
  error.statusCode = statusCode ? statusCode : 500;
  error.stack = stack;
  return error;
};

module.exports = appError;
