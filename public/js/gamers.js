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

