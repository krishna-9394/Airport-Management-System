const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));



const pilotTableHeaders = ["Flight ID", "Pilot ID", "From", "To Cities", "Arrival", "DepartureTimes", "Staff ID", "Staff Name", "Contact No"];

const staffTableHeaders = ["Flight ID", "Pilot ID", "From", "To Cities", "Arrival", "DepartureTimes", "Passenger Name", "Passenger ID", "Staff ID"];

const passengerTableHeaders = ["Ticket ID", "Flight ID", "Passenger ID", "Passenger Name", "Contact No", "From", "To Cities", "Arrival", "DepartureTimes"];

class pilotTableData
{
    constructor (flightID, pilotID, from, toCities, arrival, departureTime, staffID, staffName, contactNo)
    {
        this.flightID = flightID;
        this.pilotID = pilotID;
        this.from = from;
        this.toCities = toCities;
        this.arrival = arrival;
        this.departureTime = departureTime;
        this.staffID = staffID;
        this.staffName = staffName;
        this.contactNo = contactNo;
    }
};

class staffTableData
{
    constructor (flightID, pilotID, from, toCities, arrival, departureTime, passengerName, passengerID, staffID)
    {
        this.flightID = flightID;
        this.pilotID = pilotID;
        this.from = from;
        this.toCities = toCities;
        this.arrival = arrival;
        this.departureTime = departureTime;
        this.passengerName = passengerName;
        this.passengerID = passengerID;
        this.staffID = staffID;
    }
};

class passengerTableData
{
    constructor (ticketID, flightID, passengerID, passengerName, contactNo, from, toCities, arrival, departureTime)
    {
        this.ticketID = ticketID;
        this.flightID = flightID;
        this.passengerID = passengerID;
        this.passengerName = passengerName;
        this.contactNo = contactNo;
        this.from = from;
        this.toCities = toCities;
        this.arrival = arrival;
        this.departureTime = departureTime;
    }
};

const passengerTableDatas = [];

const pilotTableDatas = [];

const staffTableDatas = [];






function addDataToPilotTable()
{
    //push the data like this to add it into table
    pilotTableDatas.push(new pilotTableData(
        123, 111, 'India', 'China', 2, 8, 121, 'ABCSTAFF', 91102
    ));
}

addDataToPilotTable();
//TODO: function add data to staff table

//TODO: function add data to passenger table




app.get("/", function (req, res)
{
    res.render("index");
});


var message = "";


app.get("/:root", function (req, res)
{
    if (req.params.root == 'pilotTable')
    {
        res.render("tablePage", { title: "Pilot Table", tableHeaders: pilotTableHeaders, tableDatas: pilotTableDatas });
    }
    else if (req.params.root == 'staffTable')
    {
        res.render("tablePage", { title: "Staff Table", tableHeaders: staffTableHeaders, tableDatas: staffTableDatas });
    }
    else if (req.params.root == 'passengerTable')
    {
        res.render("tablePage", { title: "Passenger Table", tableHeaders: passengerTableHeaders, tableDatas: passengerTableDatas });
    }
    else
    {
        res.render("formPage", { root: req.params.root, message: message });
    }
});



