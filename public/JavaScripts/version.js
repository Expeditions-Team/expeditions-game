var version = "v0.0.5", description = "Działające chodzenie, do zrobienia przełączanie się między kontami oraz usuwanie gracza z tablicy, gdy go nie widać (z marginesem poza widocznym ekranem) i przy wylogowaniu/wyłączeniu karty przeglądarki";

$("#messages").append( $('<li class="message">').text("GLaDOS "+ version +': '+ description) );
$("#messages").scrollTop( $("#messages").height() );