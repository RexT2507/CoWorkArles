<!DOCTYPE html>
<html>
 <head>
  <title>Calendrier événements</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.css" />
 

  <link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet">


  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script
    type="text/javascript"
    src="//code.jquery.com/jquery-1.8.3.js"
    
  ></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/locale/fr.js"></script>


  <style>

  html, body {
    margin: 0;
    padding: 0;
    font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
    font-size: 14px;
  }

  </style>

  <script>
   
  $(document).ready(function() {
   var calendar = $('#calendar').fullCalendar({
    locale : 'fr',
    editable:true,
    header:{
     left:'prev,next today',
     center:'title',
     right:'agendaWeek,agendaDay'
    },
    events: 'load.php',
    selectable:false,
    themeSystem: 'bootstrap4',
    defaultView: 'agendaWeek',
    selectHelper:true,
    editable:false,
    eventRender: function (event, element) {
        element.attr('href', 'javascript:void(0);');
        element.attr("description",event.description);
        element.click(function() {
            $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
            $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
            $("#eventInfo").html(event.description);
            $("#eventLink").attr('href', event.url);
            $("#eventContent").dialog({ modal: true, title: event.title, width:600, buttons:[{ text:"Je m'inscris !"}]});
        });
    },
   });
  });
   
  </script>
 </head>
 <body>
  <br />
  <h2 align="center"><a href="#">Calendrier événements</a></h2>
  <br />
  <div class="container">
   <div id="calendar"></div>
   <div id="eventContent" title="Event Details" style="display:none;">
    <span><img src="Capture2.PNG"/></span>
    Commence à: <span id="startTime"></span><br>
    Fini à: <span id="endTime"></span><br><br>
    <p id="eventInfo"></p>
    <p><strong><a id="eventLink" href="" target="_blank">Plus d'information</a></strong></p>
  </div>
  </div>
 </body>
</html>