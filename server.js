const app = require("express")(), fs = require("fs"), url = require("url"), filename = "data.json", port = parseInt(process.env.PORT || "3000", 10);

app.listen(port, async () => {
    console.info("Listening on " + port);
});

app.get("/*", async (req, res) => {
    console.log("GETリクエストを受信しました。");

    const param = url.parse(req.url);
    if (param) console.log(param);

    res.header("Content-Type", "text/plain;charset=utf-8");
    res.end(fs.readFileSync(filename));
});

app.post("/*", async (req, res) => {
    console.log("POSTリクエストを受信しました。");

    let data;
    req.on("data", async chunk => data += chunk);
    req.on("end", async () => {
        if (!fs.existsSync(filename)) fs.writeFileSync(filename, JSON.stringify({}));
        const database = JSON.parse(fs.readFileSync(filename));
        const json = JSON.parse(data);
        if (json[0]) {
            console.log("要求: " + json[0]);
            database[json[0]] = json[1];
            fs.writeFileSync(filename, JSON.stringify(database, null, "  "));
        } else console.log("要求はありません。");

        res.header("Content-Type", "text/plain;charset=utf-8");
        res.end(JSON.stringify(database));
    });
});