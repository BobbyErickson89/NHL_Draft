logos = ['ANA','ARI','BOS','BUF','CAR','CBJ','CGY','CHI','COL','DAL','DET','EDM','FLA','LAK','MIN','MTL','NJD','NSH','NYI','NYR','OTT','PHI','PIT','SJS','STL','TBL','TOR','VAN','WPG','WSH']

teams = {
  team_name: ['Anaheim Duck', 'Arizona Coyotes', 'Boston Bruins', 'Buffalo Sabres', 'Carolina Hurricanes', 'Columbus Blue Jackets','Calgary Flames', 'Chicago Blackhawks', 'Colorado Avalanche', 'Dallas Stars', 'Detroit Red Wings', 'Edmonton Oilers','Florida Panthers', 'Los Angeles Kings', 'Minnesota Wild', 'Montreal Candiens', 'New Jersey Devils', 'Nashville Predators','New York Islanders', 'New York Rangers', 'Ottawa Senators', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'San Jose Sharks','St Louis Blues', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Vancouver Canucks', 'Winnipeg Jets', 'Washington Capitals']
  abbrev: logos
}

teams = JSON.stringify(teams)

$('#api').append(teams)
