const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Conected Succesfully");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();
