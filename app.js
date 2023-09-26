const express = require("express");
const cors = require("cors");
const db = require("./db/connection");

const PORT = process.env.PORT || 5000;
const app = express();

//cors
app.use(cors());
//lectura del body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log('Connected to database!')
  } catch (error) {
    throw new Error(error);
  }
}

dbConnection();

app.use("/api", require("./routes/API"));

app.listen(PORT, () => {
  console.log("App corriendo en puerto:", PORT);
});
