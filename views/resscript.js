


function saveReservation() {
    details.facs = fac;
    var data2x = "/savereservation?details="+JSON.stringify(details);
    $.get(data2x, {}, function(data){
      if(data == "done") {
         window.location.href="/pages?id=5";
      } else {
        window.location.href="/pages?id=7";
      }
    });
}

function checkChosen() {
  var facExist = false;
  if(fac.halls.length > 0 || 
    fac.cottages.length > 0 || 
    fac.guesthouses.length > 0 || 
    fac.dormitories.length > 0 || 
    fac.dining_kitchen.length > 0 || 
    fac.rentables.length > 0 ) {
    facExist = true;
  }
  return facExist;
}

function checkval(x) {
  if(x.value == "" || x.value < 0) {
      x.value = 0;
      return false;
  }
}

function cancelReservation() {

   var conf = confirm("Are you sure you want to cancel?");
   if(conf) {
      window.location.href = "/home";
   }
}

var currentType = "";
function checkNum() {
  /* var gtype = $("#form_gtype");
   var val = gtype.val();

   if(val == "individual") {
      $("#form_number").attr("disabled", true).val("0");
      $("#adults").removeAttr("disabled");
      $("#seniors").removeAttr("disabled");
      $("#children").removeAttr("disabled");
      currentType = "individual";
      $("#notif").html(``);
   } else if(val == "group") {
      $("#form_number").removeAttr("disabled").val("0");;
      $("#adults").attr("disabled", true).val("0");
      $("#seniors").attr("disabled", true).val("0");
      $("#children").attr("disabled", true).val("0");
      currentType = "group";
      $("#notif").html(``);
   } else if(val == "def") {
      $("#form_number").attr("disabled", true).val("0");
      $("#adults").attr("disabled", true).val("0");
      $("#seniors").attr("disabled", true).val("0");
      $("#children").attr("disabled", true).val("0");
      currentType = "";
      $("#notif").html(``);
   }*/
}

function total() {
  var total = $("#form_number");
  var adults = $("#adults");
  var seniors = $("#seniors");
  var children = $("#children");
  if(currentType == "individual") {
     if(parseInt(seniors.val(), 10) > parseInt(adults.val(), 10)) {
        $("#notif").html(`<div class="alert alert-danger">
                            The number of seniors or PWDS cannot be more than total adults!
                      </div>`);
        seniors.val("0");
        seniors.focus();
        return false;
     } else {
       $("#notif").html(``);
     }
     //$("#notif").html(``+(adults.val() + children.val()));

     total.val( parseInt(adults.val(), 10) + parseInt(children.val(), 10) );

  }

}

function loadFacilities(arriv, dep, total, gtype, affi, lodging) {
    $.get("/allreserves?&arrival="+arriv+"&departure="+dep+"&total="+total+"&gtype="+gtype+"&affiliation="+affi+"&lodging="+lodging,{},function(data){
         if(data)  { 
            $("#facilities").html(data); 
         }
    });
}


var details = {
        name:"", 
        cp:"", 
        address: "", 
        c1:"", 
        c2:"", 
        email:"", 
        act:"", 
        gtype:"", 
        no:"", 
        adults:"",
        seniors:"",
        children:"",
        affi:"", 
        lodging:"", 
        arriv:"", 
        dep:"", 
        remarks:""
};

