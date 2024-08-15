const express = require("express");
const fs = require('fs');
const router = express.Router();

router.get("/submit", (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    const food = req.query.food;
    
    if (firstname && lastname && food) {

        const data = fs.readFileSync('./users.json');
        const jsonData = JSON.parse(data);
        jsonData.push({
            firstname : `${firstname}`,
            lastname : `${lastname}`,
            food : `${food}`
        });
        fs.writeFileSync('users.json', JSON.stringify(jsonData));
    }
    res.redirect('/userinput.html')
});

router.get("/", (req, res) => {
    fs.readFile('./users.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error reading users data");
        }
        let displayData = '';
        const jsonData = JSON.parse(data);
        jsonData.forEach(user => {
            displayData += `<tr><td>${user.firstname}</td><td>${user.lastname}</td><td>${user.food}</td></tr>`
        });
        res.send(`
            <html>
            <head></head>
            <body>
                <table border="1">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Favorite Food</th>
                    </tr>
                    ${displayData}
                </table>
            </body>
            </html>
        `);
    });
});

router.get("/food", (req, res) => {
    const requestedFood = req.query.food;

    // Read data from users.json file
    fs.readFile('./users.json', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error reading users data");
        }

        // Parse JSON data into an array of user objects
        const jsonData = JSON.parse(data);

        // Filter users who have the requested food
        let displayUsers = "";
        const usersWithRequestedFood = jsonData.filter(user => user.food === requestedFood);
        usersWithRequestedFood.forEach(user => {
            displayUsers += `<p>${user.firstname}, ${user.lastname} has the same favorite food as you!<p>`
        });
        // Send the filtered users as a response
     res.send(`
        <html>
        <head></head>
        <body>
            <table border="1">
                ${displayUsers}
            </table>
        </body>
        </html>
    `)
    });
});

module.exports = router;
