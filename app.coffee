express = require 'express'
app = express()
path = require 'path'

app.get '/',(req,res)->
  res.sendFile(path.join(__dirname + '/index.html'))
  return

app.get '/team_api',(req,res)->
  res.sendFile(path.join(__dirname + '/team_api.html'))
  return

# express.static is express' way of serving static files.
# index.html would not read these files correctly if we didn't use this
app.use '/css', express.static(__dirname + '/css')
app.use '/js', express.static(__dirname + '/js')
app.use '/images', express.static(__dirname + '/images')
app.use '/bower_components', express.static(__dirname + '/bower_components')

app.listen 3000

console.log 'Running at Port 3000'
