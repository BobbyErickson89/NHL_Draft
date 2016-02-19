todays_date = moment().format('YYYY-MM-DD')

#like an ajax call, but this is just getting the script from this url
$.getScript 'http://live.nhle.com/GameData/GCScoreboard/' + todays_date + '.jsonp?callback=loadScoreboard'

#window.loadScoreboard is a workaround for NHL's API that doesn't allow cross domain access
window.loadScoreboard = (data)->
  todays_games = []

  console.log data.games

  for game in data.games
    individual_game = {}
    individual_game.home = game.ata
    individual_game.away = game.hta
    individual_game.time = game.bs
    todays_games.push(individual_game)

  for game in todays_games
    $('#scoreboard').append('<div class=\"game\"><div class=\"away_team\">' + game.away +
        '</div><div class=\"home_team\">' + game.home + '</div><div class=\"time\">' + game.time + '</div></div>')

  return