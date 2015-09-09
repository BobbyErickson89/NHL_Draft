function nhl(){

  team_percents = [];

  $.ajax({ //making ajax calls to our xml url that has the NHL standings
    type: 'GET',
    url: 'http://app.cgy.nhl.yinzcam.com/V2/Stats/Standings',
    dataType: 'xml',

    success: function(data){

      var result = xmlToJSON.parseString(data);

      console.log(result);

      $('#standings').append(result);
    }
  });
}

nhl();
