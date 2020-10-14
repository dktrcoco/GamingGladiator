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

function getPlayerOneOldGold() {
    var gamerNameUrl = gamerName.val();
    console.log("new2: " + gamerNameUrl);
    var gamerNameUrl2 = gamerNameUrl.replace("#", "-");
    
    $.ajax({
        url: "/api/gold/" + gamerNameUrl2,
        method: "GET"
    }).then(function (res) {

    }) 
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

// async function pullGamerData() {
//     //need an api route for pulling one gamerName to populate the url
//     let data = $.ajax({
//         url: "/api/gamername",
//         method: "GET"
//     }).then(function (res) {
//         // console.log(res);
//         // console.log(res[0].gamerName);
//         let gamerArr = [];
//         for (let i = 0; i < res.length; i++) {
//             gamerArr.push(res[i].gamerName);
//         }
//         console.log("arr: " + gamerArr);
//         return gamerArr;
//     })
//     return data;
// }

// async function getGamerData() {
//     let data = await fetch("/api/gamername").then(response => {
//         console.log(response.json)
//         return response.json()
//     })
//     console.log(data);
// }

async function getGamerData() {
    let data = await fetch('/api/gamername').then(response => {
        return response.json()
    })
    let gamers = data.map(gamer => {
        return gamer.gamerName
    })
    console.log(gamers)
    return gamers
}

async function getNewGold() {
    let test = await getGamerData();
    console.log(test[0]);
    let arrGoldNew = [];
    for (let i = 0; i < test.length; i++) {
        var overwatchURL = "https://ow-api.com/v1/stats/pc/us/" + test[i] + "/profile";
        console.log("before ajax: " + overwatchURL);
        //ajax here
        var res = await $.ajax({
            url: overwatchURL,
            method: "GET"
        })
        console.log("after ajax: " + overwatchURL);
        arrGoldNew.push(res.quickPlayStats.awards.medalsGold);
        console.log(arrGoldNew);
        // $.ajax({
        //     url: overwatchURL,
        //     method: "GET"
        // }).then(function (res) {
        //     console.log("after ajax: " + overwatchURL);
        //     arrGoldNew.push(res.quickPlayStats.awards.medalsGold);
        //     console.log(arrGoldNew);
        // })
    }
    console.log(arrGoldNew);
    return arrGoldNew
};

function apiCall() {

    let arr = getGamerData();
    console.log(arr);

    var overwatchURL = "https://ow-api.com/v1/stats/pc/us/" + gamerNameUrl2 + "/profile";
    console.log(overwatchURL);
    $.ajax({
        url: overwatchURL,
        method: "GET"
    }).then(function (res) {
        console.log(res.level);
        var goldNew = res.quickPlayStats.awards.medalsGold;
        console.log(goldNew);
    })
};

function testing() {
    let data = pullGamerData();
    console.log(data);
}

async function displayGraph() {
    let displayGoldArr = await subtractMedals();
    let displayNameArr = await getGamerData();
    console.log("final gold: " + displayGoldArr);
    console.log("final name: " + displayNameArr);

    // var playerArray = ["player1", "player2", "player3", "player4"];
    // var goldArray = [5, 4, 3, 2];

    var barData = {
        labels: displayNameArr,
        datasets: [
            {
                fillColor: "#FFFFFF",
                strokeColor: "#000000",
                data: displayGoldArr
            }
        ]
    }
    // get bar chart canvas
    var overData = document.getElementById("overData").getContext("2d");
    // draw bar chart
    new Chart(overData).Bar(barData);
}

async function combineGolds() {
    // let oldGold = await getOldGold();
    // let newGold = await getNewGold();
    // let newGold = [];
    console.log(newGold);

}

async function subtractMedals() {
    let oldMedalCount = await getOldGold();
    console.log(oldMedalCount);
    let newMedalCount = await getNewGold();
    console.log(newMedalCount);
    let medalCountDifference = [];

    for(let i = 0; i < oldMedalCount.length; i++) {
        medalCountDifference.push(newMedalCount[i] - oldMedalCount[i])
    }
    console.log("difference: " + medalCountDifference);
    return medalCountDifference;
}

async function getOldGold() {
    let data = await fetch('/api/oldgold').then(response => {
        return response.json()
    })
    let oldGold = data.map(gamer => {
        return gamer.medalsGold
    })
    console.log("old Gold: " + oldGold)
    return oldGold
}

async function getOldGold2() {
    $.ajax({
        url: "/api/allgold",
        method: "GET"
    }).then(function (results) {
        let arrGold = [];
        let arrPlayer = [];
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].medalsGold);
            //pushes the medalsGold into the array
            arrGold.push(results[i].medalsGold);
            arrPlayer.push(results[i].gamerName);
        }
        console.log("old gold: " + arrGold);
    })
}

$(".results-button").on("click", function (event) {
    // displayGraph();
    getOldGold();
    // getGamerData();
    // apiCall();
    getNewGold();
    // dataForDisplay();
    // combineGolds();
    subtractMedals();
    displayGraph();
});

function dataForDisplay() {
    $.ajax({
        url: "/api/allgold",
        method: "GET"
    }).then(function (results) {
        let arrGold = [];
        let arrPlayer = [];
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].medalsGold);
            //pushes the medalsGold into the array
            arrGold.push(results[i].medalsGold);
            arrPlayer.push(results[i].gamerName);
        }
        //we could put the chartjs stuff here so it has access to the data
        //probably easier to do chart, possibly by calling the displayGraph function here

        var barData = {
            labels: arrPlayer,
            datasets: [
                {
                    fillColor: "#FFFFFF",
                    strokeColor: "#000000",
                    data: arrGold
                }
            ]
        }
        // get bar chart canvas
        var overData = document.getElementById("overData").getContext("2d");
        // draw bar chart
        new Chart(overData).Bar(barData);

        console.log(arrGold);
        console.log(arrPlayer);
    })
}


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
    var newDiv = $("<div>" + gamerNameUrl + "</div>");
    $("#empty-div").append(newDiv);
});

//don't overburden one table
//get this working on heroku
//then work on routes

//codepens, to use to test chartjs
//another library to check out
//svg, scalable vector graphic, using them, not building

//mpm package of axios, good way to make http requests
//quicker to learn than chartjs