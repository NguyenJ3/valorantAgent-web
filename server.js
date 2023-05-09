const express = require('express');
const path = require('path');
const agents = require('./public/api/agents.json');


const app = express();

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Serve the Jett page
app.get('/jett', function (req, res) {
  res.sendFile(path.join(__dirname, 'agents/jett.html'));
});

//serve the api search
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.searchTerm.toLowerCase();
  const filteredAgents = agents.filter(agent => agent.name.toLowerCase().includes(searchTerm) || agent.role.toLowerCase().includes(searchTerm));
  res.json(filteredAgents);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});