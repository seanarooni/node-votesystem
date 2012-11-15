<h1>node-votesystem</h1>

based on node-boilerplate
	found at https://github.com/robrighter/node-boilerplate
get node from http://nodejs.org/
<h1>key files:</h1>

<b>server.js</b> - main server file.
currently tracks globalCount of the vote and displays it in console

<b>static/js/script.js</b>
js controlling index.jade
up vote is 1, downvote is -1
sends data back to server via socket.io

<b>views/index.jade</b>
compiles to index.html
id is controlled with script.js

todo:
-add globalCount display to the cient view
-maybe create a database to track more than one voting variable, to vote things against other things.  
	that'd require an interface that loaded an object (to judge) and the vote buttons.  