app.post('/:root', function (req, res)
{
    if (req.params.root == 'admin')
    {
        console.log('Admin form recieved');
        console.log(req.body);
        var username = req.body.username;
        var password = req.body.password;
        var isAdmin = false;
        connection.query('SELECT username FROM admin where username = ?', [username], function (err, result)
        {
            if (err) throw err;
            else if (result.length == 0)
            {
                message = "user does not exists!";
                res.render("formPage", { root: 'admin', message: message });
            } else
            {
                message = "user exists...";
            }
        });
        connection.query('SELECT username FROM admin where username = ? AND password = ?', [username, password], (err, result) =>
        {
            if (err) console.log(err.message);
            else if (result.length == 0)
            {
                // you have to display the message in the near the input tag
                message = "Invalid login credentials!";
                res.render("formPage", { root: 'admin', message: message });
            } else
            {
                message = "Successful login!";
                res.render("formPage", { root: 'query', message: message });
            }
        });
    }
    else if (req.params.root == 'pilot')
    {
        var name = req.body.username;
        var pilot_id = req.body.pilotID;
        var isPilot = false;
        console.log('pilot form recieved');
        console.log(req.body);
        connection.query('SELECT * FROM Pilot where Name = ? AND Pilot_id = ?', [name, pilot_id], (err, result) =>
        {
            if (err) console.log(err.message);
            else if (result.length == 0)
            {
                // you have to display the message in the near the input tag
                message = "Invalid login credentials!";
                res.send({ message: message });
                // res.render("formPage",{root: 'admin',message: message});
            } else
            {
                message = "Successful login!";
                isPilot = true;
                // res.send({ message: message });
                // res.render("formPage",{root: 'query',message: ""});
            }
            if (isPilot)
            {
                connection.query('select * from pilot where Pilot_id=?', [pilot_id], (err, result) =>
                {
                    if (err) console.log(err.message);
                    else if (result.length == 0)
                    {
                        message = "No data to display!";
                        res.send({ message: message });
                    } else
                    {
                        res.send(result);
                    }
                });
            }
        });
    }
    else if (req.params.root == 'staff')
    {
        var name = req.body.username;
        var staff_id = req.body.staffID;
        var isStaff = false;
        console.log('staff form recieved');
        console.log(req.body);
        connection.query('SELECT * FROM Staff where Name = ? AND Staff_id = ?', [name, staff_id], (err, result) =>
        {
            if (err) console.log(err.message);
            else if (result.length == 0)
            {
                // you have to display the message in the near the input tag
                message = "Invalid login credentials!";
                res.send({ message: message });
                // res.render("formPage",{root: 'admin',message: message});
            } else
            {
                message = "Successful login!";
                isStaff = true;
                // res.send({ message: message });
                // res.render("formPage",{root: 'query',message: ""});
            }
            if (isStaff)
            {
                connection.query('select * from staff where Staff_id= ?', [staff_id], (err, result) =>
                {
                    if (err) console.log(err.message);
                    else if (result.length == 0)
                    {
                        message = "No data to display!";
                        res.send({ message: message });
                    } else
                    {
                        res.send(result);
                    }
                });
            }
        });
    }
    else if (req.params.root == 'passenger')
    {
        var name = req.body.username;
        var ticket_id = req.body.ticketID;
        var isStaff = false;
        console.log('staff form recieved');
        console.log(req.body);
        connection.query('select Ticket.Passenger_id, Ticket.Ticket_id,Passenger.Name from Ticket, Passenger where Passenger.Passenger_id=Ticket.Passenger_id and Passenger.Name = ? and Ticket.Ticket_id = ?;', [name, ticket_id], (err, result) =>
        {
            if (err) console.log(err.message);
            else if (result.length == 0)
            {
                // you have to display the message in the near the input tag
                message = "Invalid login credentials!";
                res.send({ message: message });
            } else
            {
                message = "Successful login!";
                isStaff = true;
            }
            if (isStaff)
            {
                connection.query('select * from user where Ticket_id = ?', [ticket_id], (err, result) =>
                {
                    if (err) console.log(err.message);
                    else if (result.length == 0)
                    {
                        message = "No data to display!";
                        res.send({ message: message });
                    } else
                    {
                        res.send(result);
                    }
                });
            }
        });
        console.log('passenger form received');
        console.log(req.body);
    }
    else if (req.params.root == 'pilotTable')
    {
        res.redirect('/pilotTable');
    }
    else if (req.params.root == 'staffTable')
    {
    }
    else if (req.params.root == 'passengerTable')
    {
    }



    else if (req.params.root == 'query' || req.params.root == 'result')
    {
        // whenever i call another query it gives error;
        console.log("hii");
        var query = req.body.query;
        console.log(query);
        connection.query(query, (err, result) =>
        {
            if (err)
            {
                res.render("formPage", { root: 'display', message: err.message });
                // you have to display the message in the alert box
                console.log({ status: 402, message: err.message });
            }
            else if (result.length == 0)
            {
                res.render("formPage", { root: 'display', message: "No data to Display" });
                // you have to display the message in the alert box
                console.log({ status: 200, message: "No data to Display" });
            }
            else
            {
                console.log(result.length);
                var message = "";
                for (var i = 0; i < result.length; i++)
                {
                    message = message + result[i].data + "\n";
                    // you have to display the message in the alert box
                    console.log({ status: 200, data: result[i] });
                }
                // here message is the json data to be printed in the output
                res.render("formPage", { root: 'display', message: message });
            }
        });
    }
    else res.render("formPage", { root: 'admin' });
});





app.listen(3000, function ()
{
    console.log("Server started on port 3k");

});

function adminThings()
{

}




