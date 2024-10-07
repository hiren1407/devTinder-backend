const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    process.env.ATLAS_URI
  );
};

module.exports = connectDB;