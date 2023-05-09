const express = require('express');
const agents = require('./agents.json');

const app = express();


app.get('/api/search', (req, res) => {
    const searchTerm = req.query.searchTerm.toLowerCase();
    const results = agents.filter(agent => {
      const name = agent.name.toLowerCase();
      const role = agent.role.toLowerCase();
      return name.includes(searchTerm) || role.includes(searchTerm);
    });
    res.json(results);
  });