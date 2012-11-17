<h1>node-votesystem</h1>

Node-votesystem is a simple example of app built on top of node-boilerplate. 
Socket.io was used to display real-time auto-updating results (total vote) on each client view. 

Node-votesystem can be viewed at vote.tadcoenvironmental.com

based on node-boilerplate
	found at https://github.com/robrighter/node-boilerplate
get node from http://nodejs.org/
<h1>key files:</h1>

<b>server.js</b> - main server file.
tracks vote counts and pushes data to clients.

<b>static/js/script.js</b>
js controlling index.jade
up vote is 1, downvote is -1
sends data back to server via socket.io

<b>views/index.jade</b>
compiles to index.html
id is controlled with script.js

todo:
-function to load objects to vote on.  
-Change to postgresql db
-implement security