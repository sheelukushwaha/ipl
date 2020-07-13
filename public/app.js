function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
    
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam);
  visualizeExtraRunsConcededByEachTeamIn2016(data.extraRunsConcededByEachTeamIn2016);
  visualizeTenEconomicalBowlersOf2015(data.tenEconomicalBowlersOf2015);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function visualizeMatchesWonByEachTeam(matchesWonByEachTeam) {
  const seriesData = [];
  const cat=[];
  const winners=[];
  for (let year in matchesWonByEachTeam) {
      const winningTeams={};
      cat.push(year);   
      
      winningTeams.data=[];
      for(let winner in matchesWonByEachTeam[year]){
          if(!winners.includes(winner) && winningTeams.name == undefined){
              winners.push(winner);
              winningTeams.name=winner;
          }
          winningTeams.data.push([year, matchesWonByEachTeam[year][winner]])
      }
      seriesData.push(winningTeams);
    }

Highcharts.chart("matches-won-by-each-team", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches won by each team over all the years of IPL"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        categories: cat
    },

    yAxis: {
        allowDecimals: true,
        min: 0.0,
        title: {
            text: 'Matches'
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>' +
                'Total: ' + this.point.stackTotal;
        }
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },


    series: seriesData
  });
}


function visualizeExtraRunsConcededByEachTeamIn2016(extraRunsConcededByEachTeamIn2016) {
  const seriesData = [];
  for (let year in extraRunsConcededByEachTeamIn2016) {
    seriesData.push([year, extraRunsConcededByEachTeamIn2016[year]]);
  }



  Highcharts.chart("extra-run-conceded-by-each-team-of-2016", {
    chart: {
      type: "column"
    },
    title: {
      text: "For the year 2016, plot the extra runs conceded by each team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData
      }
    ]
  });
}



function visualizeTenEconomicalBowlersOf2015(tenEconomicalBowlersOf2015) {
  let seriesData = [];
  for (let year in tenEconomicalBowlersOf2015) {
    seriesData.push([year, tenEconomicalBowlersOf2015[year].economuRate]);
  }
  seriesData = seriesData.sort((a, b) => b[1] - a[1]).slice(0, 11);
  Highcharts.chart("ten-econommical-blowers-of-2015", {
    chart: {
      type: "column"
    },
    title: {
      text: "For the year 2015, plot the top 10 economical bowlers along with their economy rates"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData
      }
    ]
  });
}
