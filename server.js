const express = require("express");
const app = express();
const fs = require("fs");
const url = require("url");

const filename = "data.json";

if (!fs.existsSync(filename)) fs.writeFileSync(filename, JSON.stringify({}));

const port = parseInt(process.env.PORT || "3000", 10);

app.listen(port, async () => {
    console.info("Listening on " + port);
});

app.get("/*", async (req, res) => {
    console.log("GETリクエストを受信しました。");
    const param = url.parse(req.url);

    res.header("Content-Type", "text/plain;charset=utf-8");
    res.end(fs.readFileSync(filename));
});

app.post("/*", async (req, res) => {
    console.log("POSTリクエストを受信しました。");

    var data = "";
    req.on("data", function (chunk) {
        data += chunk;
    });
    req.on("end", () => {
        const database = JSON.parse(fs.readFileSync(filename));
        const json = JSON.parse(data);
        if (json[0]) {
            console.log("要求: " + json[0]);
            database[json[0]] = json[1];
            fs.writeFileSync(filename, JSON.stringify(database, null, "  "));
        } else {console.log("要求はありません。")};

        res.header("Content-Type", "text/plain;charset=utf-8");
        res.end(JSON.stringify(database));
    });

});