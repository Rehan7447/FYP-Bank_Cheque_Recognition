const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const cashierRouter = require("./routes/cashierRouter");
const connectDB = require("./config/db");

// const notes = require("./data/notes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/cashier", cashierRouter);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "front-end/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
  });
} else {
  app.get("/", (re, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server started at port ${PORT}`));
