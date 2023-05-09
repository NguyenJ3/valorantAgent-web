# valorantAgent-web
Valorant agent website


Requesting data from my microservice:
1) Send an http request (running it on my local machine not posted to global yet)
https://localhost:3000/api/search?searchTerm=<search-term>
 can replace Search term for the agent you want or on the website use the search engine to look up the agent will request from json query for the agent data
  
  
2) the service will respond with the data from the agents.json file
  
  
 Recieving data 
  
  1) Send HTTP post request to endpoint https://localhost:3000m/api/save
  
  2) The service will respond with the saved json file data
![Screenshot 2023-05-08 194306](https://user-images.githubusercontent.com/52763265/236980522-bcf4e990-72ad-4762-99fe-4e3cc96ba920.png)
