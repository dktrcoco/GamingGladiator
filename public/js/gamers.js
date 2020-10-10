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
}

// <<<<<<< Updated upstream

//global so we can use it elsewhere
var medalsGold;
var medalsSilver;
var medalsBronze;
var medalsTotal;
var gamerName = $("form.gamerName");
var gameNumber = $("form.gamerNumber");

//object to hold all of the medal data
var medals = {
bronze: medalsBronze,
silver: medalsSilver,
gold: medalsGold,
total: medalsTotal
}

function pullData() {
    var overwatchURL = "https://ow-api.com/v1/stats/pc/us/Dktrcoco-2279/profile"
    $.ajax({
        url: overwatchURL,
        method: "GET"
    }).then(function(res) {
        console.log(res.level)
        medalsGold = res.quickPlayStats.awards.medalsGold;
        medalsSilver = res.quickPlayStats.awards.medalsSilver;
        medalsBronze = res.quickPlayStats.awards.medalsBronze;
        medalsTotal = res.quickPlayStats.awards.medals;
        console.log(medalsGold);
        console.log(res);
        $.ajax({
            url: "/api/new",
            method: "POST", 
            medalsBronze: medalsBronze,
            medalsSilver: medalsSilver,
            medalsGold: medalsGold,
            medalsTotal: medalsTotal
        }).then(function(results) {
            console.log(medalsGold);
            //need to put attributes we're adding into the db
            // medalsBronze: medalsBronze,
            // medalsSilver: medalsSilver,
            // medalsGold: medalsGold,
            // medalsTotal: medalsTotal
            console.log(results);
            console.log(res);
        });
    })
var barData = {
        labels : ["Total Medals","Gold Medals","Silver Medals","Bronze Medals"],
        datasets : [
            {
                fillColor : "#fa9c1d",
                strokeColor : "#48A4D1",
                data : [medalsTotal, medalsGold, medalsSilver, medalsBronze]
            }
        ]
    }
    // get bar chart canvas
    var overData = document.getElementById("overData").getContext("2d");
    // draw bar chart
    new Chart(overData).Bar(barData);




}

function displayGraph() {
    
}


$(".enter-button").on("click", function(event) {
    event.preventDefault();
    pullData();
    console.log("-----")
    console.log(medalsGold)
    // displayGraph();
});

//don't overburden one table
//get this working on heroku
//then work on routes

//codepens, to use to test chartjs
//another library to check out
//svg, scalable vector graphic, using them, not building

//mpm package of axios, good way to make http requests
//quicker to learn than chartjs