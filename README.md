node-votesystem

<<<<<<< HEAD
based on node-boilerplate
	found at https://github.com/robrighter/node-boilerplate
get node from http://nodejs.org/
=======
based on node-boilerplate https://github.com/robrighter/node-boilerplate
>>>>>>> d2222ec2973e6cb6510837285337bbebbcf427f3

<h1>key files:</h1>

server.js - main server file.
currently tracks globalCount of the vote and displays it in console

static/js/script.js
js controlling index.jade
up vote is 1, downvote is -1
sends data back to server via socket.io

views/index.jade
compiles to index.html
id is controlled with script.js

todo:
add globalCount display to the cient view.me