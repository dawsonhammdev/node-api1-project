const express = require ('express')
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [
    {
     id: 1, // hint: use the shortid npm package to generate it
     name: "Jane Doe", // String, required
     bio: "Not Tarzan's Wife, another Jane",  // String, required
    } 
 ]

server.get('/', (req, res) => {
    res.json({api: "Up and Running"})
})

server.get('/api/users', function (req, res) {
    
    if (!users) {
        res
            .status(500)
            .json({errorMessage: "The users information could ot be retreived" });
    } else res.json(users);

    res.json(users);
})

server.get('/api/users/:id', (req,res) => {

    const reqId = Number(req.params.id)

    const reqUser = users.filter(user=>user.id == reqId)

    res.status(200).json(reqUser);
})

server.post('/api/users', function(req, res) {
    let userInformation = req.body;
    userInformation.id = shortid.generate();

    console.log({userInformation})
    //if user/bio is missing, return 400
    if(userInformation.name === null || userInformation.bio === null ||  userInformation.name === "" || userInformation.bio === ""){
        res.status(400).json({errorMessage: "Please provide a name and bio for the user."})
    } else if (!userInformation){ //if there's an error which saving user, return 500
        res.status(500).json({errorMessage: "There was an error while saving the user to the datatbase."})
    } else {
        users.push(userInformation);

    res.status(201).json(userInformation);
    }
    
})

server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const userI = users.filter((indUser) => indUser.id != id);
  if (id === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!users) {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  } else res.status(200).json(userI);
});

server.put("/api/users/:id", function (req, res) {
    const id = req.params.id;
    const newUser = req.body;
    const userID = users.filter((indU) => {
      if (indU.id == id) {
        return indU;
      }
    });
    console.log("userID", userID);
    if (!userID[0]) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else if (
      newUser.name === null ||
      newUser.name === "" ||
      newUser.bio === null ||
      newUser.bio === ""
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else if (!newUser) {
      return res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    } else {
        const userArray = users.filter((indU) => {
            if (indU.id != id) {
              return indU;
            }
          });
          userArray.push(newUser) 
          users = userArray
          return res.status(200).json(users);
    } 
});
  
  
  
  

server.listen(9000, () => console.log("n/== API IS UP ==/n"))