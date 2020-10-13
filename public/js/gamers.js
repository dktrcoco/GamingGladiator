// when the page loads, grabs and displays all gamers
// var gamerName = document.getElementById("username-input");




// $.get("/api/all", function (data) {
//     if (data.length !== 0) {
//         for (var i = 0; i < data.length; i++) {
//             var row = $("<div>");
//             row.addClass("gamer");
//             row.append("<p>" + data[i].gamer + " is ready to rock! </p>");
//             $("gamer-area").append(row);
//         }
//     }
// });

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
var gamerName = $("#username-input");
// var gamerNameUrl = gamerName.val();

// var a = gamerNameUrl.repace("#", "-");



// var a = "Dktrcoco";
// a = a.replace

//object to hold all of the medal data
var medals = {
    bronze: medalsBronze,
    silver: medalsSilver,
    gold: medalsGold,
    total: medalsTotal
}
//create timer, set interval to whatever you want (3 hours for example)
function createInterval() {

}


function pullMedalData() {

    var gamerNameUrl = gamerName.val();
    console.log("new2: " + gamerNameUrl);
    var gamerNameUrl2 = gamerNameUrl.replace("#", "-");

    //need to make a call to the db to capture what the previous medals gold was for a particular user
    //and need to do it before the ajax call

    $.ajax({
        url: "/api/gold/" + gamerNameUrl2,
        method: "GET"
    }).then(function (res) {
        console.log(res);
        let medalsGoldPrevious = 0;
        if (res) {
            medalsGoldPrevious = res.medalsGold || 0;
        }

        var overwatchURL = "https://ow-api.com/v1/stats/pc/us/" + gamerNameUrl2 + "/profile";
        console.log(overwatchURL);
        $.ajax({
            url: overwatchURL,
            method: "GET"
        }).then(function (res) {
            console.log(res.level)
            // const medalsGoldPrevious = medalsGold || 0; //sets medalsGoldPrevious to either medalsGold OR 0
            const medalsGold = res.quickPlayStats.awards.medalsGold;
            medalsSilver = res.quickPlayStats.awards.medalsSilver;
            medalsBronze = res.quickPlayStats.awards.medalsBronze;
            medalsTotal = res.quickPlayStats.awards.medals;
            console.log(medalsGold);
            console.log(res);
            console.log("gamerName: " + gamerName.val());
            $.ajax({
                url: "/api/new",
                method: "POST",
                data: {
                    gamerName: gamerNameUrl2,
                    medalsBronze: medalsBronze,
                    medalsSilver: medalsSilver,
                    medalsGold: medalsGold,
                    medalsGoldPrevious: medalsGoldPrevious,
                    medalsTotal: medalsTotal
                }
            }).then(function (results) {
                console.log("gold: " + medalsGold);
            });
        })


    })


}


function displayGraph() {
    var barData = {
        labels: ["Total Medals", "Gold Medals", "Silver Medals", "Bronze Medals"],
        datasets: [
            {
                fillColor: "#FFFFFF",
                strokeColor: "#000000",
                data: [30, 10, 10, 10]
            }, {
                fillColor: "#48A4D1",
                strokeColor: "#000000",
                data: [50, 25, 10, 15]
            },

        ]
    }
    // get bar chart canvas
    var overData = document.getElementById("overData").getContext("2d");
    // draw bar chart
    new Chart(overData).Bar(barData);
}

function dataForDisplay() {
    $.ajax({
        url: "/api/allgold",
        method: "GET"
    }).then(function (results) {
        let arr = [];
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].medalsGold);
            //pushes the medalsGold into the array
            arr.push(results[i].medalsGold);
        }
        //we could put the chartjs stuff here so it has access to the data
        //probably easier to do chart, possibly by calling the displayGraph function here
        console.log(arr);
    })
}

$(".results-button").on("click", function (event) {
    displayGraph();
    dataForDisplay();
});


$(".enter-button").on("click", function (event) {
    event.preventDefault();
    console.log("new: " + gamerName.val());
    var gamerNameUrl = gamerName.val();
    console.log("new2: " + gamerNameUrl);
    var gamerNameUrl2 = gamerNameUrl.replace("#", "-");
    console.log(gamerNameUrl2);
    pullMedalData();
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