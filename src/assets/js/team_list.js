team_list_array = document.getElementById("team_list").getElementsByTagName("span");

// add EventListener of each MEMBER of the TEAM LIST
for (i = 0; i < team_list_array.length; i++){
    console.log("click"+i);
    let TeamListElement = i;
    team_list_array[i].addEventListener("click", function(){
        //hideAllOtherDetails(TeamListElement);
        displayTeamListDetails(TeamListElement);
    });
}

// define function if MEMBER is CLICKED
function displayTeamListDetails(TeamListElement){
    let display_status = team_list_array[TeamListElement].getElementsByClassName("team_list_details")[0].style.display;
    if (display_status == "none" || display_status == ""){
        team_list_array[TeamListElement].getElementsByClassName("team_list_details")[0].style.display = "inline";
    }else{
        team_list_array[TeamListElement].getElementsByClassName("team_list_details")[0].style.display = "none";
    }
}

function hideAllOtherDetails(TeamListElement){
    for (i = 0; i < team_list_array.length; i++){
        console.log("hello"+i)
        team_list_array[i].getElementsByClassName("team_list_details")[0].style.display = "none";
    }
}