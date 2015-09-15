// Generated by CoffeeScript 1.10.0
(function() {
  var final_pick, lottery_teams, percentages;

  lottery_teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  percentages = [0, 20, 13.5, 11.5, 9.5, 8.5, 7.5, 6.5, 6, 5, 3.5, 3, 2.5, 2, 1];

  $.ajax({
    type: 'GET',
    url: 'http://app.cgy.nhl.yinzcam.com/V2/Stats/Standings',
    dataType: 'xml',
    success: function(data) {
      var i;
      $(data).find('Standing').each(function() {
        var arrayPlacement, league_rank, team_name, team_standing;
        team_standing = $(this);
        team_name = team_standing.attr('Team');
        league_rank = team_standing.attr('LeagueRank');
        if (league_rank > 16) {
          arrayPlacement = league_rank - 1;
          lottery_teams.splice(arrayPlacement, 1, team_name);
        }
      });
      lottery_teams = lottery_teams.slice(16, 30);
      lottery_teams = lottery_teams.reverse();
      i = 0;
      while (i < lottery_teams.length) {
        $('#standings').append('<tr><td class="team">' + lottery_teams[i] + '</td><td class="odds">' + percentages[i + 1] + '%' + '</td></tr>');
        i++;
      }
    },
    error: function() {
      alert('An error occured while processing XML file');
    }
  });

  final_pick = function() {
    var draft_odds, i, percentage, pick;
    percentage = Math.random();
    pick = (percentage * 200) / 2;
    draft_odds = 0;
    console.log(pick);
    i = 0;
    while (i < percentages.length) {
      draft_odds = draft_odds + percentages[i];
      if (pick > draft_odds && pick <= draft_odds + percentages[i + 1]) {
        $('#draft_winner').empty();
        $('#draft_winner').append(lottery_teams[i]);
      }
      i++;
    }
  };

  $('#draft_button').click(function() {
    final_pick();
  });

}).call(this);
