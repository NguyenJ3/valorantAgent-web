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