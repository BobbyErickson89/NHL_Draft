todays_date = moment().format('YYYY-MM-DD')
todays_time = moment().format('a')
yesterday = moment().add -1, 'days'
yesterday = yesterday.format('YYYY-MM-DD')


#like an ajax call, but this is just getting the script from this url
if todays_time is 'pm'
  $.getScript 'http://live.nhle.com/GameData/GCScoreboard/' + todays_date + '.jsonp?callback=loadScoreboard'
else
  $.getScript 'http://live.nhle.com/GameData/GCScoreboard/' + yesterday + '.jsonp?callback=loadScoreboard'

#window.loadScoreboard is a workaround for NHL's API that doesn't allow cross domain access
window.loadScoreboard = (data)->
  todays_games = []

  for game in data.games
    individual_game = {}
    individual_game.home = game.hta
    individual_game.away = game.ata
    individual_game.time = game.bs
    individual_game.hts = game.hts
    individual_game.ats = game.ats
    todays_games.push(individual_game)

  for game in todays_games
    $('#scoreboard').append('<div class=\"game\"><div class=\"away_team\">' + game.away +
    '<p class=\"ats\">' + game.ats + '</p>' +
    '</div><div class=\"home_team\">' + game.home +
    '<p class=\"hts\">' + game.hts + '</p>' + '</div><div class=\"time\">' + game.time + '</div></div>')

  return
