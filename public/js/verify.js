function verify() {
	var otpVal = document.getElementById("otp").value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:4000/verify");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		console.log(xhr.responseText);
	};
	xhr.send(JSON.stringify({ otp: otpVal }));
}

function sendOTP() {
	var PhoneNumber = document.getElementById("PhoneNumber").value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:4000/");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		console.log(xhr.responseText);
	};
	xhr.send(JSON.stringify({ PhoneNumber: PhoneNumber }));
}
