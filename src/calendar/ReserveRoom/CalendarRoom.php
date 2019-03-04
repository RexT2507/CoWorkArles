<!DOCTYPE html>
<html>
 <head>
  <title>Calendrier réservation</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.css" />
 

  <link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet">
  <link href='https://fullcalendar.io/releases/fullcalendar-scheduler/1.9.4/scheduler.min.css' rel='stylesheet' />     
   <link href='https://fullcalendar.io/releases/fullcalendar-scheduler/1.9.4/scheduler.min.css' rel='stylesheet' />     
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script
    type="text/javascript"
    src="//code.jquery.com/jquery-1.8.3.js"
    
  ></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/locale/fr.js"></script>
  <script src='https://fullcalendar.io/releases/fullcalendar-scheduler/1.9.4/scheduler.min.js'></script>  


  <style>

  html, body {
    margin: 0;
    padding: 0;
    font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
    font-size: 14px;
  }

  </style>

  <script type="text/javascript"> document.getElementById('my_file').click();</script>

  <script>
   
  $(document).ready(function() { 
   var calendar = $('#calendar').fullCalendar({
    locale : 'fr',
    themeSystem: 'bootstrap4',
    defaultView: 'agendaWeek',
    minTime: "07:00:00",
    maxTime: "21:00:00",
    groupByDateAndResource: true,
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    resources: [
      { id: 'a', title: 'Grande Salle' },
      { id: 'b', title: 'Bureau 3' }
    ],   
    editable:true,
    header:{
     left:'prev,next today',
     center:'title',
     right:'agendaWeek,agendaDay'
    },
    events: 'load.php', //à voir avec l'api
    selectable:true,
    selectHelper:true,
    select: function(start, end, allDay)
    {
      var dialog=$("#dialog").dialog({ modal: true,width:600, buttons: {
        'Valider' : function() {
                            var title=document.getElementById('title').value;
                            $.ajax({ //utilisation de ajax mais à voir si angular à une même méthode de requête
                            url:"update2.php",
                             type:"POST",
                            data:{title:title, end:end, id:id},
                            success:function(){
                            calendar.fullCalendar('refetchEvents');
                            alert('Événement ajouté avec succès');
                             }
                            });
                            $(this).dialog('close');        
        }
    } });
    },  
    editable:true,
    eventResize:function(event)
    {
     var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
     var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
     var title = event.title;
     var id = event.id;
     $.ajax({
      url:"update.php",
      type:"POST",
      data:{title:title, start:start, end:end, id:id},
      success:function(){
       calendar.fullCalendar('refetchEvents');
       alert('Événement modifié avec succès');
      }
     })
    },

    eventDrop:function(event)
    {
     var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
     var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
     var title = event.title;
     var id = event.id;
     $.ajax({
      url:"update.php",
      type:"POST",
      data:{title:title, start:start, end:end, id:id},
      success:function()
      {
       calendar.fullCalendar('refetchEvents');
       alert("Événement modifié avec succès");
      }
     });
    },

    eventClick:function(event)
    {
     if(confirm("êtes-vous sûr de vouloir retirer cet événement ?"))
     {
      var id = event.id;
      $.ajax({
       url:"delete.php",
       type:"POST",
       data:{id:id},
       success:function()
       {
        calendar.fullCalendar('refetchEvents');
        alert("Événement supprimé avec succès");
       }
      })
     }
    },
   });
    
    $(".fc-right").append('<select class="select_month"><option value="c">Toutes les salles</option><option value="b">Grande Salle</option><option value="a">Bureau 3</option>');
  
    $(".select_month").on("change", function(event) {
    if(this.value=="a"){
     $('#calendar').fullCalendar('removeResource', this.value);
     
    }
    if(this.value=="b"){
     $('#calendar').fullCalendar('removeResource', this.value); // à voir getressources avec le php load à la bdd   
    }
    if(this.value=="c"){
       $('#calendar').fullCalendar('refetchResources');
    }
    
    });
      
  });
  </script>
 </head>
 <body>
  <br />
  <h2 align="center"><a href="#"><b>Réservation </b></a></h2>
  <br />
  <div class="container">
   <div id="calendar"></div>
  </div>
  <div id="dialog" title="Création événement/réservation" style="display: none;">
      <form>
          <h6><b>Entrez l'intitulé de votre réservation</b></h6>
          <input id="title" type="text">
      </form>
  </div>
 </body>
</html>