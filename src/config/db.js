const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the mongo database");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
