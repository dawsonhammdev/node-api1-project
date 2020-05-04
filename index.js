const express = require ('express')
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [
    {
     id: shortid.generate(), // hint: use the shortid npm package to generate it
     name: "Jane Doe", // String, required
     bio: "Not Tarzan's Wife, another Jane",  // String, required
    } 
 ]

server.get('/', (req, res) => {
    res.json({api: "Up and Running"})
})



server.get('/api/users', function (req, res) {
    

    res.json(users);
})

server.post('/api/users', function(req, res) {
    const userInformation = req.body;

    users.push(userInformation);

    res.status(201).json(userInformation);
})

server.delete('/api/users/:id', function(req, res) {
    const id = req.params.id;

    users = users.filter(user => user.id != id)
})

server.listen(9000, () => console.log("n/== API IS UP ==/n"))