function checkForm(evt) {
   var name = $("#form_name");
   var cp = $("#cp");
   var address = $("#address");
   var c1 = $("#form_contact1");
   var c2 = $("#form_contact2");
   var email = $("#email");
   var act = $("#form_activity");
   var gtype = $("#form_gtype");
   var no = $("#form_number");
   var adults = $("#adults");
   var seniors = $("#seniors");
   var children = $("#children");
   var affi = $("#form_affiliation");
   var lodging = $("#lodging");
   var arriv = $("#form_arrival");
   var dep = $("#form_departure");

   if(name.val().length == 0) {
      alert("Please enter a name.");
      name.focus();
      return false;
   }

   if(affi.val() == "def") {
      alert("Please choose an affiliation.");
      affi.focus();
      return false;
   }

   if(cp.val().length == 0) {
      alert("Please enter a contact person.");
      cp.focus();
      return false;
   }

  /* if(address.val().length == 0) {
      alert("Please enter an address.");
      address.focus();
      return false;
   }*/


   if(c1.val().length == 0 && c2.val().length == 0) {
      alert("Please enter a contact number.");
      c1.focus();
      return false;
   }
   if(c1.val().length > 0 && !$.isNumeric(c1.val())) {
      alert("Contact number is not a number!");
      c1.focus();
      return false;
   } else if(c2.val().length > 0 && !$.isNumeric(c2.val())) {
      alert("Alternate contact number is not a number!");
      c2.focus();
      return false;
   }

   if(gtype.val() == "def") {
      alert("Please choose a guest type.");
      gtype.focus();
      return false;
   }

   if(gtype.val() == "group" && no.val() < 2) {
      alert("The number of participants for a group must be more than 1.");
      no.focus();
      return false;
   }
	if(
		gtype.val() == "group" && no.val() < 2) {
      alert("The number of participants for a group must be more than 1.");
      no.focus();
      return false;
   }

   if(no.val() < 0) {
      alert("Number of participants cannot be negative.");
      no.focus();
      return false;
   }

   if(no.val() == 0) {
      alert("The total number of participants cannot be zero!");
      no.focus();
      return false;
   }	

   if(act.val().length == 0) {
      alert("Please enter an activity.");
      act.focus();
      return false;
   }

   if(lodging.val() == "def") {
      alert("Please enter a lodging type.");
      lodging.focus();
      return false;
   }

   if(!arriv.val()) {
      alert("Please choose an arrival date.");
      arriv.focus();
      return false;
   }
   var arrivDate = new Date(arriv.val());
   var currDate = new Date();
   var compArriv = new Date(arrivDate.getYear(), arrivDate.getMonth(), arrivDate.getDate());
   var compCurr = new Date(currDate.getYear(), currDate.getMonth(), currDate.getDate());

   if(compArriv < compCurr) {
      alert("Arrival date cannot be from the past!");
      arriv.focus();
      return false;
   }

   if(!dep.val()) {
      alert("Please choose a departure date.");
      dep.focus();
      return false;
   }

   var arrivDate = new Date(arriv.val());
   var depDate = new Date(dep.val());
   var compArriv = new Date(arrivDate.getYear(), arrivDate.getMonth(), arrivDate.getDate());
   var compDep = new Date(depDate.getYear(), depDate.getMonth(), depDate.getDate());
   if(compDep < compArriv) {
      alert("You cannot depart before arriving!");
      dep.focus();
      return false;
   }

   details.name = name.val();
   details.cp = cp.val();
   details.address = address.val();
   details.c1 = c1.val();
   details.c2 = c2.val();
   details.email = email.val();
   details.gtype = gtype.val();
   details.no = no.val();
   details.adults =0;
   details.seniors = 0;
   details.children =0;
   details.affi = affi.val();
   details.act = act.val();
   details.lodging = lodging.val();
   details.arriv = arriv.val();
   details.dep = dep.val();
   details.remarks = $("#form_remarks").val();


   loadFacilities(arriv.val(), dep.val(), no.val(), gtype.val(), affi.val(), lodging.val());
   openTab("facform", "facilities");
}

function showSummary() {

    if(checkChosen() == false) {
      var conf = confirm("You have not selected any facilities. Would you still like to proceed?");
      if(!conf) {
        return false;
      }
    }

   openTab("sumform", "summary");
   $("#sum_name").html(details.name);
   $("#sum_affi").html(details.affi);
   $("#sum_add").html(details.address);
   $("#sum_cp").html(details.cp);
   $("#sum_c1").html(details.c1);
   $("#sum_c2").html(details.c2);
   $("#sum_email").html(details.email);
   $("#sum_gtype").html(details.gtype);
   $("#sum_total").html(details.no);   
   $("#sum_act").html(details.act); 
   $("#sum_lodging").html(details.lodging);
   $("#sum_arriv").html(details.arriv);
   $("#sum_dep").html(details.dep);
   $("#sum_remarks").html(details.remarks);
   $("#sum_facs").html(fac.names.toString().replace(/,/g, ", "));
}

function goBack() {
   var conf = confirm("Going back will reset the facilities you have added. Continue?");
   if(!conf) {
      return false; // cancel
   }
   console.log(fac);
     openTab("resform", "reserveform");
     fac = {
         halls:[],
         cottages:[],
         guesthouses:[],
         //dorm_rooms:[],
         dormitories:[],
         dining_kitchen:[],
         rentables:[]
      }
     console.log(fac);
}