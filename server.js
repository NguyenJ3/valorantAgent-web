const express = require('express');
const path = require('path');
const agents = require('./public/api/agents.json');

const app = express();

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Serve the savedAgent page
app.get('/savedAgent', (req, res) => res.sendFile(path.join(__dirname, 'public/savedAgent.html')));

// Serve agent pages dynamically based on the agent name
app.get('/agents/:agentName', function (req, res) {
  const agentName = req.params.agentName.toLowerCase();
  const agent = agents.find(agent => agent.name.toLowerCase() === agentName);
  if (agent) {
    const agentFilePath = path.join(__dirname, `public/agents/${agentName}.html`);
    res.sendFile(agentFilePath);
  } else {
    res.status(404).send('Agent not found');
  }
});

// Serve the API search
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.searchTerm.toLowerCase();
  const filteredAgents = agents.filter(agent => agent.name.toLowerCase().includes(searchTerm) || agent.role.toLowerCase().includes(searchTerm));
  res.json(filteredAgents);
});

// Serve the search.js file
app.get('/search.js', (req, res) => {
  const searchJsPath = path.join(__dirname, 'public/api/search.js');
  res.sendFile(searchJsPath);
});

// Serve the CSS file
app.get('/css/style.css', (req, res) => {
  const cssFilePath = path.join(__dirname, 'public/css/style.css');
  res.sendFile(cssFilePath);
});

// serves new agent specfic json file data
app.get('/agents/:agentName.json', function (req, res) {
  const agentName = req.params.agentName.toLowerCase();
  const agent = agents.find(agent => agent.name.toLowerCase() === agentName);
  if (agent) {
    res.json(agent);
  } else {
    res.status(404).send('Agent not found');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
