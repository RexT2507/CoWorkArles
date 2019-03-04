<!DOCTYPE html>
<html>
 <head>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/flick/jquery-ui.css">
    <script type="text/javascript" src="//code.jquery.com/jquery-1.8.3.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    
    
 
 
 <script>
 
    $(document).ready(function() {
    
    var dialog=$("#dialog").dialog({ modal: true,width:1100,height:700});
    
    });
    
     $( function() {
        $( "e1" ).accordion(); //à tester
        });
     
    function dropdownevent() {
        var x = document.getElementById("dropdownevent");
        if (x.style.display === "none") {
            x.style.display = "block";
        } 
        else {
        x.style.display = "none";
        }
    } 
     
 
 </script>
 
 </head>
    
    <style>
        
    body{
        background-image:url(images/background.jpg); 
        }   
    
    .ui-widget-overlay {
    opacity: .30;
    filter: Alpha(Opacity=30);
    }
        
    .dropbtn {
    background-color: #3498DB;
    }
        
    .buttonreserve {
    background-color:#5945c7 ;
    }
    
        .buttoncalendarvisit {
    background-color:orange;
    }
    
            .buttonreservevisit {
    background-color:grey;
    }
    
    .ui-dialog-titlebar-close {
    visibility: hidden;
    }
    
    button {
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
        }
        
    .img {
    text-align: center;
    border: 3px solid green;
        }
        
    .button2 {
    background-color:#44c767;
	-moz-border-radius:3px;
	-webkit-border-radius:3px;
	border-radius:3px;
	border:1px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
        }    
    </style>
 <body>
     
 
 <div id="dialog" title="Calendrier Co-Working">
     <div class="img">
         <img src="images/initiative_logo.jpg">
     </div>
     <h1> Bienvenue sur le calendrier de l'espace Co-Working d'Arles ! </h1>
        
    <div class="dropdownevent" id="e1">
        <button class="dropbtn" href="" class="" onclick="dropdownevent()"> Créer un événement </button>
            <div id="dropdownevent" class="dropdown-content" style="display: none;">
                <ul>
                    <li><button class="button2" href="" onclick="location.href='http://localhost/TotalyCalendrier/EventPublic1/index.php'"> Sans réservation à l'espace Co-Working</button></li>
                           
                    <br/>
                    <li><button class="button2" href="" onclick="location.href='http://localhost/TotalyCalendrier/EventPublic/index.php'" > Avec réservation à l'espace Co-Working</button></li> 
                </ul>    
            </div>
            
            <br/><br/>
            
            <button onclick="location.href='http://localhost/TotalyCalendrier/EventPublic/index.php'" class="buttonreserve" href="" class="" >Réserver une salle à l'espace Co-Working</button>
            
             <br/><br/>
            
            <button  onclick="location.href='http://localhost/TotalyCalendrier/CalendarEvents/index.php'" class="buttoncalendarvisit" href="" class="" >Visualiser le calendrier des événements</button>
        
             <br/><br/>
            
            <button  onclick="location.href='http://localhost/TotalyCalendrier/CalendarReserve/index.php'" class="buttonreservevisit" href="" class="" >Visualiser le calendrier des réservations (nécessite d'être connecté)</button>
            
             <br/><br/><br/><br/>
        
    </div>
     
     
     
     <a href="#">Retour au menu</a><br/>
 
 </div>
 
 </body>
 
 </html>
 
 