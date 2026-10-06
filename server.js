const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "requests.json");

// -------------------------
// Middleware
// -------------------------

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// -------------------------
// Helper Functions
// -------------------------

function readRequests() {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
}

function writeRequests(requests) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(requests, null, 2)
    );
}

// -------------------------
// GET all requests
// -------------------------

app.get("/api/requests", (req, res) => {

    const requests = readRequests();

    res.json(requests);
});

// -------------------------
// GET request by ID
// -------------------------

app.get("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const request = requests.find(
        item => item.id === id
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});

// -------------------------
// POST new request
// -------------------------

app.post("/api/requests", (req, res) => {

    const requests = readRequests();

    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;

    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newRequest = {

        id: Date.now(),

        studentName,

        email,

        category,

        description,

        priority,

        status: "Pending",

        createdAt: new Date().toISOString()

    };

    requests.push(newRequest);

    writeRequests(requests);

    res.status(201).json(newRequest);
});

// -------------------------
// PUT update request
// -------------------------

app.put("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex(
        item => item.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const {
        studentName,
        email,
        category,
        description,
        priority,
        status
    } = req.body;

    requests[index] = {

        ...requests[index],

        studentName,

        email,

        category,

        description,

        priority,

        status: status || requests[index].status

    };

    writeRequests(requests);

    res.json(requests[index]);
});

// -------------------------
// DELETE request
// -------------------------

app.delete("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const filteredRequests = requests.filter(
        item => item.id !== id
    );

    if (filteredRequests.length === requests.length) {

        return res.status(404).json({
            message: "Request not found"
        });

    }

    writeRequests(filteredRequests);

    res.json({
        message: "Request deleted successfully"
    });
});

// -------------------------
// Start Express Server
// -------------------------

app.listen(PORT, () => {

    console.log(
        `Campus Help Desk running at http://localhost:${PORT}`
    );

});