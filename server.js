const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Serve the Jett page
app.get('/jett', function (req, res) {
  res.sendFile(path.join(__dirname, 'agents/jett.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});