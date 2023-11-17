// Function to make an HTTP GET request to the API endpoint for a specific week
const fetchWeekData = (week) => {
  const url = `https://api.sleeper.app/v1/league/997862686069198848/matchups/${week}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok for week ${week}`);
      }
      return response.json(); // Parse the JSON data
    });
};

// Object to store total true_med values for each roster_id
const totalTrueMedByRoster = {};

// Iterate over all 14 weeks
for (let week = 1; week <= 14; week++) {
  fetchWeekData(week)
    .then(jsonResponse => {
      // Create an array to store roster_id, points, and true_med for the current week
      const rosterPointsArray = [];

      // Iterate over each entry in the JSON response for the current week
      jsonResponse.forEach(entry => {
        // Extract roster_id and points from the entry
        const { roster_id, points } = entry;

        // Push the data as an object to the array
        rosterPointsArray.push({ roster_id, points });
      });

      // Sort the array by points in descending order for the current week
      rosterPointsArray.sort((a, b) => b.points - a.points);

      // Calculate weekly_med (median value of points) for the current week
      const mid = Math.floor(rosterPointsArray.length / 2);
      const weekly_med = rosterPointsArray.length % 2 !== 0
        ? rosterPointsArray[mid].points
        : (rosterPointsArray[mid - 1].points + rosterPointsArray[mid].points) / 2;

      // Assign values to the true_med column based on weekly_med for the current week
      rosterPointsArray.forEach(entry => {
        entry.true_med = entry.points > weekly_med ? 0.5 : 0;
      });

      // Log the resulting array for the current week
      console.log(`Week ${week} Data:`, rosterPointsArray);

      // Update total true_med values for each roster_id
      rosterPointsArray.forEach(entry => {
        if (!totalTrueMedByRoster[entry.roster_id]) {
          totalTrueMedByRoster[entry.roster_id] = 0;
        }
        totalTrueMedByRoster[entry.roster_id] += entry.true_med;
      });
    })
    .catch(error => {
      console.error(`There was a problem with the fetch operation for week ${week}:`, error);
    });
}

// Log the total true_med values for each roster_id
console.log('Total true_med values by roster_id:', totalTrueMedByRoster);
