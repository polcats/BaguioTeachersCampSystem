function editEmail() {
            email=prompt("Enter a new email address: ");
            var dup = $("#email").clone();

            $("#email").replaceWith("<span id='email'><i>Changing email...</i></span>");

            $.get("/edit",{"action":"email","value":email},function(data){
                if(data=='done')  {
                    $("#email").replaceWith("<span id='email'><b>Email:</b> "+email+"</span>");
                } else {
                	alert("An error has occured.");
                	$("#email").replaceWith(dup);
                }
            });
}

$(document).ready(function(){
    $.get("/ongoingcontent",{},function(data){
        if(data)  {
            $("#o-content").html(data);
        }
    });

    $.get("/finishedcontent",{},function(data){
        if(data)  {
            $("#f-content").html(data);
        }
    });

    $.get("/onholdcontent",{},function(data){
        if(data)  {
            $("#h-content").html(data);
        }
    });



});
/*

function finish(id) {
    $.get("/finish",{id, episode},function(data){
        if(data)  {
            $("#f-content").html(data);
        }
    });
}

function update(id) {      
    var episode = $("#episode_"+id).val();
    $.get("/update",{id, episode},function(data){
        if(data)  {
            $("#h-content").html(data);
        }
    });
}*/