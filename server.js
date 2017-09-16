//  OpenShift sample Node application
var	express = require('express'),
		app		= express(),
		server	= require('http').Server(app),
		io 		= require('socket.io')(server),
		morgan	= require('morgan');
		
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

app.use(express.static('public'));

var	port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
		ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
		mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
		mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME)
{
	var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
	mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
	mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
	mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
	mongoPassword = process.env[mongoServiceName + '_PASSWORD']
	mongoUser = process.env[mongoServiceName + '_USER'];

	if (mongoHost && mongoPort && mongoDatabase)
	{
		mongoURLLabel = mongoURL = 'mongodb://';
		
		if (mongoUser && mongoPassword)
		{
			mongoURL += mongoUser + ':' + mongoPassword + '@';
		}
		
		// Provide UI label that excludes user id and pw
		mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
		mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
	}
}

var	db = null,
		dbDetails = new Object();

var initDb = function(callback)
{
	if (mongoURL == null) 		return;

	var mongodb = require('mongodb');
	
	if (mongodb == null)			 return;

	mongodb.connect(mongoURL, function(err, conn)
	{
		if (err)
		{
			callback(err);
			return;
		}

		db = conn;
		dbDetails.databaseName = db.databaseName;
		dbDetails.url = mongoURLLabel;
		dbDetails.type = 'MongoDB';

		console.log('Connected to MongoDB at: %s', mongoURL);
	});
};

//app.use(express.static('client'));

app.get('/', function (req, res)
{
	// try to initialize the db on every request if it's not already
	// initialized.
	if (!db) 
	{
		initDb(function(err){});
	}
	
	if (db)
	{
		var col = db.collection('counts');
		// Create a document with request IP and current time of request
		col.insert({ip: req.ip, date: Date.now()});
		col.count(function(err, count)
		{
			res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
		});
	} 
	else
	{
		res.render('index.html', { pageCountMessage : null});
	}
	console.log("Ktoś chciał się połączyć z \""+ req.url +"\"");
});

app.get('/game', function (req, res)
{
	// try to initialize the db on every request if it's not already
	// initialized.
	if (!db) 
	{
		initDb(function(err){});
	}
	
	if (db)
	{
		var col = db.collection('counts');
		// Create a document with request IP and current time of request
		col.insert({ip: req.ip, date: Date.now()});
		col.count(function(err, count)
		{
			res.render('game.html', { pageCountMessage : count, dbInfo: dbDetails });
		});
	} 
	else
	{
		res.render('game.html', { pageCountMessage : null});
	}
	console.log("Ktoś chciał się połączyć z \""+ req.url +"\"");
});

app.get('/pagecount', function (req, res)
{
	// try to initialize the db on every request if it's not already
	// initialized.
	if (!db)
	{
		initDb(function(err){});
	}

	if (db)
	{
		db.collection('counts').count(function(err, count )
		{
			res.send('{ pageCount: ' + count + '}');
		});
	}
	else
	{
		res.send('{ pageCount: -1 }');
	}
});

// error handling
app.use(function(err, req, res, next)
{
	console.error(err.stack);
	res.status(500).send('Something bad happened!');
});

