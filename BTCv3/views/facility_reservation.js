fac = {
	halls:[],
	cottages:[],
	guesthouses:[],
	dormitories:[],
	dining_kitchen:[],
	rentables:[]
}

fac_reserve = fac;


function checkExistence(array, value) {
	for(j = 0; j < array.length; j++) {
		if(array[j] == value) {
			return true;
		}
	}
	return false;
}

function getIndexOf(array, value) {
	for(j = 0; j < array.length; j++) {
		if(array[j] == value) {
			return j;
		}
	}
}


var HallList = {
	delete: function(id) {
		document.getElementById("halls_"+id).remove();
		var index = getIndexOf(fac.halls, id);
		fac.halls.splice(index, 1);
		//console.log(fac.halls);
	},
	add: function() {
		var hallform = document.getElementById("hall");
		var value = hallform[hallform.selectedIndex].value;
		var name = hallform[hallform.selectedIndex].innerHTML;

		if(checkExistence(fac.halls, value)) {
			alert("this is already added");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.halls.push(value);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "halls_"+value;
		tr.innerHTML = 	
				`
			<td>Conference Hall</td>
			<td>`+name+`</td>
			<td><a href="javascript:;" onclick="HallList.delete('`+value+`')">Remove</a></td>
				`;
		document.getElementById("facilities").appendChild(tr);
	}
};

var CottageList = {
	delete: function(id) {
		document.getElementById("cottages_"+id).remove();
		var index = getIndexOf(fac.cottages, id);
		fac.cottages.splice(index, 1);
		//console.log(fac.cottages);
	},
	add: function() {
		var cottageform = document.getElementById("cottage");
		var value = cottageform[cottageform.selectedIndex].value;
		var name = cottageform[cottageform.selectedIndex].innerHTML;

		if(checkExistence(fac.cottages, value)) {
			alert("this is already added");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.cottages.push(value);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "cottages_"+value;
		tr.innerHTML = 	
				`
			<td>Cottage</td>
			<td>`+name+`</td>
			<td><a href="javascript:;" onclick="CottageList.delete('`+value+`')">Remove</a></td>
				`;
		document.getElementById("facilities").appendChild(tr);
	}
};



var GuestHouseList = {
	delete: function(id) {
		document.getElementById("guesthouses_"+id).remove();
		var index = getIndexOf(fac.guesthouses, id);
		fac.guesthouses.splice(index, 1);
		//console.log(fac.guesthouses);
	},
	add: function() {
		var guesthouseform = document.getElementById("guesthouse");
		var value = guesthouseform[guesthouseform.selectedIndex].value;
		var name = guesthouseform[guesthouseform.selectedIndex].innerHTML;

		if(checkExistence(fac.guesthouses, value)) {
			alert("this is already added");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.guesthouses.push(value);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "guesthouses_"+value;
		tr.innerHTML = 	
				`
			<td>GuestHouse</td>
			<td>`+name+`</td>
			<td><a href="javascript:;" onclick="GuestHouseList.delete('`+value+`')">Remove</a></td>
				`;
		document.getElementById("facilities").appendChild(tr);
	}
};



var DormitoryList = {
	delete: function(id) {
		document.getElementById("dormitories_"+id).remove();
		var index = getIndexOf(fac.dormitories, id);
		fac.dormitories.splice(index, 1);
		//console.log(fac.dormitories);
	},
	add: function() {
		var dormitoryform = document.getElementById("dormitory");
		var value = dormitoryform[dormitoryform.selectedIndex].value;
		var name = dormitoryform[dormitoryform.selectedIndex].innerHTML;

		if(checkExistence(fac.dormitories, value)) {
			alert("this is already added");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.dormitories.push(value);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "dormitories_"+value;
		tr.innerHTML = 	
				`
			<td>Dormitory</td>
			<td>`+name+`</td>
			<td><a href="javascript:;" onclick="DormitoryList.delete('`+value+`')">Remove</a></td>
				`;
		document.getElementById("facilities").appendChild(tr);
	}
};


var DiningsList = {
	delete: function(id) {
		document.getElementById("dinings_"+id).remove();
		var index = getIndexOf(fac.dining_kitchen, id);
		fac.dining_kitchen.splice(index, 1);
		//console.log(fac.dining_kitchen);
	},
	add: function() {
		var dining_kitchenform = document.getElementById("dining_kitchen");
		var value = dining_kitchenform[dining_kitchenform.selectedIndex].value;
		var name = dining_kitchenform[dining_kitchenform.selectedIndex].innerHTML;

		if(checkExistence(fac.dining_kitchen, value)) {
			alert("this is already added");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.dining_kitchen.push(value);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "dinings_"+value;
		tr.innerHTML = 	
				`
			<td>Dining Area/Kitchen</td>
			<td>`+name+`</td>
			<td><a href="javascript:;" onclick="DiningsList.delete('`+value+`')">Remove</a></td>
				`;
		document.getElementById("facilities").appendChild(tr);
	}
};


var RentableList = {
	delete: function(id) {
		document.getElementById("rentables_"+id).remove();
		var index = getIndexOf(fac.rentables, id);
		fac.rentables.splice(index, 1);
		//console.log(fac.rentables);
	},
	add: function() {
		var rentableform = document.getElementById("rentable");
		var value = rentableform[rentableform.selectedIndex].value;
		var name = rentableform[rentableform.selectedIndex].innerHTML;

		if(checkExistence(fac.rentables, value)) {
			alert("this is already added");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.rentables.push(value);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "rentables_"+value;
		tr.innerHTML = 	
				`
			<td>Rentable</td>
			<td>`+name+`</td>
			<td><a href="javascript:;" onclick="RentableList.delete('`+value+`')">Remove</a></td>
				`;
		document.getElementById("facilities").appendChild(tr);
	}
};