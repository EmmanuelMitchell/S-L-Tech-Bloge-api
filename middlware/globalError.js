const globalError = (err, req, res, next) => {
  //stack
  // statusCode
  const message = err.message;
  const stack = err.stack;
  const status = err.status ? err.status : "failed";
  const statusCode = err?.statusCode ? err.statusCode : 500;
  console.log(err.message);
  res.status(statusCode).json({
    message,
    stack,
    status,
    statusCode,
  });
};

module.exports = globalError;
