const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/userRoute");
const globalError = require("./middlware/globalError");
require("./config/configDB");

const app = express();

// ////.........MiddleWare.......//////
app.use(express.json());

// .......Routes............////
app.use("/api/v1/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} route do not exist`,
  });
});
////........... Erro Handlers........////
app.use(globalError);

const PORT = 5000;
app.listen(PORT, console.log(`Server is Running on ${PORT}`));
