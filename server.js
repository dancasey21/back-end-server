const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const users = [];
let userId = { value: 100 };

app.use(express.json());

app.use(function (req, res, next) {
  req.users = users;
  req.userId = userId;
  next();
});

app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
