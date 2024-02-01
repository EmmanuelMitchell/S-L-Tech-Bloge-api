const getTokenFormHeaders = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");

const loggIn = (req, res, next) => {
  //  Get the Token Form the header
  const token = getTokenFormHeaders(req);
  // Verify the token
  const decodedUser = verifyToken(token);
  // Save the token req. obj
  req.userAuth = decodedUser.id;

  if (!decodedUser) {
    return res.json({
      status: "Failed",
      msg: "invalidToken\\ Token has expired",
    });
  } else {
    next();
  }
};

module.exports = loggIn;
