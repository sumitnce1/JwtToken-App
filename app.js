const express = require("express");
const cors = require("cors");
const userRouter = require("./userRouter");

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// routes
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
