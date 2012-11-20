/* Author: Sean Iveson
*/

$(document).ready(function() {

	var socket = io.connect();
	var votePressed = "";
	var scriptCount = 0;
	var voteData = {
	  input: "",
	  name: ""
	};
	
	$('#up').bind('click', function() {
		votePressed = "up";
		socket.emit('vote', 'voteUp');
	});

	$('#down').bind('click', function() {
		votePressed = "down";
		socket.emit('vote', 'voteDown');
	});
	
	$('#upC').bind('click', function() {
		votePressed = "up";
		socket.emit('vote', 'voteUpC');
	});

	$('#downC').bind('click', function() {
		votePressed = "down";
		socket.emit('vote', 'voteDownC');
	});

	socket.on('server_message', function(voteData) {
		voteData.votePressed = "test";
		//$('#receiver').append('<li>' + voteData + '</li>');
	});

	socket.on('load_image', function(linkToImage) {
		//$('#image').append(linkToImage);
    });

	socket.on('vote_count', function(voteData) {
		$('#votecount').text(voteData);
	});

});