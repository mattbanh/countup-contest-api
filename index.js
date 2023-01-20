const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/entries", require("./routes/entriesRoute"));

// override express errorhandling message
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port} 🚀`));