initDb(function(err)
{
	console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;

/*var server = http.createServer(function(request, response)
{
	var filePath = false;

	if (request.url == '/')
	{
		filePath = 'client/index.html';
	}
	else if (request.url == '/game')
	{
		filePath = 'client'+ request.url +'.html';
	}
	else if (request.url == '/jQuery.js')
	{
		filePath = request.url;
	}
	else
	{
		filePath = 'client'+ request.url;
	}
	
	var absPath = './' + filePath;
	
	serveStatic(response, cache, absPath);
});

server.listen(PORT, 'localhost', function()
{
	console.log("Serwer nasłuchuje na porcie "+ PORT +".");
	console.log("Jakiś log");
});*/






var max_players = 10;

function players ()
{
	this.count_players = 0;
	//this.position_in_array = new Array(max_players);
	this.real_id = new Array(max_players);
	this.nick = new Array(max_players);
	this.map = new Array(max_players);
	this.X = new Array(max_players);
	this.Y = new Array(max_players);
	this.hp = new Array(max_players);
	this.max_hp = new Array(max_players);
	this.mana = new Array(max_players);
	this.max_mana = new Array(max_players);
	this.exp = new Array(max_players);
	this.need_exp = new Array(max_players);
	this.lvl = new Array(max_players);
	this.gold = new Array(max_players);
	this.bank = new Array(max_players);
	
	this.online = new Array(max_players);
	this.socket_id = new Array(max_players);
}

var players = new players ();

for (var i = 0; i < 3; i++)
{
	players.real_id[i] = i;
	players.nick[i] = "Dirkuu_"+ i;
	players.map[i] = 2;
	players.X[i] = 700;
	players.Y[i] = 30;
	players.hp[i] = 100;
	players.max_hp[i] = 100;
	players.mana[i] = 100;
	players.max_mana[i] = 100;
	players.exp[i] = 0;
	players.need_exp[i] = 0;
	players.lvl[i] = 1;
	players.gold[i] = 0;
	players.bank[i] = 0;
}

	players.real_id[3] = 3;
	players.nick[3] = "Dirkuu";
	players.map[3] = 2;
	players.X[3] = 700;
	players.Y[3] = 30;
	players.hp[3] = 100;
	players.max_hp[3] = 100;
	players.mana[3] = 100;
	players.max_mana[3] = 100;
	players.exp[3] = 0;
	players.need_exp[3] = 0;
	players.lvl[3] = 1;
	players.gold[3] = 0;
	players.bank[3] = 0;

	players.real_id[4] = 4;
	players.nick[4] = "Zielas";
	players.map[4] = 2;
	players.X[4] = 700;
	players.Y[4] = 30;
	players.hp[4] = 100;
	players.max_hp[4] = 100;
	players.mana[4] = 100;
	players.max_mana[4] = 100;
	players.exp[4] = 0;
	players.need_exp[4] = 0;
	players.lvl[4] = 1;
	players.gold[4] = 0;
	players.bank[4] = 0;
/*
							Deklaracja klasy shoutboxa
*/
function shoutbox ()
{
	this.id = new Array(10);
	this.message = new Array(10);
	this.nick = new Array(10);
	//this.rank = new Array(10);
	//this.id[0] = 0;
}

var shout = new shoutbox();

//var io = require('socket.io').listen(http.app);

io.sockets.on('connection', function (socket)
{
	socket.on('log_in_to_game', function (data)
	{
		var index = players.nick.indexOf(data.nick);
		
		if (index == -1)
		{
			console.log("Ktoś próbował się zalogować z niepoprawnym nickiem.");
			return;
		}
		
		console.log(data.nick +" połączył się z serwerem.\n");
		
		players.online[index] = true;
		players.socket_id[index] = socket.id;
		
		socket.emit('info_about_me',
		{
			real_id: players.real_id[index],
			//nick: players.nick[index],
			map: players.map[index],
			X: players.X[index],
			Y: players.Y[index],
			hp: players.hp[index],
			max_hp: players.max_hp[index],
			mana: players.mana[index],
			max_mana: players.max_mana[index],
			exp: players.exp[index],
			need_exp: players.need_exp[index],
			lvl: players.lvl[index],
			gold: players.gold[index],
			bank: players.bank[index]
		});
		
		socket.join(players.map[index]);
		console.log(players.map[index]);
		
		var min_x = players.X[index] - 700;
		var max_x = players.X[index] + 700;
		var min_y = players.Y[index] - 400;
		var max_y = players.Y[index] + 400;
		
		console.log("index == "+ index +"\nplayers.real_id["+ index +"] == "+ players.real_id[index] +"\nplayers.nick["+ index +"] == "+ players.nick[index] +"\nplayers.socket_id["+ index +"] == "+ players.socket_id[index] +"\n");
			
		for (var i = 0; i < max_players; i++)
		{
			if (players.map[i] != players.map[index] || i == index)			continue;
			
			
			if (players.X[i] > min_x && players.X[i] < max_x && players.Y[i] > min_y && players.Y[i] < max_y && players.online[i] == true)
			{
				console.log("i == "+ i +"\nplayers.real_id["+ i +"] == "+ players.real_id[i] +"\nplayers.nick["+ i +"] == "+ players.nick[i] +"\nplayers.socket_id["+ i +"] == "+ players.socket_id[i] +"\n");
				/*
							Wysyłanie wiadomości do Clienta o graczach w pobliżu
				*/
				socket.emit('first_infos_about_other_players',
				{
					real_id: players.real_id[i],
					nick: players.nick[i],
					X: players.X[i],
					Y: players.Y[i],
					lvl: players.lvl[i]
				});
				
				/*
							Wysyłanie wiadomości do innych w pobliżu o nowo zalogowanym graczu
				*/
				socket.to(players.socket_id[i]).emit('info_about_new_log_in_player',
				{
					real_id: players.real_id[index],
					nick: players.nick[index],
					X: players.X[index],
					Y: players.Y[index],
					lvl: players.lvl[index]
				});
			}
		}
		
		console.log("\n");
	});
	
	socket.on('new_position_info', function (data)
	{
		var index = players.real_id.indexOf(data.real_id);
		
		if (index == -1)
		{
			console.log("Ktoś próbował się zalogować z niepoprawnym nickiem.");
			return;
		}
		
		var min_x = data.X - 1400;
		var max_x = data.X + 1400;
		var min_y = data.Y - 700;
		var max_y = data.Y + 700;
		
		for (var i = 0; i < max_players; i++)
		{
			if (players.map[i] != players.map[index] || i == index)			continue;
			
			if (players.X[i] > min_x && players.X[i] < max_x && players.Y[i] > min_y && players.Y[i] < max_y && players.online[i] == true)
			{
				socket.to(players.socket_id[i]).emit('new_other_player_position',
				{
					real_id: data.real_id,
					X: data.X,
					Y: data.Y
				});
			}
			
			
		}
		
		players.X[index] = data.X;
		players.Y[index] = data.Y;
	});
	
	var max_messages = 10;
	
	socket.on('msg', function (data)
	{
		console.log("\nNOWA WIADOMOŚĆ:\n"+ data.nick +": "+ data.msg);
		var index = shout.id.length;
		if (index == max_messages)
		{
			for (var i = 0; i < index; i++)
			{
				shout.id[i] = shout.id[i + 1] + 1;
				shout.message[i] = shout.message[i + 1];
				shout.nick[i] = shout.nick[i + 1];
				//shout.rank[i] = shout.rank[i + 1];
			}
			
			shout.id[index] = shout.id[index - 1] + 1;
			shout.message[index] = data.msg;
			shout.nick[index] = data.nick;
			//shout.rank[index] = coś;
			
			socket.to(players.map[ players.nick.indexOf( data.nick ) ]).emit('msg',
			{
				msg: shout.message[index], nick: shout.nick[index]
			});
		}
		else
		{
			shout.id[index + 1] = shout.id[index] + 1;
			shout.message[index + 1] = data.msg;
			shout.nick[index + 1] = data.nick;
			//shout.rank[index + 1] = coś;
			
			socket.to(players.map[ players.nick.indexOf( data.nick ) ]).emit('msg', //players.map[ players.nick.indexOf( data.nick ) ]
			{
				msg: shout.message[index + 1], nick: shout.nick[index + 1]
			});
			
			//console.log(players.nick.indexOf(data.nick ));
			//console.log(players.map[ players.nick.indexOf( data.nick ) ]);
		}
	});
	/*socket.join('1');
	
	socket.on('login_to_game', function (data)
	{
		for (var i = 0; i < max_players; i++)
		{
			if (players.real_id[i] == undefined || players.real_id[i] == null)
			{
				players.count_players++;
				console.log("Nowa osoba weszła do gry. Obecna liczba graczy: "+ players.count_players);
				
				players.real_id[i] = i;		//data.real_id;
				players.nick[i] = data.nick;
				players.map[i] = data.map;
				players.X[i] = data.X;
				players.Y[i] = data.Y;
				players.hp[i] = data.hp;
				players.max_hp[i] = data.max_hp;
				players.mana[i] = data.mana;
				players.max_mana[i] = data.max_mana;
				players.exp[i] = data.exp;
				players.need_exp[i] = data.need_exp;
				players.lvl[i] = data.lvl;
				players.gold[i] = data.gold;
				players.bank[i] = data.bank;
				
				setTimeout(function()
				{
					console.log("\n\nDane nowego gracza:\nNick: "+ data.nick +"\nMapa: "+ players.map[i] +"\nX: "+ players.X[i] +"\nY: "+ players.Y[i] +"\n\n");
				}, 500);
				/*
					console.log
					("
						Dane nowego gracza: \n
						Nick: "+ players.nick[i] +"\n
						Mapa: "+ players.map[i] +"\n
						X: "+ players.X[i] +"\n
						Y: "+ players.Y[i]
					);
				*/
				/*
				break;
			}
		}
	});
	
	socket.on('position_info', function (data)
	{
		socket.to('1').emit('update_others_position', 
		{
			real_id: data.real_id,
			X: data.X,
			Y: data.Y
		});
		
		var index = players.real_id.indexOf(data.real_id);
		
		players.X[index] = data.X;
		players.Y[index] = data.Y;
		console.log(data.real_id +"["+ data.X +"]["+ data.Y +"]");
	});
	
	socket.on('download_first_info', function (data)
	{
		var min_x = data.X - 700;
		var max_x = data.X + 700;
		var min_y = data.Y - 400;
		var max_y = data.Y + 400;
		
		for (var i = 0; i < max_players; i++)
		{
			console.log(data.real_id +" | "+ players.real_id[i]);
			
			if (players.X[i] > min_x && players.X[i] < max_x && players.Y[i] > min_y && players.Y[i] < max_y && players.map[i] == data.map && players.real_id[i] != data.real_id)
			{
				socket.emit('download_first_info',
				{
					real_id: players.real_id[i],
					nick: players.nick[i],
					X: players.X[i],
					Y: players.Y[i],
					lvl: players.lvl[i]
				});
			}
		}
	});
	
	

	socket.on('disconnect', function (socket)
	{
		players.count_players--;
		console.log("Ktoś opuścił grę. Obecna liczba graczy: "+ players.count_players);
	});*/
	/*socket.on('new_player', function(nick)
	{
		io.emit('message', msg);
	});*/
});