//--CONTACT FORM JS--//
function formSubmit() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputSubject").value = "";
  document.getElementById("inputMessage").value = "";
  document.getElementById("buttonSubmit").style.display = "none";
  document.getElementById("buttonSubmitted").style.display = "flex";
}


//-- CALENDER JS --

//24h to 12h convert
function tConvert (time) {
  time = time.slice(0,-3);
  time1 = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time1.length > 1) {
    time1 = time1.slice (1);
    time1[5] = +time1[0] < 12 ? 'AM' : 'PM';
    time1[0] = +time1[0] % 12 || 12;
  }
  return time1.join ('');
};

//leap year
function leapYear(year) {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

//google api initiate
var apiKey = 'AIzaSyB1d-Ol7m3XMOJiJqlW9cY1c8csu7HKtas';

function handleClientLoad() {
  gapi.load('client', initClient);
};

function initClient() {
  gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
  })
};

//get next events function
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'madisonmotorsports@gmail.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 2,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;

    //EVENT ONE
    if (events.length > 0) { //make sure more than 1 event
        var eventone = events[0]; var eventtwo = events[1];
        var eoname = eventone.summary;
        if (eventone.start.dateTime == null) { //if time assosicated with event start
          var eotimestart = eventone.start.date; var eoNSCT = "true";
        } else {
          var eotimestart = eventone.start.dateTime; var eoNSCT = "false";
        }
        if (eventone.end.dateTime == null ) { //if time assosicated with event end
          var eotimeend  = eventone.end.date; var eoNECT = "true";
        } else {
          var eotimeend = eventone.end.dateTime; var eoNECT = "false";
        }
        if (eventone.end.dateTime == null && eventone.start.dateTime == null) { var eonotime = "true"; } else { var eonotime = "false"; };

        //NAME
        var eolink = eventone.htmlLink
        var eonamelink = document.createElement("a");
        eonamelink.setAttribute("target","_blank");
        eonamelink.setAttribute("href", eolink);
        eonamelink.setAttribute("class", "plink pbten b")
        eonamelink.textContent = eoname;
        document.getElementById("event1").prepend(eonamelink);
        document.getElementById("name1").style.display = "none"

        //DATE (google api is funky with all day events (finish at 12am next day instead of 11:59pm the same day))
        var eotimestartn = eotimestart.split("T")[0].split("-"); //rearrange date to normal american form
        var eotimeendn = eotimeend.split("T")[0].split("-");
        var eodates = eotimestartn[1] + "/" + eotimestartn[2] + "/" + eotimestartn[0];
        var eodatee = eotimeendn[1] + "/" + eotimeendn[2] + "/" + eotimeendn[0];

        if (eodates === eodatee) { //see if spans multiple days or just one
          //nothing needed
        } else {
          if (eoNECT === "true") { //no times, therefore day is off
            var eodeday = eodatee.split("/")[1] - 1;
            if (eodeday === 0) { //have to change month too
              var eodemonth = eodatee.split("/")[0] - 1;
              if (eodemonth === 1 || eodemonth === 3 || eodemonth === 5 || eodemonth === 7 || eodemonth === 8 || eodemonth === 10 || eodemonth === 12) {
                var eodeday = "31";
                var eodatee = eodemonth + "/" + eodeday + "/" + eodatee.split("/")[2]
              } else {
                if (eodemonth === 4 || eodemonth === 6 || eodemonth === 9 || eodemonth === 11) {
                  var eodeday = "30";
                  var eodatee = eodemonth + "/" + eodeday + "/" + eodatee.split("/")[2];
                } else {
                  if (eodemonth === 0) {
                    var eodemonth = "12";
                    var eodeday = "31";
                    var eodeyear = eodatee.split("/")[2] - 1
                    var eodatee = eodemonth + "/" + eodeday + "/" + eodeyear;
                  } else {
                    var eodeyear = eodatee.split("/")[2];
                    if (leapYear(eodeyear) === true) {
                      eodeday = "29";
                      var eodatee = eodemonth + "/" + eodeday + "/" + eodatee.split("/")[2];
                    } else {
                      eodeday = "28";
                      var eodatee = eodemonth + "/" + eodeday + "/" + eodatee.split("/")[2];
                    }
                  }
                }
              }
            } else {
              if (eodeday.length === 1) {
                var eodeday = "0" + eodeday;
              }
              var eodeday = "0" + eodeday;
              var eodatee = eodatee.split("/")[0] + "/" + eodeday + "/" + eodatee.split("/")[2];
            }
          } else {
            var eodatee = eodatee.split("/")[0] + "/" + eodeday + "/" + eodatee.split("/")[2];
          }
        }
        if (eodates === eodatee) { //final date set
          document.getElementById("date1").textContent = eodates; var eorangeofdates = "false";
        } else {
          document.getElementById("date1").textContent = eodates + " - " + eodatee; var eorangeofdates = "true";
        }

        //TIME
        if (eorangeofdates === "true") {  //if range of dates or no time listed then there is no time needed
            document.getElementById("time1").textContent = "Multiday event"; var eotimeseo = "true";
        } else {
          if (eonotime === "true") {
              document.getElementById("time1").textContent = "All day event"; var eotimeseo = "true";
          }
        }
        if (eoNSCT === "true") { //seo event start time
          var eoStartTimeC = "?"; //if no start time but end time)
        } else { //convert time from 24h to 12h
          var eoStartTime = eotimestart.split("T")[1].split("-")[0];
          var eoStartTimeC = tConvert(eoStartTime);
        }
        if (eoNECT === "true") {
          var eoEndTimeC = "?" //if no end time but start time
        } else { //convert time from 24h to 12h
          var eoEndTime = eotimeend.split("T")[1].split("-")[0];
          var eoEndTimeC = tConvert(eoEndTime);
        }
        if (eotimeseo == null) {
          document.getElementById("time1").textContent = eoStartTimeC + " - " + eoEndTimeC
        }

    //EVENT TWO
    if (eventtwo == null) { //only one event in the future planned
      document.getElementById("name2").textContent = "No event planned currently.";
      document.getElementById("date2").textContent = "";
      document.getElementById("time2").textContent = "";
    } else { //there is a second event
      var etname = eventtwo.summary;
      if (eventtwo.start.dateTime == null) { //if time assosicated with event start
        var ettimestart = eventtwo.start.date; var etNSCT = "true";
      } else {
        var ettimestart = eventtwo.start.dateTime; var etNSCT = "false";
      }
      if (eventtwo.end.dateTime == null ) { //if time assosicated with event end
        var ettimeend  = eventtwo.end.date; var etNECT = "true";
      } else {
        var ettimeend = eventtwo.end.dateTime; var etNECT = "false";
      }
      if (eventtwo.end.dateTime == null && eventtwo.start.dateTime == null) { window.etnotime = "true"; } else { window.etnotime = "false"; };
      //NAME
      var etlink = eventtwo.htmlLink
      var etnamelink = document.createElement("a");
      etnamelink.setAttribute("target","_blank");
      etnamelink.setAttribute("href", etlink);
      etnamelink.setAttribute("class", "plink pbten b")
      etnamelink.textContent = etname;
      document.getElementById("event2").prepend(etnamelink);
      document.getElementById("name2").style.display = "none"

      //DATE (google api is funky with all day events (finish at 12am next day instead of 11:59pm the same day))
      var ettimestartn = ettimestart.split("T")[0].split("-"); //rearrange date to normal american form
      var ettimeendn = ettimeend.split("T")[0].split("-");
      var etdates = ettimestartn[1] + "/" + ettimestartn[2] + "/" + ettimestartn[0];
      var etdatee = ettimeendn[1] + "/" + ettimeendn[2] + "/" + ettimeendn[0];

      if (etdates === etdatee) { //see if spans multiple days or just one
        //nothing needed
      } else {
        if (etNECT === "true") { //no times, therefore day is off
          var etdeday = etdatee.split("/")[1] - 1;
          if (etdeday === 0) { //have to change month too
            var etdemonth = etdatee.split("/")[0] - 1;
            if (etdemonth === 1 || etdemonth === 3 || etdemonth === 5 || etdemonth === 7 || etdemonth === 8 || etdemonth === 10 || etdemonth === 12) {
              var etdeday = "31";
              var etdatee = etdemonth + "/" + etdeday + "/" + etdatee.split("/")[2]
            } else {
              if (etdemonth === 4 || etdemonth === 6 || etdemonth === 9 || etdemonth === 11) {
                var etdeday = "30";
                var etdatee = etdemonth + "/" + etdeday + "/" + etdatee.split("/")[2];
              } else {
                if (etdemonth === 0) {
                  var etdemonth = "12";
                  var etdeday = "31";
                  var etdeyear = etdatee.split("/")[2] - 1
                  var etdatee = etdemonth + "/" + etdeday + "/" + etdeyear;
                } else {
                  var etdeyear = etdatee.split("/")[2];
                  if (leapYear(etdeyear) === true) {
                    etdeday = "29";
                    var etdatee = etdemonth + "/" + etdeday + "/" + etdatee.split("/")[2];
                  } else {
                    etdeday = "28";
                    var etdatee = etdemonth + "/" + etdeday + "/" + etdatee.split("/")[2];
                  }
                }
              }
            }
          } else {
            if (etdeday.length === 1) {
              var etdeday = "0" + etdeday;
            }
            var etdatee = etdatee.split("/")[0] + "/" + etdeday + "/" + etdatee.split("/")[2];
          }
        } else {
          var etdatee = etdatee.split("/")[0] + "/" + etdeday + "/" + etdatee.split("/")[2];
        }
      }
      if (etdates === etdatee) { //final date set
        document.getElementById("date2").textContent = etdates; etrangeofdates = "false";
      } else {
        document.getElementById("date2").textContent = etdates + " - " + etdatee; etrangeodates = "true";
      }



      //TIME
      if (etrangeofdates === "true") {  //if range of dates or no time listed then there is no time needed
          document.getElementById("time2").textContent = "Multiday event"; var ettimeset = "true";
      } else {
        if (etnotime === "true") {
            document.getElementById("time2").textContent = "All day event"; var ettimeset = "true";
        }
      }
      if (etNSCT === "true") { //set event start time
        var etStartTimeC = "?"; //if no start time but end time)
      } else { //convert time from 24h to 12h
        var etStartTime = ettimestart.split("T")[1].split("-")[0];
        var etStartTimeC = tConvert(etStartTime);
      }
      if (etNECT === "true") {
        var etEndTimeC = "?" //if no end time but start time
      } else { //convert time from 24h to 12h
        var etEndTime = ettimeend.split("T")[1].split("-")[0];
        var etEndTimeC = tConvert(etEndTime);
      }
      if (ettimeset == null) {
        document.getElementById("time2").textContent = etStartTimeC + " - " + etEndTimeC
      }
    }

    //NO CALENDAR EVENTS
  } else {
      document.getElementById("name1").textContent = "No event planned currently.";
      document.getElementById("date1").textContent = "";
      document.getElementById("time1").textContent = "";
      document.getElementById("name2").textContent = "No event planned currently.";
      document.getElementById("date2").textContent = "";
      document.getElementById("time2").textContent = "";
    }
  });
}

function timeoutLUC() {
  setTimeout(function(){ listUpcomingEvents() }, 1000);
}
