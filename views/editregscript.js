
function saveReservation(d) {
    var conf = confirm("Changes are about to be saved. Continue?");
    if(!conf) {
      return false;
    }
    var data2x = "/updateregistration?type=edit&details="+JSON.stringify(d)+"&id="+_id;
    window.location.href = data2x;    
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
      window.location.href = "/viewregdetails?id="+_details.id;
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

details = {
        name:name.val(),
        bday:bday.val(), 
        home_addr:home_addr.val(),
        office_addr:office_addr.val(), 
        home_no:home_no.val(), 
        office_no:office_no.val(), 
        affi:affi.val(), 
        id_card:id_card.val(), 
        reg_type:reg_type.val(), 
        adults:adults.val(),
        seniors:seniors.val(),
        children:children.val(),
        total:total.val(), 
        lodging:lodging.val(), 
        arrival:arrival.val(), 
        departure:departure.val(), 
        emer_name:emer_name.val(),
        emer_no:emer_no.val(),
        remarks:remarks.val()
     }

   saveReservation(details);
}

function showSummary() {
   openTab("sumform", "summary");
   $("#sum_name").html(details.name);
   $("#sum_c1").html(details.c1);
   $("#sum_c2").html(details.c2);
   $("#sum_act").html(details.act);
   $("#sum_gtype").html(details.gtype);
   $("#sum_no").html(details.no);
   $("#sum_affi").html(details.affi);
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