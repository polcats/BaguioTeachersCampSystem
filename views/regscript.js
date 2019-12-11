
function saveReservation() {
    //details.facs = fac;
    var data2x = "/saveregistration?details="+JSON.stringify(details)+"&facs="+JSON.stringify(fac);
    $.get(data2x, {}, function(data){
      if(data == "done") {
         window.location.href="/pages?id=8";
      } else {
         window.location.href="/pages?id=10";
      }
    });
    
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

function idCheck() {
   var affi_ = $("#_affi");
   var val_ = affi_.val();

   if(val_ == "deped" || val_ == "govt") {
      $("#_id_card").attr("disabled", false).val("");
      $("#_bday").attr("disabled", false).val("");
      $("#_lodging").attr("disabled", false).val("def");
   } else if(val_ == "vip") {
      $("#_id_card").attr("disabled", true).val("");
      $("#_bday").attr("disabled", true).val("");
      $("#_lodging").attr("disabled", true).val("in");
   } else {
      $("#_lodging").attr("disabled", false).val("def");
      $("#_id_card").attr("disabled", true).val("");
      $("#_bday").attr("disabled", false).val("");
   }
}

var currentType = "";
function checkNum() {
   var gtype = $("#_reg_type");
   var val = gtype.val();

   if(val == "individual") {
      $("#_total").attr("disabled", true).val("0");
      $("#_adults").removeAttr("disabled");
      $("#_seniors").removeAttr("disabled");
      $("#_children").removeAttr("disabled");
      currentType = "individual";
   } else if(val == "group") {
      $("#_total").removeAttr("disabled").val("0");;
      $("#_adults").attr("disabled", true).val("0");
      $("#_seniors").attr("disabled", true).val("0");
      $("#_children").attr("disabled", true).val("0");
      currentType = "group";
   } else if(val == "def") {
      $("#_total").attr("disabled", true).val("0");
      $("#_adults").attr("disabled", true).val("0");
      $("#_seniors").attr("disabled", true).val("0");
      $("#_children").attr("disabled", true).val("0");
      currentType = "";
   }
}

function total() {
  var total = $("#_total");
  var adults = $("#_adults");
  var seniors = $("#_seniors");
  var children = $("#_children");
  if(currentType == "individual") {
     if(parseInt(seniors.val(), 10) > parseInt(adults.val(), 10)) {
        alert("The number of seniors or PWDS cannot be more than total adults!");
        seniors.val("0");
        seniors.focus();
        return false;
     }
     total.val( parseInt(adults.val(), 10) + parseInt(children.val(), 10) );
  }
}

function loadFacilities(arriv, dep, total, gtype, affi, lodging) {
    $.get("/allregisters?&arrival="+arriv+"&departure="+dep+"&total="+total+"&gtype="+gtype+"&affiliation="+affi+"&lodging="+lodging+"&src=reg",{},function(data){
         if(data)  { 
            $("#facilities").html(data); 
         }
    });
}


var details = {
        name:"",
        bday:"", 
        home_addr:"", 
        office_addr: "", 
        home_no:"", 
        office_no:"", 

        affi:"", 
        id_card:"", 
        reg_type:"", 

        adults:"",
        seniors:"",
        children:"",
        total:"", 


        lodging:"", 
        arrival:"", 
        departure:"", 

        emer_name:"",
        emer_no:"",

        remarks:""
};

function dateDiffInYears(dateold, datenew) {
            var ynew = datenew.getFullYear();
            var mnew = datenew.getMonth();
            var dnew = datenew.getDate();
            var yold = dateold.getFullYear();
            var mold = dateold.getMonth();
            var dold = dateold.getDate();
            var diff = ynew - yold;
            if (mold > mnew) diff--;
            else {
                if (mold == mnew) {
                    if (dold > dnew) diff--;
                }
            }
            return diff;
}

function checkForm(evt) {
   var name = $("#_name");
   var bday =  $("#_bday");
   var home_addr = $("#_home_addr");
   var office_addr = $("#_office_addr");
   var home_no = $("#_home_no");
   var office_no = $("#_office_no");

   var affi = $("#_affi");
   var id_card = $("#_id_card");
   var reg_type = $("#_reg_type");

   var adults = $("#_adults");
   var children = $("#_children");
   var seniors = $("#_seniors");
   var total = $("#_total");

   var lodging = $("#_lodging");
   var arrival = $("#_arrival");
   var departure = $("#_departure");

   var emer_name = $("#_emer_name");
   var emer_no = $("#_emer_no");
   var remarks = $("#_remarks");



   if(name.val().length == 0) {
      alert("Please enter a name.");
      name.focus();
      return false;
   }

   if(home_addr.val().length == 0 && office_addr.val().length == 0) {
      alert("Please enter a home or office address.");
      home_addr.focus();
      return false;
   }
  
   if(home_no.val().length == 0 && office_no.val().length == 0) {
      alert("Please enter a home or office telephone number.");
      home_no.focus();
      return false;
   }

   if(affi.val() == "def") {
      alert("Please choose an affiliation.");
      affi.focus();
      return false;
   }

   if(affi.val() == "deped" || affi.val() == "govt") {
        if(id_card.val().length == 0) {
          alert("Identification details are required for DepEd or Government related guests.");
          id_card.focus();
          return false;
        }
   }

   if(affi.val() != "vip") {
     if(bday.val().length == 0) {
        alert("Please enter a birthdate.");
        bday.focus();
        return false;
     } else {
        var age = dateDiffInYears(new Date(bday.val()), new Date());
        if(age < 18) {
          alert("Error: The person is only " + age + " years old!");
          bday.focus();
          return false;
        }
     }
   }


   if(reg_type.val() == "def") {
      alert("Please choose a guest type.");
      reg_type.focus();
      return false;
   }


   if(total.val() == 0) {
      alert("The total number of participants cannot be zero!");
      total.focus();
      return false;
   }

  if(lodging.val() == "def") {
      alert("Please choose a lodging type.");
      lodging.focus();
      return false;
   }

  if(!arrival.val()) {
      alert("Please assign an arrival date.");
      arrival.focus();
      return false;
   }

   var arrivDate = new Date(arrival.val());
   var currDate = new Date();
   var compArriv = new Date(arrivDate.getYear(), arrivDate.getMonth(), arrivDate.getDate());
   var compCurr = new Date(currDate.getYear(), currDate.getMonth(), currDate.getDate());

   if(compArriv < compCurr) {
      alert("Arrival date cannot be from the past!");
      arrival.focus();
      return false;
   }

   if(!departure.val()) {
      alert("Please assign a departure date.");
      departure.focus();
      return false;
   }

   var arrivDate = new Date(arrival.val());
   var depDate = new Date(departure.val());
   var compArriv = new Date(arrivDate.getYear(), arrivDate.getMonth(), arrivDate.getDate());
   var compDep = new Date(depDate.getYear(), depDate.getMonth(), depDate.getDate());
   if(compDep < compArriv) {
      alert("You cannot depart before arriving!");
      departure.val("");
      departure.focus();
      return false;
   }


details = {
        name:name.val().replace("&", "and"),
        bday:bday.val(), 
        home_addr:home_addr.val().replace("&", "and"),
        office_addr:office_addr.val().replace("&", "and"), 
        home_no:home_no.val(), 
        office_no:office_no.val(), 
        affi:affi.val(), 
        id_card:id_card.val().replace("&", "and"), 
        reg_type:reg_type.val(), 
        adults:adults.val(),
        seniors:seniors.val(),
        children:children.val(),
        total:total.val(), 
        lodging:lodging.val(), 
        arrival:arrival.val(), 
        departure:departure.val(), 
        emer_name:emer_name.val().replace("&", "and"),
        emer_no:emer_no.val(),
        remarks:remarks.val().replace("&", "and")
     }

   loadFacilities(arrival.val(), departure.val(), total.val(), reg_type.val(), affi.val(), lodging.val());
   openTab("facform", "facilities");
}


function checkChosen() {
  var facExist = false;
  if(fac.halls.length > 0 || 
    fac.cottages.length > 0 || 
    fac.guesthouses.length > 0 || 
    fac.dorm_rooms.length > 0 || 
    fac.dining_kitchen.length > 0 || 
    fac.rentables.length > 0 ) {
    facExist = true;
  }
  return facExist;
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

   $("#sum_a1").html(details.home_addr);
   $("#sum_a2").html(details.office_addr);
   $("#sum_c1").html(details.home_no);
   $("#sum_c2").html(details.office_no);
   $("#sum_affi").html(details.affi);
   $("#sum_id").html(details.id_card);
   $("#sum_bday").html(details.bday);
   $("#sum_gtype").html(details.reg_type);
   $("#sum_adults").html(details.adults);
   $("#sum_children").html(details.children);
   $("#sum_seniors").html(details.seniors);
   $("#sum_total").html(details.total);
   $("#sum_lodging").html(details.lodging);
   $("#sum_arriv").html(details.arrival);
   $("#sum_dep").html(details.departure);
   $("#sum_emer_cp").html(details.emer_name);
   $("#sum_emer_no").html(details.emer_no);
   $("#sum_remarks").html(details.emer_no);
   $("#sum_facs").html(fac.names.toString().replace(/,/g, ", "));
}

function goBack() {
   var conf = confirm("Going back will reset the facilities you have added. Continue?");
   if(!conf) {
      return false; // cancel
   }
   console.log(fac);
     openTab("regform", "registerForm");
     fac = {
         halls:[],
         cottages:[],
         guesthouses:[],
         dorm_rooms:[],
         dormitories:[],
         dining_kitchen:[],
         rentables:[]
      }
     console.log(fac);
}

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    document.getElementById(evt).className += " active"
}

openTab("regform", "registerForm");