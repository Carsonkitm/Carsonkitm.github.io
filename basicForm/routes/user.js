const express = require("express");
const fs = require('node:fs');

const router = express.Router();

router.get("/", (req, res) => {
    //this is  not generally how return data is displayed
    // instead it is often returned as a json OBJECT and some frontend then parses it and 
    // displays it in a pretty way. But this will suffice for now.
    const teamname = req.query.teamname;
    const sport = req.query.sport;
    const content = teamname + ", " + sport;
    fs.appendFile("mydata.txt", content, err => {
        if(err) {
            console.log(err);
        }
    });
    res.send(
        "<html><head></head><body" + 
        "<p>Thank you for: " + req.query.teamname + 
        "in sport: " + req.query.sport + "<p>" +
        "</body></html>"
    )
});


module.exports = router;
