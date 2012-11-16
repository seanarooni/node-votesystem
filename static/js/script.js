/* Author: Sean Iveson
*/

$(document).ready(function() {

	var socket = io.connect();
	var votePressed = "";
	var scriptCount = 0;

	$('#up').bind('click', function() {
		votePressed = "up";
		socket.emit('vote', 1);
	});

	$('#down').bind('click', function() {
		votePressed = "down";
		socket.emit('vote', -1);
	});

	socket.on('server_message', function(voteData) {
		voteData.votePressed = "test";
		$('#receiver').append('<li>' + voteData + '</li>');
	});

	socket.on('vote_count', function(voteData) {
		$('#votecount').text(voteData);
	});

});