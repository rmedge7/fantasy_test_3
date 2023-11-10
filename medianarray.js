const fetch = require('node-fetch');

const matchupData = [
  // ... (paste the JSON array here)
];

function fetchMatchupData(data) {
  try {
    data.sort((a, b) => b.points - a.points);

    const rosterAssignment = [];

    const numTopRosters = 5;

    for (let i = 0; i < data.length; i++) {
      const rosterId = data[i].roster_id;
      const points = data[i].points;
      const assignment = i < numTopRosters ? 0.5 : 0;
      rosterAssignment.push({ roster_id: rosterId, points, assignment });
    }

    return rosterAssignment; // Return the array
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle errors by returning null or an appropriate value
  }
}

function main() {
  const result = fetchMatchupData(matchupData);

  if (result !== null) {
    // You can use the result array here
    console.log(result);
  }
}

main();
