const fetch = require('node-fetch');

const leagueId = '997862686069198848';
const matchupId = 1;
const apiURL = `https://api.sleeper.app/v1/league/${leagueId}/matchups/${matchupId}`;

async function fetchMatchupData() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const matchups = data;

    const rosterPoints = matchups.map((matchup) => ({
      roster_id: matchup.roster_id,
      points: matchup.points,
      median: 0,
    }));

    rosterPoints.sort((a, b) => b.points - a.points);

    for (let i = 0; i < Math.min(5, rosterPoints.length); i++) {
      rosterPoints[i].median = 0.5;
    }

    return rosterPoints; // Return the array
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle errors by returning null or an appropriate value
  }
}

async function main() {
  const result = await fetchMatchupData();
  
  if (result !== null) {
    // You can use the result array here
    console.log(result);
  }
}

main();
