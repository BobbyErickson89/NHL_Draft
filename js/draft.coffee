lottery_teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
percentages = [0, 20, 13.5, 11.5, 9.5, 8.5, 7.5, 6.5, 6, 5, 3.5, 3, 2.5, 2, 1]
logos = ['ANA','ARI','BOS','BUF','CAR','CBJ','CGY','CHI','COL','DAL','DET','EDM','FLA','LAK','MIN','MTL','NJD','NSH','NYI','NYR','OTT','PHI','PIT','SJS','STL','TBL','TOR','VAN','WPG','WSH']

click_counter = 0
adjusted_percentage = 100

draft_api = ->
  lottery_teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  percentages = [0, 20, 13.5, 11.5, 9.5, 8.5, 7.5, 6.5, 6, 5, 3.5, 3, 2.5, 2, 1]

  $.ajax
    type: 'GET'
    url: 'http://app.cgy.nhl.yinzcam.com/V2/Stats/Standings'
    dataType: 'xml'
    success: (data)->
      $(data).find('Standing').each ->
        team_standing = $(this)
        team_name = team_standing.attr('Team')
        league_rank = team_standing.attr('LeagueRank')
        tri_code = team_standing.attr('TriCode')

        if league_rank > 16
          arrayPlacement = league_rank - 1
          lottery_teams.splice(arrayPlacement, 1, team_name)
          logos.push(tri_code)

          stats = ($(this).find('StatsGroup:first-child'))

          teamRecord = {
            team: team_name
            gamesPlayed: stats.attr('Stat0'),
            wins: stats.attr('Stat1')
            losses: stats.attr('Stat2')
            overtimeLosses: stats.attr('Stat3')
            points: stats.attr('Stat4')
            leagueRanking: league_rank
          }
        return

      lottery_teams = lottery_teams.slice(16, 30)
      lottery_teams = lottery_teams.reverse()

      standings_table()
      return
    error: ->
      alert('An error occured while processing XML file')
      return
  return

draft_api()

standings_table = ->
  i = 0
  while i < lottery_teams.length
    draft_odds = percentages[i + 1] / (adjusted_percentage / 100).toFixed(4)
    draft_odds = Math.round(draft_odds * 1000) / 1000
    $('#standings').append('<tr><td class="team" id="team_standing">' + lottery_teams[i] + '</td><td class="odds">' + draft_odds + '%' +  '</td></tr>')
    i++
  return

final_pick = ->
  console.log lottery_teams
  percentage = Math.random()
  console.log adjusted_percentage
  pick = (percentage * (adjusted_percentage * 2)) / 2
  draft_odds = 0
  i = 0

  console.log 'test'

  while i < percentages.length
    draft_odds = draft_odds + percentages[i]

    if pick > draft_odds and pick <= draft_odds + percentages[i + 1]
      team_name_split = (lottery_teams[i].split(' '))
      team_name_chosen = team_name_split.join('_')
      team_image_link = "images/" + team_name_chosen + ".svg"

      $('#draft_winner').empty()
      $('#draft_winner').append('<img id="team_img" src=' + team_image_link + '>')

      $('#draft_selection').append('<tr><td class="team">' + lottery_teams[i] + '</td></tr>')

      # removes the selected winning team from the lottery_teams array
      lottery_teams.splice(i, 1)
      # removes the last element of the percentages array
      percentages.splice(-1, 1)

      adjusted_percentage = adjusted_percentage - percentages[i + 1]
      console.log lottery_teams
      console.log percentages[i + 1]

      $('#standings').empty()
      standings_table()

      #resizing images that are too big or too small to 260px x 260px
      $('#team_img').attr('src', team_image_link).load ->
        $(@).css('width', '200px')
        $(@).css('height', '200px')

      break
    i++
  return


$('#draft_button').click ->
  final_pick()

  # incrementing click_counter each time #draft_button is clicked.
  # Once the click counter is at 3, #draft_button is disabled.
  click_counter++
  if click_counter >= 3
    $('#draft_button').prop('disabled', true)

    i = 0
    while i < lottery_teams.length
      $('#draft_selection').append('<tr><td class="team">' + lottery_teams[i] +  '</td></tr>')
      i++

  return

$('#reset_button').click ->
  $('#draft_selection').empty()
  $('#draft_winner').empty()
  $('#standings').empty()
  $('#draft_button').prop('disabled', false)

  draft_api()

  click_counter = 0
  adjusted_percentage = 100

  return
