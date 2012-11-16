//setup Dependencies
var connect = require('connect'),
  express = require('express'),
  io = require('socket.io'),
  port = (process.env.PORT || 8081),
  sqlite3 = require('sqlite3').verbose();

//Start DB
var db = new sqlite3.Database(':memory:'); // This could be a file and made persistant
db.serialize(function(){
	db.run("CREATE TABLE vote_system(id	INTEGER PRIMARY KEY AUTOINCREMENT, name CHAR(31), voteUp NUMERIC, voteDown NUMERIC)")
	db.run("INSERT INTO vote_system VALUES(1,'testdata',0,0)")
});


//Setup Express
var server = express.createServer();
server.configure(function() {
  server.set('views', __dirname + '/views');
  server.set('view options', {
    layout: false
  });
  server.use(connect.bodyParser());
  server.use(express.cookieParser());
  server.use(express.session({
    secret: "shhhhhhhhh!"
  }));
  server.use(connect.static(__dirname + '/static'));
  server.use(server.router);
});

//declare Server variables
var upVoteCount = 0;
var downVoteCount = 0;
var globalCount = 0;
var linkToImage = 'http://tadcoenvironmental.com/img/oscar.jpg';


//setup the errors
server.error(function(err, req, res, next) {
  if(err instanceof NotFound) {
    res.render('404.jade', {
      locals: {
        title: '404 - Not Found',
        description: '',
        author: '',
        analyticssiteid: 'XXXXXXX'
      },
      status: 404
    });
  } else {
    res.render('500.jade', {
      locals: {
        title: 'The Server Encountered an Error',
        description: '',
        author: '',
        analyticssiteid: 'XXXXXXX',
        error: err
      },
      status: 500
    });
  }
});
server.listen(port);

//Setup Socket.IO
var io = io.listen(server, {
  log: false
}); //debug mode off
var voteData = { //i think this object can/ should be removed
  voteCount: 0,
  votePressed: "newww"
};

io.sockets.on('connection', function(socket) {
  console.log('Client Connected');
  socket.emit('load_image', linkToImage);
  socket.on('vote', function(voteData) {
	if(voteData<0) {
		downVoteCount = downVoteCount + 1;
		console.log('downVoteCount = ' + downVoteCount);
	} else if (voteData>0) {
	upVoteCount = upVoteCount + 1;
	console.log('upVoteCount = ' + upVoteCount);
	}
	console.log('voteData = ' + voteData);
    globalCount = globalCount + voteData;
    console.log('globalCount = ' + globalCount); //displays current total
    //socket.broadcast.emit('server_message',voteData.votePressed);
    socket.emit('server_message', voteData);
    io.sockets.emit('vote_count', globalCount);//
  });
  socket.on('disconnect', function() {
    console.log('Client Disconnected.');
  });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////
/////// ADD ALL YOUR ROUTES HERE  /////////
server.get('/', function(req, res) {
  res.render('index.jade', {
    locals: {
      title: 'Your Page Title',
      description: 'Your Page Description',
      author: 'Your Name',
      analyticssiteid: 'XXXXXXX',
      globalCount: globalCount,
      linkToImage: linkToImage
    }
  });
});

server.get('/NewPoll', function(req, res) {
  res.render('newpoll.jade', {
    locals: {
      title: 'New Poll',
      description: 'You can make a realtime poll!',
      author: 'A',
      analyticssiteid: 'XXXXXXX'
    }
  });
});

server.get('/poll/:name', function(req, res){
	var name = req.params.name
	console.log(name)
	db.each("SELECT name from vote_system where name=?", name, function(err, row) {
		console.log(row.name)
		if (row.name){
			var voteData = row.voteUp - row.voteDown
			//Show the page with it
			res.render('multipoll.jade',{
				locals:{
					title: 'New Poll',
				    description: 'You can make a realtime poll!',
				    author: 'A',
				    analyticssiteid: 'XXXXXXX',
					voteData: voteData
				}
			})
		}
		else{
			throw new NotFound;
		}
	  });
})

server.get('/globalcount', function(req, res) {
  console.log('globalcount = ' + globalCount);
});

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res) {
  throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res) {
  throw new NotFound;
});

function NotFound(msg) {
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

console.log('Listening on http://0.0.0.0:' + port);