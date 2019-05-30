require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const server = express();
const cors = require("cors");
const db = require("./usersModel");

const {
  checkUserInfo,
  restricted,
  generateToken
} = require("./authMiddleware");

server.use(express.json());
server.use(cors());
// welcome page
server.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome the the Event Planner Backend!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Error: Sorry for inconvenience" });
  }
});

// register
server.post("/api/register", checkUserInfo, async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);

  try {
    const newUser = await db.addUser(user);
    console.log(newUser);
    if (newUser[0]) {
      res.status(201).json({ message: "User created " });
    } else {
      res.status(400).json({ message: "An error occured, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Error: Sorry for inconvenience" });
  }
});

// login
server.post("/api/login", checkUserInfo, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.findUser(email);
    console.log(user);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(201).json({ message: "Credentials Verified", token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Error: Sorry for the Inconvenience" });
  }
});

// view users after loging in
server.get("/api/events", restricted, async (req, res) => {
  try {
    const events = await db.getUsers();
    if (events.length > 0) {
      res.status(200).json({ userts });
    } else {
      res.status(400).json({ message: "Try again" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Error: Sorry for the inconvenience" });
  }
});

// get - view events
// server.get("/api/events", restricted, (req, res) => {
//   //res.send('Hello World');
//   db("events")
//     .then(events => {
//       res.status(200).json(events);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// post - add
server.post("/api/events", (req, res) => {
  //res.send("Post working");

  const event = req.body;

  db("events")
    .insert(event)
    .then(ids => {
      res.status(201).json(ids); //just a true or false flag
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// put - edit events

server.put("/api/events/:id", (req, res) => {
  // res.send('Put Working');

  db("events")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Action not found" ' });
      }
    })

    .catch(error => {
      res.status(500).json(error);
    });
});

// delete
server.delete("/api/events/:id", (req, res) => {
  // res.send('Delete Working');

  db("events")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })

    .catch(error => {
      res.status(500).json(error);
    });
});

const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
  console.log(`Server is up at PORT ${PORT}`);
});
