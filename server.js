const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// simple route
app.get("/server", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/create", require("./routes/UPIRouter"));
app.use("/customer", require("./routes/CustRouter"));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'));
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});