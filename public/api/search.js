const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    // If search term is empty, show all agents
    document.querySelectorAll('.agent').forEach(agent => agent.classList.remove('hidden'));
    searchResults.innerHTML = '';
    return;
  }
  fetch(`/api/search?searchTerm=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      let resultsHtml = '';
      data.forEach(agent => {
        resultsHtml += `
          <a href="${agent.url}" class="agent">
            <div>
              <img src="${agent.image}" alt="${agent.name}">
              <h2>${agent.name}</h2>
              <p>${agent.role}</p>
            </div>
          </a>
        `;
      });
      searchResults.innerHTML = resultsHtml;

      // Hide agents that do not match the search results
      document.querySelectorAll('.agent').forEach(agent => {
        if (!agent.querySelector('h2').textContent.toLowerCase().includes(searchTerm)) {
          agent.classList.add('hidden');
        } else {
          agent.classList.remove('hidden');
        }
      });
    })
    .catch(error => console.error(error));
});

function generateAgent() {
  document.getElementById('generate-button').addEventListener('click', generateAgent);
  const agents = [
    { name: "Jett", url: "agents/jett.html" },
    { name: "Raze", url: "agents/Raze.html" },
    { name: "Viper", url: "agents/viper.html" }
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