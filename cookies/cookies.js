const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "Namaste");
    res.cookie("madeIn", "India");
    res.send("Sent you some cookie");
});

app.get("/greet", (req, res) => {
    let {name = "anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
});

app.get("/", (req, res) => {
    console.dir(req.cookies); // we are parsing the cookies
    res.send("I, am root");
})

app.listen(8080, () => {
    console.log("Listing to port 8080");
});