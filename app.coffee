express = require 'express'
path = require 'path'
fs = require 'fs'
request = require 'request'
cheerio = require 'cheerio'

app = express()

app.get '/',(req,res)->
  res.sendFile(path.join(__dirname + '/index.html'))
  return

app.get '/team_api',(req,res)->
  res.sendFile(path.join(__dirname + '/api.json'))
  return

#app.get '/scrape',(req,res)->
#
#  url = 'http://www.nhl.com/schedule'
#
#  request url,(error, response, html)->
#    if !error
#      $ = cheerio.load(html)
#      json = {
#        homeTeam: '',
#        awayTeam: '',
#        date: '',
#        time: ''
#      }
#
#    return
#
#  return

# express.static is express' way of serving static files.
# index.html would not read these files correctly if we didn't use this

#allowCrossDomain = (req, res, next)->
#  res.header 'Access-Control-Allow-Origin', '*'
#  res.header 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'
#  res.header 'Access-Control-Allow-Headers', 'Content-Type'
#  next()
#  return

app.use '/css', express.static(__dirname + '/css')
app.use '/js', express.static(__dirname + '/js')
app.use '/images', express.static(__dirname + '/images')
app.use '/bower_components', express.static(__dirname + '/bower_components')
app.use '/node_modules', express.static(__dirname + '/node_modules')

#app.use allowCrossDomain

app.listen process.env.port || 3000

console.log 'Running at Port 3000'
