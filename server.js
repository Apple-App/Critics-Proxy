const express = require("express");
const request = require("request");
const app = express();

app.use(express.static(__dirname));

app.use((req, res, next) => {
  let url = req.url.split("/");
  let path = url.slice(2).join("/");
  let endpoint = url[1];
  if (endpoint === "main") {
    let proxy =
      "http://ec2-18-224-166-95.us-east-2.compute.amazonaws.com/" + path;
    request(proxy)
      .on("error", err => console.log(err))
      .pipe(res);
  } else if (endpoint === "details") {
    let proxy =
      "http://ec2-18-218-63-15.us-east-2.compute.amazonaws.com/" + path;

    request(proxy)
      .on("error", err => console.log(err))
      .pipe(res);
  } else if (endpoint === "critics") {
    let proxy =
      "http://ec2-18-222-250-160.us-east-2.compute.amazonaws.com/" + path;
    request(proxy)
      .on("error", err => console.log(err))
      .pipe(res);
  } 
});

app.get("/", (req, res) => {});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on port " + port));