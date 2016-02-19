team_chosen = ''
#team_abbrev = []

ajax_team_selection = (cb)->
  $.ajax
    type: 'GET'
    url: '/team_api'
    dataType: 'json'
    success: (data)->
      i = 0
      while i < data.team.length
        if data.team[i] == team_chosen
          team_chosen = data.abbrev[i]
          console.log 'team chosen is: ' + team_chosen
#          team_abbrev = []
#          team_abbrev.push(team_chosen)
          break
        i++
      cb()
      return
    error:->
      alert('problem with json')
      return

  return

next_game = ->
  console.log team_chosen
  date = new Date
  month = date.getMonth() + 1
  if month < 10
    zero = '0'
    month = month.toString()
    month = zero.concat(month)
  else
    month = month.toString()

  $.ajax
    type: 'GET'
    url: 'http://nhlwc.cdnak.neulion.com/fs1/nhl/league/clubschedule/' + team_chosen + '/2016/' + month + '/iphone/clubschedule.json'
    dataType: 'json'
#    crossDomain: true
    success: (data)->
      console.log 'success!'
      return
    error: ->
      alert('problem with json...')
      return

  return

$('#standings').on 'click','.team', ->

  team_chosen = $(@).text()
  ajax_team_selection(next_game)

  return