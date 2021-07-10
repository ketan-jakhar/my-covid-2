const express = require("express");
const mysql = require("mysql");
const path = require("path");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const axios = require("axios");
const patientRoutes = require("./routes/patientRoutes");
const loginRoutes = require("./routes/loginRoutes");
const PORT = process.env.PORT || 4000;

dotenv.config({ path: "./.env" });

const app = express();

// Connection Pool
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	multipleStatements: true,
});

// Connect to DB
db.connect((err, connection) => {
	if (err) throw err;
	console.log("MySQL database Connected as Id: " + db.threadId);
});

// Templating engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Views directory
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// Parse text/html
app.use(express.text());

// Method Override middleware
app.use(methodOverride("_method"));

// Patients Route
app.use("/patients", patientRoutes);

//Login Routes
app.use("/", loginRoutes);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
