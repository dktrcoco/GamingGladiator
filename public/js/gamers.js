//global so we can use it elsewhere
var medalsGold;
var medalsSilver;
var medalsBronze;
var medalsTotal;
var gamerName = $("#username-input");

//this function pulls player data and populates the db
function pullMedalData() {

    var gamerNameUrl = gamerName.val();
    //Blizzard uses a '#' in their gamertags, need to replace with '-' for proper url call
    var gamerNameUrl2 = gamerNameUrl.replace("#", "-");

    $.ajax({
        url: "/api/gold/" + gamerNameUrl2,
        method: "GET"
    }).then(function (res) {
        let medalsGoldPrevious = 0;
        if (res) {
            medalsGoldPrevious = res.medalsGold || 0;
        }

        var overwatchURL = "https://ow-api.com/v1/stats/pc/us/" + gamerNameUrl2 + "/profile";
        $.ajax({
            url: overwatchURL,
            method: "GET"
        }).then(function (res) {
            // const medalsGoldPrevious = medalsGold || 0; //sets medalsGoldPrevious to either medalsGold OR 0
            const medalsGold = res.quickPlayStats.awards.medalsGold;
            medalsSilver = res.quickPlayStats.awards.medalsSilver;
            medalsBronze = res.quickPlayStats.awards.medalsBronze;
            medalsTotal = res.quickPlayStats.awards.medals;
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
            });
        })
    })
}

//async function that captures all competitors names
async function getGamerData() {
    let data = await fetch('/api/gamername').then(response => {
        return response.json()
    })
    let gamers = data.map(gamer => {
        return gamer.gamerName
    })
    return gamers
}

//async function that creates arr of final medal count
async function getNewGold() {
    let gamerArr = await getGamerData();

    let arrGoldNew = [];
    let promiseArr = [];
    for (let i = 0; i < gamerArr.length; i++) {
        var overwatchURL = "https://ow-api.com/v1/stats/pc/us/" + gamerArr[i] + "/profile";
        promiseArr.push($.ajax({
            url: overwatchURL,
            method: "GET"
        }));
    }
    const allGoldMedalData = await Promise.all(promiseArr);
    for (let i = 0; i < allGoldMedalData.length; i++) {
        arrGoldNew.push(allGoldMedalData[i].quickPlayStats.awards.medalsGold);
    }
    return arrGoldNew
};

//async function that uses chartjs to graph the medals won during competition
async function displayGraph() {
    let displayGoldArr = await subtractMedals();
    let displayNameArr = await getGamerData();

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

//async function that takes in the arrays of initial and final gold medal count
//for each player and calculates the total earned during competition
async function subtractMedals() {
    let oldMedalCount = await getOldGold();
    let newMedalCount = await getNewGold();
    let medalCountDifference = [];

    for (let i = 0; i < oldMedalCount.length; i++) {
        medalCountDifference.push(newMedalCount[i] - oldMedalCount[i])
    }
    return medalCountDifference;
}

//async function that creates arr of initial medal count
async function getOldGold() {
    let data = await fetch('/api/oldgold').then(response => {
        return response.json()
    })
    let oldGold = data.map(gamer => {
        return gamer.medalsGold
    })
    return oldGold
}

$(".results-button").on("click", function (event) {
    displayGraph();
});

$(".enter-button").on("click", function (event) {
    event.preventDefault();
    var gamerNameUrl = gamerName.val();
    var gamerNameUrl2 = gamerNameUrl.replace("#", "-");
    pullMedalData();
    var newDiv = $("<div>" + gamerNameUrl + "</div>");
    if ($("#empty-div").children().length >= 0 && $("#empty-div").children()[0]) {
        let isUnique = true;
        for (var i = 0; i < $("#empty-div").children().length; i++) {
            if (gamerNameUrl === $("#empty-div").children()[i].innerHTML) {
                alert("Gamer tag already exists");
                isUnique = false;
                break;
            }
            else continue;

        }
        if (isUnique) $("#empty-div").append(newDiv);
    }
    else $("#empty-div").append(newDiv);
});