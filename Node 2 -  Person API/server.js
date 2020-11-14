const express = require("express"); // Express
const bodyParser = require('body-parser'); // Response Parser

const app = express(); // Json instance

app.use(bodyParser.json()); // Middleware - parses when "req.body" is used

const PORT = 3000;      // Port Variable              

// Our list of people
let people = [{
    "id": 1,
    "name": "Atanas"
},
{
    "id": 2,
    "name": "Nick"
},
{
    "id": 3,
    "name": "Yusuf"
}];

// "/getAll" -> Returns the people array with the current people objects 
app.get('/people/getAll', (req, res) => {
    res.json(people);
})

// "getPersonById:Id" -> Returns the user with that distint Id
app.get('/people/getById/:Id', (req, res) => {
    const Id = req.params.Id // <- {Id:value}

    const Person = people.find(e => e.id == Id);

    if (Person) { res.json(Person) } else { res.send("Person not found") }
})

// "getPersonByName:Name" -> Returns the user with that distint Name
app.get('/people/getByName/:Name', (req, res) => {
    const { Name } = req.params // <- {Id:value}

    const Person = people.find(e => e.name == Name);

    console.log(people);
    if (Person) { res.json(Person) } else { res.send("Person not found") }
})

// "createPerson" -> Adds a new person to array of people using bodyParser and response body
app.post('/people/createPerson', (req, res) => {
    const Person = req.body

    people.push(Person)

    res.send("Person added successfully")
})

// "editName/:Id" -> Edits the name of a person associated with that Id 
app.post('/people/editName/:Id', (req, res) => {
    const { Id } = req.params
    const value = req.body

    people.forEach(e => {
        if (e.id == Id) {
            e.name = value.name;
        }
    });

    res.send("Person updated")
})

// deletePerson/:Id  -> Deletes person with distinct Id from list of people
app.delete('/people/deletePerson/:Id', (req, res) => {
    const { Id } = req.params

    people.forEach(e => {
        if (e.id == Id) {
            people.splice(e, 1)
        }
    });

    res.send("Person deleted")
})


// Start Listening on :3000
app.listen(PORT)

