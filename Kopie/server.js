var http = require('http'),
	PORT = 8080,
	qs = require('querystring'),
	fs = require('fs'),
	path = require('path'),
	mime = require('mime'),
	cache = {};

function send404(response)
{
	//response.setEncoding('utf-8');
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Błąd 404: Nie znaleziono strony o podanym adresie :(');
	response.end();
}

function sendFile(response, filePath, fileContents)
{
	response.writeHead(200, {"content-type": mime.lookup(path.basename(filePath)) });
	response.end(fileContents);
}

function serveStatic(response, cache, absPath)
{
	if (cache[absPath])
	{
		sendFile(response, absPath, cache[absPath]);
	}
	else
	{
		fs.exists(absPath, function(exists)
		{
			if (exists)
			{
				fs.readFile(absPath, function(err, data)
				{
					if (err)
					{
						send404(response);
					}
					else
					{
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else
			{
				send404(response);
			}
		});
	}
}

var server = http.createServer(function(request, response)
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
});






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

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket)
{
	
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