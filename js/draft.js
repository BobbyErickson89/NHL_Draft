// Generated by CoffeeScript 1.10.0
(function() {
  var adjusted_percentage, click_counter, draft_api, final_pick, logos, lottery_teams, percentages, standings_table;

  lottery_teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  percentages = [0, 20, 13.5, 11.5, 9.5, 8.5, 7.5, 6.5, 6, 5, 3.5, 3, 2.5, 2, 1];

  logos = [];

  click_counter = 0;

  adjusted_percentage = 100;

  draft_api = function() {
    lottery_teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    percentages = [0, 20, 13.5, 11.5, 9.5, 8.5, 7.5, 6.5, 6, 5, 3.5, 3, 2.5, 2, 1];
    $.ajax({
      type: 'GET',
      url: 'http://app.cgy.nhl.yinzcam.com/V2/Stats/Standings',
      dataType: 'xml',
      success: function(data) {
        $(data).find('Standing').each(function() {
          var arrayPlacement, league_rank, stats, teamRecord, team_name, team_standing, tri_code;
          team_standing = $(this);
          team_name = team_standing.attr('Team');
          league_rank = team_standing.attr('LeagueRank');
          tri_code = team_standing.attr('TriCode');
          if (league_rank > 16) {
            arrayPlacement = league_rank - 1;
            lottery_teams.splice(arrayPlacement, 1, team_name);
            stats = $(this).find('StatsGroup:first-child');
            teamRecord = {
              team: team_name,
              gamesPlayed: stats.attr('Stat0'),
              wins: stats.attr('Stat1'),
              losses: stats.attr('Stat2'),
              overtimeLosses: stats.attr('Stat3'),
              points: stats.attr('Stat4'),
              leagueRanking: league_rank
            };
          }
        });
        lottery_teams = lottery_teams.slice(16, 30);
        lottery_teams = lottery_teams.reverse();
        standings_table();
      },
      error: function() {
        alert('An error occured while processing XML file');
      }
    });
  };

  draft_api();

  standings_table = function() {
    var draft_odds, i;
    i = 0;
    while (i < lottery_teams.length) {
      draft_odds = percentages[i + 1] / (adjusted_percentage / 100).toFixed(4);
      draft_odds = Math.round(draft_odds * 1000) / 1000;
      $('#standings').append('<tr><td class="team" id="team_standing">' + lottery_teams[i] + '</td><td class="odds">' + draft_odds + '%' + '</td></tr>');
      i++;
    }
  };

  final_pick = function() {
    var draft_odds, i, percentage, pick, team_image_link, team_name_chosen, team_name_split;
    percentage = Math.random();
    pick = (percentage * (adjusted_percentage * 2)) / 2;
    draft_odds = 0;
    i = 0;
    while (i < percentages.length) {
      draft_odds = draft_odds + percentages[i];
      if (pick > draft_odds && pick <= draft_odds + percentages[i + 1]) {
        team_name_split = lottery_teams[i].split(' ');
        team_name_chosen = team_name_split.join('_');
        team_image_link = "/images/" + team_name_chosen + ".svg";
        $('#draft_winner').empty();
        $('#draft_winner').append('<img id="team_img" src=' + team_image_link + '>');
        $('#draft_selection').append('<tr><td class="team">' + lottery_teams[i] + '</td></tr>');
        lottery_teams.splice(i, 1);
        percentages.splice(-1, 1);
        adjusted_percentage = adjusted_percentage - percentages[i + 1];
        $('#standings').empty();
        standings_table();
        $('#team_img').attr('src', team_image_link).load(function() {
          $(this).css('width', '200px');
          return $(this).css('height', '200px');
        });
        break;
      }
      i++;
    }
  };

  $('#draft_button').click(function() {
    var i;
    final_pick();
    click_counter++;
    if (click_counter >= 3) {
      $('#draft_button').prop('disabled', true);
      i = 0;
      while (i < lottery_teams.length) {
        $('#draft_selection').append('<tr><td class="team">' + lottery_teams[i] + '</td></tr>');
        i++;
      }
    }
  });

  $('#reset_button').click(function() {
    $('#draft_selection').empty();
    $('#draft_winner').empty();
    $('#standings').empty();
    $('#draft_button').prop('disabled', false);
    draft_api();
    click_counter = 0;
    adjusted_percentage = 100;
  });

}).call(this);
