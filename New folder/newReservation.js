var currentDate = new Date();
var arrivalDate = "";
var departureDate = "";
var arrivalDateObject = "";
var departureDateObject = "";

function validateArrivalDate(){
	arrivalDate = document.getElementById("arriv").value;
	arrivalDateObject = new Date(arrivalDate);
		if(arrivalDateObject<currentDate){
			alert("The arrival date entered is not valid.");
		}
}

function validateDepartureDate(){
	departureDate = document.getElementById("depart").value;
	departureDateObject = new Date(departureDate);

	if(arrivalDateObject>departureDateObject){
		alert("The departure date entered is not valid.");
	}
}