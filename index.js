const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const mostWins = require("./ipl/mostWins");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunsConcededByEachTeamIn2016 = require("./ipl/extraRunsConcededByEachTeamIn2016");
const tenEconomicalBowlersOf2015 = require("./ipl/tenEconomicalBowlersOf2015");
const tossWinningTeamPerYear = require("./ipl/tossWinningTeamPerYear");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
    csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {   
        let result={};  
      result.matchesPlayedPerYear = matchesPlayedPerYear(matches);
      result.mostWins = mostWins(matches);
      result.matchesWonByEachTeam = matchesWonByEachTeam(matches);
      result.tossWinningTeamPerYear = tossWinningTeamPerYear(matches);
      
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          result.extraRunsConcededByEachTeamIn2016 = extraRunsConcededByEachTeamIn2016(deliveries, matches);
          result.tenEconomicalBowlersOf2015 = tenEconomicalBowlersOf2015(deliveries, matches);
          saveMatchesPlayedPerYear(result);
        });
        
        
    });
}

function saveMatchesPlayedPerYear(result) {
  const jsonData = {
    matchesPlayedPerYear: result.matchesPlayedPerYear,
    mostWins: result.mostWins,
    matchesWonByEachTeam: result.matchesWonByEachTeam,
    extraRunsConcededByEachTeamIn2016: result.extraRunsConcededByEachTeamIn2016,
    tenEconomicalBowlersOf2015: result.tenEconomicalBowlersOf2015,
    tossWinningTeamPerYear: result.tossWinningTeamPerYear
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
