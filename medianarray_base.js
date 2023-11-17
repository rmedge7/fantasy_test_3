// Make an HTTP GET request to the API endpoint
fetch('https://api.sleeper.app/v1/league/997862686069198848/matchups/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(jsonResponse => {
    // Create an array to store roster_id, points, and true_med
    const rosterPointsArray = [];

    // Iterate over each entry in the JSON response
    jsonResponse.forEach(entry => {
      // Extract roster_id and points from the entry
      const { roster_id, points } = entry;

      // Push the data as an object to the array
      rosterPointsArray.push({ roster_id, points });
    });

    // Sort the array by points in descending order
    rosterPointsArray.sort((a, b) => b.points - a.points);

    // Calculate weekly_med (median value of points)
    const mid = Math.floor(rosterPointsArray.length / 2);
    const weekly_med = rosterPointsArray.length % 2 !== 0
      ? rosterPointsArray[mid].points
      : (rosterPointsArray[mid - 1].points + rosterPointsArray[mid].points) / 2;

    // Assign values to the true_med column based on weekly_med
    rosterPointsArray.forEach(entry => {
      entry.true_med = entry.points > weekly_med ? 0.5 : 0;
    });

    // Log the resulting array
    console.log(rosterPointsArray);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
