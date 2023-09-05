const app = require("./app");

const connectDB = require("./data/database");

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
