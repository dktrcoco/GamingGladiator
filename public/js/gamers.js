// when the page loads, grabs and displays all gamers




$.get("/api/all", function (data) {
    if (data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
            var row = $("<div>");
            row.addClass("gamer");
            row.append("<p>" + data[i].gamer + " is ready to rock! </p>");
            $("gamer-area").append(row);
        }
    }
});

// ajax call goes here
// needs function get request against api with the two params for username
//use split and join to cut out 

//will need params of player name/number eventually
function gamerInfo() {
    //this is actually the ajax call using jquery syntax

    $.get("https://ow-api.com/v1/stats/pc/us/Dktrcoco-2279/profile", function (data) {
        $(".result").html(data);
        alert("Load was performed.");
    });

    //this needs to correspond
    // $.post("/api/login", {
    //     email: email,
    //     password: password
    // })
    //     .then(() => {
    //         window.location.replace("/members");
    //         // If there's an error, log the error
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
}

function pullData() {
    var overwatchURL = "https://ow-api.com/v1/stats/pc/us/Dktrcoco-2279/profile"
    $.ajax({
        url: overwatchURL,
        method: "GET"
    }).then(function(res) {
        console.log(res.level)
    })
}

$(".enter-button").on("click", function(event) {
    event.preventDefault();
    pullData();
});

//don't overburden one table
//get this working on heroku
//then work on routes