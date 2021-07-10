const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get("/", patientController.viewPatients);
router.post("/", patientController.findPatients);

router.get("/newPatient", patientController.renderNewPatientForm);
router.post("/newPatient", patientController.newPatient);

router.get("/editPatient/:id", patientController.editPatient);
router.post("/editPatient/:id", patientController.updatePatient);

router.get("/viewPatient/:id", patientController.viewPatientDetails);

router.get("/:id", patientController.deletePatient);

router.get("/viewPatient/:id/updateVitals", patientController.renderVitalsForm);
router.post("/viewPatient/:id/updateVitals", patientController.updateVitals);

module.exports = router;
