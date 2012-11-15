node-votesystem

based on node-boilerplate

key files:

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