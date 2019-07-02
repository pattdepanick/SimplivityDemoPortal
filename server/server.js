const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./controller"));
app.use("/", require("./createVM/controller"));

app.listen(process.env.PORT || 8080, '0.0.0.0', () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
