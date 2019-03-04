<!DOCTYPE html>
<html>
 <head>
  <title>Calendrier événements (sans réservation à l'espace)</title>
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

  <script type="text/javascript"> document.getElementById('my_file').click();</script>

  <script>
   
  $(document).ready(function() { 
   var calendar = $('#calendar').fullCalendar({
    locale : 'fr',
    themeSystem: 'bootstrap4',
    defaultView: 'agendaWeek',
    minTime: "07:00:00",
    maxTime: "21:00:00",   
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
            $("#outside").dialog({buttons : { 'Valider' : function() {
                var title=document.getElementById('title').value;
                            var description=document.getElementById('description').value;
                            var image=document.getElementById('image').value;
                            var adresse=document.getElementById('adresse').value;
                            var ville=document.getElementById('ville').value;
                            var code=document.getElementById('code').value;
                            $.ajax({ //utilisation de ajax mais à voir si angular à une même méthode de requête
                            url:"update2.php",
                             type:"POST",
                            data:{title:title,description:description,image:image,adresse:adresse,ville:ville,code:code, start:start, end:end, id:id},
                            success:function(){
                            calendar.fullCalendar('refetchEvents');
                            alert('Événement modifié avec succès');
                             }
                            });
                            $(this).dialog('close'); 
            } }});
            
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
  });
  </script>
 </head>
 <body>
  <br />
  <h2 align="center"><a href="#"><b>Calendrier événements  (sans réservation à l'espace)</b></a></h2>
  <br />
  <div class="container">
   <div id="calendar"></div>
  </div>
  <div id="dialog" title="Création événement/réservation" style="display: none;">
      <form>
          <h6><b>Donnez un titre à votre événement</b></h6>
          <input id="title" type="text">
          <br/>
          <br/>
          <h6><b>Donnez une description à votre événement</b></h6>
          <textarea id="description"></textarea>
          <br/>
          <br/>
          <h6><b> Upload d'un Flyer</b></h6>
          <input id="image" type="file" id="my_file">
          <br/>
          <br/>
        <p><b>Événement mode : </b></p>
          
          <p>
          <input type="radio" name="yes_no" checked>Publique</input>
          </p>
          <p>
          <input type="radio" name="yes_no">Privé</input>
          </p>
          
      </form>
  </div>


  <div id="outside" style="display: none;" title="Adresse">
    <h6>Veuillez saisir l'adresse complète de l'événement</h6>
    <form>
    <input id="adresse" type="text"> Adresse</input></br></br>
    <input id="ville" type="text"> Ville</input></br></br>
    <input id="code" type="text"> Code Postal</input></br></br>
    </form>
  </div>

 </body>
</html>