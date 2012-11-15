/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();

	$('#up').bind('click', function() {
		socket.emit('vote','up were pushed');
	});
	
	$('#down').bind('click', function() {
		socket.emit('vote','down got plunked');
	});
	
  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });
});