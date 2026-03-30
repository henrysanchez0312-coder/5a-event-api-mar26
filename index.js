
const express = require("express");
const logger = require("morgan");

const connectToMongoDB = require("./database/connectToMongoDB");

const app = express();

app.use(logger("dev"));
app.use(express.json());

const usersRouter = require("./routes/users/users-router");
app.use("/api/v1/users", usersRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
    connectToMongoDB();
});
