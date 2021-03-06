express = require 'express'
path = require 'path'
fs = require 'fs'
request = require 'request'
cheerio = require 'cheerio'

app = express()

app.listen process.env.PORT || 3000

app.get '/',(req,res)->
  res.sendFile(path.join(__dirname + '/index.html'))
  return

app.get '/team_api',(req,res)->
  res.sendFile(path.join(__dirname + '/api.json'))
  return

app.use '/css', express.static(__dirname + '/css')
app.use '/js', express.static(__dirname + '/js')
app.use '/images', express.static(__dirname + '/images')
app.use '/node_modules', express.static(__dirname + '/node_modules')


console.log 'Running at Port 3000'
