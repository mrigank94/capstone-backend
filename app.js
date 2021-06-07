const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes/index');
// const mentors = require("./routes/mentors");
// const mentees = require("./routes/mentees");
// const courses = require("./routes/courses");
// const users = require("./routes/users");
// const auth = require("./routes/auth");
// const home = require("./routes/home");

const connectionString =
  "mongodb+srv://mrigank94:GqtjZDKarka3wHps@todo.iwjw6.mongodb.net/mentos";

mongoose
  .connect(connectionString)
  .then((res) => console.log("Connected to db successfully"))
  .catch((ex) => console.log(ex));

const app = express();

const corsOptions = {
  exposedHeaders: ["x-auth-header", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

app.use('/', routes);

// app.use("/", home);
// app.use("/api/courses", courses);
// app.use("/api/mentors", mentors);
// app.use("/api/mentees", mentees);
// app.use("/api/users", users);
// app.use("/api/auth", auth);

app.listen(3001, () => console.log("Listening on port 3001....."));
