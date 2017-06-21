// Generated by CoffeeScript 1.12.6
(function() {
  var todays_date, todays_time, yesterday;

  todays_date = moment().format('YYYY-MM-DD');

  todays_time = moment().format('a');

  yesterday = moment().add(-1, 'days');

  yesterday = yesterday.format('YYYY-MM-DD');

  if (todays_time === 'pm') {
    $.getScript('http://live.nhle.com/GameData/GCScoreboard/' + todays_date + '.jsonp?callback=loadScoreboard');
  } else {
    $.getScript('http://live.nhle.com/GameData/GCScoreboard/' + yesterday + '.jsonp?callback=loadScoreboard');
  }

  window.loadScoreboard = function(data) {
    var game, i, individual_game, j, len, len1, ref, todays_games;
    todays_games = [];
    ref = data.games;
    for (i = 0, len = ref.length; i < len; i++) {
      game = ref[i];
      individual_game = {};
      individual_game.home = game.hta;
      individual_game.away = game.ata;
      individual_game.time = game.bs;
      individual_game.hts = game.hts;
      individual_game.ats = game.ats;
      todays_games.push(individual_game);
    }
    for (j = 0, len1 = todays_games.length; j < len1; j++) {
      game = todays_games[j];
      $('#scoreboard').append('<div class=\"game\"><div class=\"away_team\">' + game.away + '<p class=\"ats\">' + game.ats + '</p>' + '</div><div class=\"home_team\">' + game.home + '<p class=\"hts\">' + game.hts + '</p>' + '</div><div class=\"time\">' + game.time + '</div></div>');
    }
  };

}).call(this);
