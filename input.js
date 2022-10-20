const http = require("http");
const https = require("https");

const req = require("http").request("http://localhost", {
    port: 3000,
    method: "post",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
});

req.on('response', res => {
    let data = "";
    res.on("data", chunk => {
        data += chunk;
    });
    res.on("end", () => {
        console.log(data);
    });
});
req.write(JSON.stringify([""]));
req.on('error', err => console.log(err));
req.end();