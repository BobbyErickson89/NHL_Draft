$(document).ready(function(){
  $('#standings').append('<ol></ol>');//making the ul element for the html file.

  var lottery_teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  $.ajax({ //making ajax calls to our xml url that has the NHL standings
    type: 'GET',
    url: 'http://app.cgy.nhl.yinzcam.com/V2/Stats/Standings',
    dataType: 'xml',

    success: function(data){
      $(data).find('Standing').each(function(){
        var team_standing = $(this);
        var team_name = team_standing.attr('Team');
        var league_rank = team_standing.attr('LeagueRank');
        if (league_rank > 16){
          var arrayPlacement = league_rank - 1;
          lottery_teams.splice(arrayPlacement, 1, team_name);//putting each team into our lottery_teams array based on their league ranking
        }
      });

      lottery_teams = lottery_teams.slice(16, 30);//this is taking the non-playoff teams out of our array and then setting them to lottery_teams
      lottery_teams = lottery_teams.reverse();//reversing our lottery_teams array so that the last place team is first in the array.

      for (var i = 0; i < lottery_teams.length; i++){//this for loop is taking each item in our array and placing it in our HTML.
        $('<li></li>').html(lottery_teams[i]).appendTo('#standings ol');
      }

      function final_pick(){
        var percentage = Math.random();
        var pick = (percentage * 200) / 2;
        console.log(pick);

        var percentages = [0, 20, 13.5, 11.5, 9.5, 8.5, 7.5, 6.5, 6, 5, 3.5, 3, 2.5, 2, 1];

        var draft_odds = 0;

        for(var i = 0; i < percentages.length; i++){
          draft_odds = draft_odds + percentages[i];
          console.log(draft_odds);

          if(pick > draft_odds && pick <= (draft_odds + percentages[i + 1])){
            console.log(lottery_teams[i]);
          }
        }
      }

      $('#draft_button').click(function(){
        final_pick();
      });
    },

    error: function() {
      alert('An error occured while processing XML file');
    }
  });

});
