const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records - the password.
recordRoutes.route("/record").get(async (req, res) => {
  try {
    let db_connect = dbo.getDb("accounts");
    const projection = {password : 0}
    const result = await db_connect.collection("records").find({}, {projection}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async (req, res) => {
  try {
    let db_connect = dbo.getDb("accounts");
    const { firstName, lastName, emailAddress, phoneNumber, password } = req.body;

    const existingUser = await db_connect.collection("records").findOne({ emailAddress });

    if (existingUser) {
      return res.status(400).json({ message: "Email address already exists." });
    } else {
      const myobj = {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        password,
        role: "",
        checking: 0,
        savings: 0
      };

      const result = await db_connect.collection("records").insertOne(myobj);
      return res.status(200).json({message: "succesful account creation"})
    }
  } catch (err) {
    console.error(err);
    }
});

// success message if email password pair match
recordRoutes.route("/record/auth").get(async (req, res) => {
  try {
    let db_connect = dbo.getDb("accounts");
    const { emailAddress, password } = req.body; // Access query parameters
    const user = await db_connect.collection("records").findOne({ emailAddress: emailAddress, password: password });
    if (user) {
      res.status(200).json({ message: "Authentication successful" });
    } else {
      res.status(401).json({ message: "Email/Password combination does not exist" });
    }
  } catch (err) {
    throw err;
  }
});

//This section will help you get a single record by id
recordRoutes.route("/record/email").get(async (req, res) => {
  try {
    const { emailAddress } = req.body;
    let db_connect = dbo.getDb("accounts");
    const projection = { password: 0 };

    const result = await db_connect.collection("records").findOne({ emailAddress }, { projection });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (err) {
    console.error("Error fetching record:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});


// This section will help you update an account by email address.
recordRoutes.route("/record/update-role").post(async (req, res) => {
  try {
    let db_connect = dbo.getDb("accounts");
    let myquery = { emailAddress: req.body.emailAddress };
    let newvalues = {
      $set: {
        role: req.body.role
      },
    };
    if(req.body.role != "customer" && req.body.role != "manager" && req.body.role != "administrator"){
      res.status(400).json({message : "invalid role type"});
    }

    const result = await db_connect.collection("records").updateOne(myquery, newvalues);

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Record not found or role not modified" });
    } else {
      console.log("1 document updated");
      res.json(result);
    }
  } catch (err) {
    throw err;
  }
});

// This section updates the checking or savings account of user by email.
// recordRoutes.route("/record/deposit").post(async (req, res) => {
//   try {
//     let db_connect = dbo.getDb("accounts");
//     let myquery = { emailAddress: req.body.emailAddress, account : req.body.account, amount : req.body.amount};
//     let newvalues = {
//       $set: {
//         : req.body.role
//       },
//     };
//     if(req.body.role != "customer" && req.body.role != "manager" && req.body.role != "administrator"){
//       res.status(400).json({message : "invalid role type"});
//     }

//     const result = await db_connect.collection("records").updateOne(myquery, newvalues);

//     if (result.modifiedCount === 0) {
//       res.status(404).json({ message: "Record not found or role not modified" });
//     } else {
//       console.log("1 document updated");
//       res.json(result);
//     }
//   } catch (err) {
//     throw err;
//   }
// });

recordRoutes.route("/record/deposit").post(async (req, res) => {
  try {
    const { emailAddress, account, amount } = req.body;

    let db_connect = dbo.getDb("accounts");

    // Determine which account to update
    let updateField = account === "checking" ? "checking" : "savings";
    let updateValue = { $inc: { [updateField]: amount } };

    let myquery = { emailAddress };

    const result = await db_connect.collection("records").updateOne(myquery, updateValue);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Record not found or account not modified" });
    } else {
      console.log("1 document updated");
      return res.json({ message: "Account updated successfully", result });
    }
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

recordRoutes.route("/record/withdraw").post(async (req, res) => {
  try {
    const { emailAddress, account, amount } = req.body;

    let db_connect = dbo.getDb("accounts");

    // Determine which account to update
    let updateField = account === "checking" ? "checking" : "savings";
    let updateValue = { $inc: { [updateField]: (-amount) } };

    let myquery = { emailAddress };
    const user = await db_connect.collection("records").findOne(myquery);
    const accountBalance = user[updateField];

    if(accountBalance - amount < 0){
      return res.status(500).json({message : "Insufficient Funds"});
    }
    const result = await db_connect.collection("records").updateOne(myquery, updateValue);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Record not found or account not modified" });
    } else {
      console.log("1 document updated");
      return res.json({ message: "Account updated successfully", result });
    }
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

// This section will help you transfer between accounts
recordRoutes.route("/record/transfer").post(async (req, res) => {
  try {
    const { emailAddress, fromAccount, toAccount, amount } = req.body;

    let db_connect = dbo.getDb("accounts");

    let myquery = { emailAddress };
    const user = await db_connect.collection("records").findOne(myquery);

    const fromAccountBalance = user[fromAccount];
    const toAccountBalance = user[toAccount];

    if (fromAccountBalance - amount < 0) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const updateValue = {
      $inc: {
        [fromAccount]: -amount,
        [toAccount]: amount
      }
    };
    const result = await db_connect.collection("records").updateOne(myquery, updateValue);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Record not found or account not modified" });
    } else {
      console.log("1 document updated");
      return res.json({ message: "Account updated successfully", result });
    }
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

    


module.exports = recordRoutes;
