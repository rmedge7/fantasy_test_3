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
    const matchups = data.matchups;

    const rosterPoints = matchups.map((matchup, index) => ({
      roster_id: matchup.roster_id,
      points: matchup.points,
      median: index < 5 ? 0.5 : 0
    }));

    // Sort the array in descending order by points
    rosterPoints.sort((a, b) => b.points - a.points);

    return rosterPoints; // Return the array with median values
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle errors by returning null or an appropriate value
  }
}

async function main() {
  const result = await fetchMatchupData();

  if (result !== null) {
    // You can use the result array with median values here
    console.log(result);
  }
}

main();
