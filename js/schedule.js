// Generated by CoffeeScript 1.10.0
(function() {
  var ajax_team_selection, next_game, team_chosen;

  team_chosen = '';

  ajax_team_selection = function(cb) {
    $.ajax({
      type: 'GET',
      url: '/team_api',
      dataType: 'json',
      success: function(data) {
        var i;
        i = 0;
        while (i < data.team.length) {
          if (data.team[i] === team_chosen) {
            team_chosen = data.abbrev[i];
            console.log('team chosen is: ' + team_chosen);
            break;
          }
          i++;
        }
        cb();
      },
      error: function() {
        alert('problem with json');
      }
    });
  };

  next_game = function() {
    var date, month, zero;
    console.log(team_chosen);
    date = new Date;
    month = date.getMonth() + 1;
    if (month < 10) {
      zero = '0';
      month = month.toString();
      month = zero.concat(month);
    } else {
      month = month.toString();
    }
    $.ajax({
      type: 'GET',
      url: 'http://nhlwc.cdnak.neulion.com/fs1/nhl/league/clubschedule/' + team_chosen + '/2016/' + month + '/iphone/clubschedule.json',
      dataType: 'json',
      success: function(data) {
        console.log('success!');
      },
      error: function() {
        alert('problem with json...');
      }
    });
  };

  $('#standings').on('click', '.team', function() {
    team_chosen = $(this).text();
    ajax_team_selection(next_game);
  });

}).call(this);
