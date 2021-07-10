const mysql = require("mysql");
const axios = require("axios");

// Connection Pool
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "myCovid",
});

exports.renderLogin = (req, res) => {
	res.render("login");
};

var num = "1234567890";
var otp = "";
for (let i = 0; i < 6; i++) {
	otp += num[Math.floor(Math.random() * 10)];
}

exports.login = (req, res) => {
	var PhoneNumber = req.body.PhoneNumber;

	db.query(
		"SELECT count(*) as count FROM patient where PhoneNumber=?",
		[PhoneNumber],
		(err, rows) => {
			if (!err) {
				if (rows[0].count === 1) {
					console.log(otp);
					res.send("Done!");
					// axios
					// 	.post(
					// 		`http://priority.muzztech.in/sms_api/sendsms.php?username=covidtrans&password=covid123&mobile=${req.body.PhoneNumber}&sendername=MALRTZ&message=${otp} is your OTP From, MALRTZ&templateid=1207161613774232541`
					// 	)
					// 	.then((res) => {
					// 		console.log(`statusCode: ${res.statusCode}`);
					// 		console.log(res);
					// 	})
					// 	.catch((error) => {
					// 		console.error(error);
					// 	});
				} else {
					res.send("invalid number !! ");
				}
			} else {
				console.log(err);
			}
		}
	);
};

exports.verifyLogin = (req, res) => {
	let otpCheck = req.body.otp;

	if (otp == otpCheck) {
		res.send("success");
	} else {
		res.send("Error!!");
	}
};
