fac = {
	halls:[],
	cottages:[],
	guesthouses:[],
	dormitories:[],
	dorm_rooms: [],
	dining_kitchen:[],
	rentables:[],
	names: []
}

fac_reserve = fac;

function noFacsYet() {
	if(fac.names.length == 0) {
		$("#facempty").show();
	} else {
		$("#facempty").hide();
	}
}


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
	delete: function(id, name) {
		document.getElementById("halls_"+id).remove();
		var index = getIndexOf(fac.halls, id);
		fac.halls.splice(index, 1);

		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet()
	},
	showDetails: function() {
		var hallform = document.getElementById("hall");
		var value = hallform[hallform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = hallform[hallform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=hall&id="+value+"&affiliation="+_affiliation+"&lodging="+_lodging;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var hallform = document.getElementById("hall");
		var value = hallform[hallform.selectedIndex].value;
		var name = hallform[hallform.selectedIndex].innerHTML;

		if(checkExistence(fac.halls, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.halls.push(value);
		fac.names.push(name);

		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "halls_"+value;
		tr.innerHTML = 	
				`
			<td>Conference Hall</td>
			<td>`+name+`</td>
			<td>
                <span class="input-group-btn" style="text-align: center;">
                    <button onclick="HallList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>
			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};

var CottageList = {
	delete: function(id, name) {
		document.getElementById("cottages_"+id).remove();
		var index = getIndexOf(fac.cottages, id);
		fac.cottages.splice(index, 1);
		
		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet();
	},
	showDetails: function() {
		var cottageform = document.getElementById("cottage");
		var value = cottageform[cottageform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = cottageform[cottageform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=cottage&id="+value+"&affiliation="+_affiliation;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var cottageform = document.getElementById("cottage");
		var value = cottageform[cottageform.selectedIndex].value;
		var name = cottageform[cottageform.selectedIndex].innerHTML;

		if(checkExistence(fac.cottages, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.cottages.push(value);
		fac.names.push(name);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "cottages_"+value;
		tr.innerHTML = 	
				`
			<td>Cottage</td>
			<td>`+name+`</td>
			<td>
				<span class="input-group-btn" style="text-align: center;">
                    <button onclick="CottageList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>

			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};

var GuestHouseList = {
	delete: function(id, name) {
		document.getElementById("guesthouses_"+id).remove();
		var index = getIndexOf(fac.guesthouses, id);
		fac.guesthouses.splice(index, 1);
		
		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet();
	},
	showDetails: function() {
		var guesthouseform = document.getElementById("guesthouse");
		var value = guesthouseform[guesthouseform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = guesthouseform[guesthouseform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=guesthouse&id="+value+"&affiliation="+_affiliation;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var guesthouseform = document.getElementById("guesthouse");
		var value = guesthouseform[guesthouseform.selectedIndex].value;
		var name = guesthouseform[guesthouseform.selectedIndex].innerHTML;

		if(checkExistence(fac.guesthouses, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.guesthouses.push(value);
		fac.names.push(name);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "guesthouses_"+value;
		tr.innerHTML = 	
				`
			<td>GuestHouse</td>
			<td>`+name+`</td>
			<td>
                <span class="input-group-btn" style="text-align: center;">
                    <button onclick="GuestHouseList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>
			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};



var DormRoomList = {
	currentDorm:"",

	delete: function(id, name) {
		document.getElementById("dormrooms_"+id).remove();
		var index = getIndexOf(fac.dorm_rooms, id);
		fac.dorm_rooms.splice(index, 1);
		
		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet();
	},
	show: function(arriv, dep) {
		var id = $("#dormitory").val();
		if(id == "def") {
			return false;
		}
		var k = document.getElementById("dormitory");
		k = k[k.selectedIndex].innerHTML;
		this.currentDorm = k;

	    $.get("/reservedormroom?arrival="+arriv+"&departure="+dep+"&id="+id,{},function(data){
	         if(data)  { 
	            $("#dormitory_select").html(data); 
	         }
	    });

	},
	showDetails: function() {
		var dormroomform = document.getElementById("dormitory");
		var value = dormroomform[dormroomform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = dormroomform[dormroomform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=dorm_room&id="+value+"&affiliation="+_affiliation;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var dormroomform = document.getElementById("dormitory");
		var value = dormroomform[dormroomform.selectedIndex].value;
		var name = dormroomform[dormroomform.selectedIndex].innerHTML;

		if(checkExistence(fac.dorm_rooms, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.dorm_rooms.push(value);
		fac.names.push(name);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "dormrooms_"+value;
		tr.innerHTML = 	
				`
			<td>`+this.currentDorm+`</td>
			<td>`+name+`</td>
			<td>
				<span class="input-group-btn" style="text-align: center;">
                    <button onclick="DormRoomList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>
			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};

var DormitoryList = {
	delete: function(id, name) {
		document.getElementById("dormitories_"+id).remove();
		var index = getIndexOf(fac.dormitories, id);
		fac.dormitories.splice(index, 1);
		
		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet();
	},
	showDetails: function() {
		var dormitoryform = document.getElementById("dormitory");
		var value = dormitoryform[dormitoryform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = dormitoryform[dormitoryform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=dormitory&id="+value+"&affiliation="+_affiliation;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var dormitoryform = document.getElementById("dormitory");
		var value = dormitoryform[dormitoryform.selectedIndex].value;
		var name = dormitoryform[dormitoryform.selectedIndex].innerHTML;

		if(checkExistence(fac.dormitories, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.dormitories.push(value);
		fac.names.push(name);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "dormitories_"+value;
		tr.innerHTML = 	
				`
			<td>Dormitory</td>
			<td>`+name+`</td>
			<td>
				<span class="input-group-btn" style="text-align: center;">
                    <button onclick="DormitoryList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>
			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};

var DiningsList = {
	delete: function(id, name) {
		document.getElementById("dinings_"+id).remove();
		var index = getIndexOf(fac.dining_kitchen, id);
		fac.dining_kitchen.splice(index, 1);
		
		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet();
	},
	showDetails: function() {
		var dining_kitchenform = document.getElementById("dining_kitchen");
		var value = dining_kitchenform[dining_kitchenform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = dining_kitchenform[dining_kitchenform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=dinings&id="+value+"&lodging="+_lodging;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var dining_kitchenform = document.getElementById("dining_kitchen");
		var value = dining_kitchenform[dining_kitchenform.selectedIndex].value;
		var name = dining_kitchenform[dining_kitchenform.selectedIndex].innerHTML;

		if(checkExistence(fac.dining_kitchen, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.dining_kitchen.push(value);
		fac.names.push(name);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "dinings_"+value;
		tr.innerHTML = 	
				`
			<td>Dining Area/Kitchen</td>
			<td>`+name+`</td>
			<td>
                <span class="input-group-btn" style="text-align: center;">
                    <button onclick="DiningsList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>
			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};


var RentableList = {
	delete: function(id, name) {
		document.getElementById("rentables_"+id).remove();
		var index = getIndexOf(fac.rentables, id);
		fac.rentables.splice(index, 1);
		
		var nameIndex = getIndexOf(fac.names, name);
		fac.names.splice(nameIndex, 1);
		noFacsYet();
	},
	showDetails: function() {
		var rentableform = document.getElementById("rentable");
		var value = rentableform[rentableform.selectedIndex].value;

		if(value == "def") {
			return false;
		}

		var name = rentableform[rentableform.selectedIndex].innerHTML;
		var datax = "/fac_details?type=other&id="+value;
	    $.get(datax, {}, function(data){
	      if(data) {
	         $("#facilities_details").html(data);
	      } else {
	      }
	    });
	},
	add: function() {
		var rentableform = document.getElementById("rentable");
		var value = rentableform[rentableform.selectedIndex].value;
		var name = rentableform[rentableform.selectedIndex].innerHTML;

		if(checkExistence(fac.rentables, value)) {
			alert("You have already added this facility.");
			return false;
		} else if(value == "def") {
			return false;
		}

		fac.rentables.push(value);
		fac.names.push(name);
		console.log(fac);
		console.log(name);

		var tr = document.createElement("tr");
		tr.id = "rentables_"+value;
		tr.innerHTML = 	
				`
			<td>Rentable</td>
			<td>`+name+`</td>
			<td>
                <span class="input-group-btn" style="text-align: center;">
                    <button onclick="RentableList.delete('`+value+`','`+name+`')" class="btn btn-danger btn-fill" type="button" tabindex="-1">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </span>
			</td>
				`;
		document.getElementById("facilities_table").appendChild(tr);
		noFacsYet();
	}
};