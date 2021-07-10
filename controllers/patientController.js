const mysql = require("mysql");
const axios = require("axios");

// Connection Pool
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "myCovid",
	multipleStatements: true,
});

// View Patients
exports.viewPatients = (req, res) => {
	db.query("SELECT * FROM patient", (err, rows) => {
		if (!err) {
			res.render("showPatients", { rows });
		} else {
			console.log(err);
		}
	});
};

//Find patient by search
exports.findPatients = (req, res) => {
	let searchTerm = req.body.search;

	db.query(
		"SELECT * FROM patient WHERE PatientId LIKE ? OR FirstName LIKE ? OR MiddleName LIKE ? OR LastName LIKE ? OR PhoneNumber LIKE ?",
		[
			searchTerm + "%",
			searchTerm + "%",
			searchTerm + "%",
			searchTerm + "%",
			searchTerm + "%",
		],
		(err, rows) => {
			if (!err) {
				res.render("showPatients", { rows });
			} else {
				console.log(err);
			}
		}
	);
};

// Add new patient
exports.renderNewPatientForm = (req, res) => {
	res.render("newPatient");
};

//New patient POST route
exports.newPatient = (req, res) => {
	const {
		FirstName,
		MiddleName,
		LastName,
		PhoneNumber,
		RelativeName,
		RelativePhoneNumber,
		Relationship,
		AdmissionDatetime,
	} = req.body;

	db.query(
		"INSERT INTO patient SET FirstName = ?,MiddleName = ?,LastName = ?,PhoneNumber = ?, RelativeName = ?, RelativePhoneNumber = ?, Relationship = ?",
		[
			FirstName,
			MiddleName,
			LastName,
			PhoneNumber,
			RelativeName,
			RelativePhoneNumber,
			Relationship,
		],
		(err, rows) => {
			if (!err) {
				res.redirect("/patients");
			} else {
				console.log(err);
			}
		}
	);
};

// Edit Patient Details
exports.editPatient = (req, res) => {
	const { id } = req.params;
	db.query("SELECT * FROM patient WHERE PatientId = ?", [id], (err, rows) => {
		if (!err) {
			res.render("editPatientDetails", { rows });
		} else {
			console.log(err);
		}
	});
};

// Update Patient Details
exports.updatePatient = (req, res) => {
	const {
		FirstName,
		MiddleName,
		LastName,
		PhoneNumber,
		RelativeName,
		RelativePhoneNumber,
		Relationship,
	} = req.body;

	db.query(
		"UPDATE patient SET FirstName = ?,MiddleName = ?,LastName = ?,PhoneNumber = ?, RelativeName = ?, RelativePhoneNumber = ?, Relationship = ? WHERE PatientId = ?",
		[
			FirstName,
			MiddleName,
			LastName,
			PhoneNumber,
			RelativeName,
			RelativePhoneNumber,
			Relationship,
			req.params.id,
		],
		(err, rows) => {
			if (!err) {
				db.query(
					"SELECT * FROM patient WHERE PatientId = ?",
					[req.params.id],
					(err, rows) => {
						if (!err) {
							res.render("editPatientDetails", {
								rows,
								flash: `${FirstName} ${LastName} has been updated.`,
							});
						} else {
							console.log(err);
						}
					}
				);
			} else {
				console.log(err);
			}
		}
	);
};

// Delete Patient
exports.deletePatient = (req, res) => {
	const { id } = req.params;
	db.query("DELETE FROM patient WHERE PatientId = ?", [id], (err, rows) => {
		if (!err) {
			res.redirect("/patients");
		} else {
			console.log(err);
		}
	});
};

// View Patient details
exports.viewPatientDetails = (req, res) => {
	const { id } = req.params;
	db.query("SELECT * FROM patient WHERE PatientId = ?", [id], (err, rows) => {
		if (!err) {
			db.query(
				"SELECT * FROM patientstatus WHERE PatientId = ? ",
				[id],
				(err, results) => {
					if (!err) {
						// console.log(results);
						res.render("viewPatientDetails", {
							personalDetails: rows,
							vitals: results,
						});
					} else {
						console.log(err);
					}
				}
			);
		} else {
			console.log(err);
		}
	});
};

// Add patient vitals
exports.renderVitalsForm = (req, res) => {
	res.render("updateVitals");
};

//Vitals update post request
exports.updateVitals = (req, res) => {
	const {
		PulseRate,
		RespiratoryRate,
		BpSystolic,
		BpDiastolic,
		SpO2,
		O2,
		Temperature,
	} = req.body;

	// axios
	// 	.post(
	// 		`http://priority.muzztech.in/sms_api/sendsms.php?username=covidtrans&password=covid123&mobile=7339765063&sendername=MALRTZ&message= ${BPSystolic}/${BPDiastolic} is your OTP From, MALRTZ&templateid=1207161613774232541`
	// 	)
	// 	.then((res) => {
	// 		console.log(`statusCode: ${res.statusCode}`);
	// 		console.log(res);
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});

	db.query(
		"INSERT INTO patientstatus SET PatientId=?, PulseRate = ?, RespiratoryRate = ?, BpSystolic = ?, BpDiastolic = ?, SpO2 = ?, O2 = ?, Temperature = ?",
		[
			req.params.id,
			PulseRate,
			RespiratoryRate,
			BpSystolic,
			BpDiastolic,
			SpO2,
			O2,
			Temperature,
		],
		(err, rows) => {
			if (!err) {
				// console.log(req.body);
				// console.log("****************");
				// console.log(rows);
				res.redirect(`/patients/viewPatient/${req.params.id}`);
			} else {
				console.log(err);
			}
		}
	);
};
