const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection failed to MongoDB, erreur: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
