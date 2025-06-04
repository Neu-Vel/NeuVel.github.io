const express = require('express');
const path = require('path');
const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, 'files')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'files', 'index.html'));
});

app.listen(port, '127.0.0.1', function() {
    console.log("сервер запущен на : http://localhost:%s", port);
});