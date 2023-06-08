const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Get all the agent elements
const allAgents = document.querySelectorAll('.agent');

// Hide all agent elements
allAgents.forEach(agent => agent.style.display = 'none');
  
  // Clear previous search results
  searchResults.innerHTML = '';

  if (!searchTerm) {
    // If search term is empty, show all agents
    document.querySelectorAll('.agent').forEach(agent => agent.classList.remove('hidden'));
    return;
  }

  fetch(`/agents/${searchTerm}.json`)  // Fetch from agent-specific JSON file
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(agent => {  // You will get a single agent JSON object, not an array
    if (agent.name.toLowerCase() === searchTerm) {
      let resultsHtml = `
        <a href="${agent.url}" class="agent search-result-agent">
          <div class="agent-hover">
            <img src="${agent.image}" alt="${agent.name}">
            <div class="agent-info">
              <h2>${agent.name}</h2>
              <p>${agent.role}</p>
            </div>
          </div>
        </a>
      `;
      searchResults.innerHTML = resultsHtml;
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // If agent-specific JSON file is not found, clear the search results
    searchResults.innerHTML = '';
  });

});

function generateAgent() {
  const agents = [
    { name: "Jett", url: "agents/jett.html" },
    { name: "Raze", url: "agents/Raze.html" },
    { name: "Viper", url: "agents/viper.html" },
    { name: "Reyna", url: "agents/reyna.html" },
    { name: "Brimstone", url: "agents/brimstone.html" },
    { name: "Omen", url: "agents/omen.html" },
    { name: "Killjoy", url: "agents/killjoy.html" },
    { name: "Skye", url: "agents/skye.html" },
    { name: "Fade", url: "agents/fade.html" },
    { name: "Neon", url: "agents/neon.html" },
    { name: "Sage", url: "agents/sage.html" },
    { name: "Phoenix", url: "agents/phoenix.html" },
    { name: "Gekko", url: "agents/gekko.html" },
    { name: "KAY/O", url: "agents/kayo.html" },
    { name: "Yoru", url: "agents/yoru.html" },
    { name: "Cypher", url: "agents/cypher.html" },
    { name: "Sova", url: "agents/Sova.html" },
    { name: "Breach", url: "agents/breach.html" },
    { name: "Astra", url: "agents/astra.html" },
    { name: "Harbor", url: "agents/harbor.html" }
    // Add more agents as needed
  ];

  // Generate a random index to select a random agent
  const randomIndex = Math.floor(Math.random() * agents.length);

  // Get the URL of the randomly chosen agent
  const randomAgentUrl = agents[randomIndex].url;

  // Redirect the user to the randomly chosen agent's website
  window.location.href = randomAgentUrl;
}

// Find the generate button element and add an event listener
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generateAgent);
