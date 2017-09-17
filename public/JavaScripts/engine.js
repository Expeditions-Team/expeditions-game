/*
							Deklaracja klasy gracza
*/
var max_players = 10;
function player (nick)//id, real_id, nick, map, X, Y, hp, max_hp, mana, max_mana, exp, need_exp, lvl, gold, bank)
{//("CHAR", data.login, data.map, data.charX, data.charY, data.mapX, data.mapY, data.hp, data.max_hp, data.mana, data.max_mana, data.exp, data.next_lvl, data.lvl, data.gold, data.bank)
	//inni.call(this, id);	//Dziedziczenie					//Nie da się zrobić dziedziczenia pojedyńczyche elementów
	this.id = "char";		//Konstruktor
	this.real_id;// = real_id;
	this.nick = nick;
	this.map;// = map;
	this.X;// = X;
	this.Y;// = Y;
	this.hp;// = hp;
	this.max_hp;// = max_hp;
	this.mana;// = mana;
	this.max_mana;// = max_mana;
	this.exp;// = exp;
	this.need_exp;// = need_exp;
	this.lvl;// = lvl;
	this.gold;// = gold;
	this.bank;// = bank;
	
	//this.set_map();
	/*setTimeout(function()
	{
		character.calculate_map_position();
		
	}, 1);*/
	
	
	/*	
	socket.emit('login_to_game',
	{
		id: this.real_id,
		nick: this.nick,
		map: this.map,
		X: this.X,
		Y: this.Y,
		hp: this.hp,
		max_hp: this.max_hp,
		mana: this.mana,
		max_mana: this.max_mana,
		exp: this.exp,
		need_exp: this.need_exp,
		lvl: this.lvl,
		gold: this.gold,
		bank: this.bank
	});	*/
	
	/*socket.emit('i_want_to_log_in',
	{
		nick: //<?php echo $_SESSION($nick); ?>
	});*/
	setTimeout(function ()
	{
		character.handling_info();
		$('#often_used_items').text("charX="+ character.X +", charY="+ character.Y);
	}, 1);
	
}
/*
							Prototypy klasy gracza
*/
player.prototype.calculate_map_position = function (real_id)
{
	this.conditions_x();
	this.conditions_y();
	//other_players.conditions_x();
	//other_players.conditions_y();
};

player.prototype.handling_info = function ()
{
	socket.on('new_other_player_position', function (data)
	{
		//other_players.calculate_map_position(data.real_id);
		
		var index = other_players.real_id.indexOf(data.real_id);
		
		console.log(data.real_id +"["+ data.X +"]["+ data.Y +"]");
		
		other_players.X[index] = data.X;
		other_players.Y[index] = data.Y;
		
		other_players.conditions_y();
		other_players.conditions_x();
	});
	
	socket.on('info_about_me', function (data)
	{
		character.real_id = data.real_id;
		character.map = data.map;
		character.X = data.X;
		character.Y = data.Y;
		
		character.calculate_map_position();
		
		character.hp = data.hp;
		character.max_hp = data.max_hp;
		character.mana = data.mana;
		character.max_mana = data.max_mana;
		character.exp = data.exp;
		character.need_exp = data.need_exp;
		character.lvl = data.lvl;
		character.gold = data.gold;
		character.bank = data.bank;
	});
	
	socket.on('first_infos_about_other_players', function (data)
	{
		console.log("Info o innych graczach: "+ data.real_id);
		var index = other_players.real_id.indexOf(data.real_id);
		
		for (var i = 0; i < max_players; i++)
		{
			if (index != -1)				continue;
			
			if (other_players.real_id[i] == undefined)
			{
				other_players.div_id[i] = "#PLAYER_"+ data.real_id;
				other_players.real_id[i] = data.real_id;
				other_players.nick[i] = data.nick;
				other_players.X[i] = data.X;
				other_players.Y[i] = data.Y;
				other_players.lvl[i] = data.lvl;
				
				
				other_players.set_player(data.real_id);
				
				break;
			}
		}
	});
	
	socket.on('info_about_new_log_in_player', function (data)
	{
		console.log("Info o nowo zalogowanym graczu: "+ data.real_id);
		var index = other_players.real_id.indexOf(data.real_id);
		
		for (var i = 0; i < max_players; i++)
		{
			if (index != -1)				continue;
			
			if (other_players.real_id[i] == undefined)
			{
				other_players.div_id[i] = "#PLAYER_"+ data.real_id;
				other_players.real_id[i] = data.real_id;
				other_players.nick[i] = data.nick;
				other_players.X[i] = data.X;
				other_players.Y[i] = data.Y;
				other_players.lvl[i] = data.lvl;
				
				
				other_players.set_player(data.real_id);
				
				break;
			}
		}
	});
	
	character.real_id = 0;
	
	socket.emit('log_in_to_game',
	{
		nick: "Dirkuu_"+ character.real_id
	});
};

/*player.prototype.anim_up = function ()
{
	var id = "#"+ this.id;
	$.ajax({type: "POST",url: "pliki/log.php",data: { login: this.nick }});
	sprawdz = false;
	setTimeout(function() {sprawdz=true;},300);
	setTimeout(function() {$(id).css({backgroundPosition: "32px 48px"});}, 75);
	setTimeout(function() {$(id).css({backgroundPosition: "64px 48px"});}, 150);
	setTimeout(function() {$(id).css({backgroundPosition: "96px 48px"});}, 225);
	setTimeout(function() {$(id).css({backgroundPosition: "0px 48px"});}, 300);
};

player.prototype.anim_bottom = function ()
{
	var id = "#"+ this.id;
	$.ajax({type: "POST",url: "pliki/log.php",data: { login: this.nick }});
	sprawdz = false;
	setTimeout(function() {sprawdz=true;},300);
	setTimeout(function() {$(id).css({backgroundPosition: "32px 0px"});}, 75);
	setTimeout(function() {$(id).css({backgroundPosition: "64px 0px"});}, 150);
	setTimeout(function() {$(id).css({backgroundPosition: "96px 0px"});}, 225);
	setTimeout(function() {$(id).css({backgroundPosition: "0px 0px"});}, 300);
};

player.prototype.anim_left = function ()
{
	var id = "#"+ this.id;
	$.ajax({type: "POST",url: "pliki/log.php",data: { login: this.nick }});
	sprawdz = false;
	setTimeout(function() {sprawdz=true;},300);
	setTimeout(function() {$(id).css({backgroundPosition: "32px 144px"});}, 75);
	setTimeout(function() {$(id).css({backgroundPosition: "64px 144px"});}, 150);
	setTimeout(function() {$(id).css({backgroundPosition: "96px 144px"});}, 225);
	setTimeout(function() {$(id).css({backgroundPosition: "0px 144px"});}, 300);
};

player.prototype.anim_right = function ()
{
	var id = "#"+ this.id;
	$.ajax({type: "POST",url: "pliki/log.php",data: { login: this.nick }});
	sprawdz = false;
	setTimeout(function() {sprawdz=true;},300);
	setTimeout(function() {$(id).css({backgroundPosition: "32px 96px"});}, 75);
	setTimeout(function() {$(id).css({backgroundPosition: "64px 96px"});}, 150);
	setTimeout(function() {$(id).css({backgroundPosition: "96px 96px"});}, 225);
	setTimeout(function() {$(id).css({backgroundPosition: "0px 96px"});}, 300);
};





player.prototype.przejdz = function ()
{
	if(kol[this.Y][this.X] == 10.1)
	{
		$.ajax({
			type: "POST",
			url: "pliki/przejdz.php",
			data: { login: this.nick, map: 11, charX: 6, mapX: 0, charY: 2, mapY: 0 },
			success: function () { f5(); }
		});
	}
	else if(kol[this.Y][this.X] == 11.1)
	{
		$.ajax({
			type: "POST",
			url: "pliki/przejdz.php",
			data: { login: this.nick, map: 10, charX: 32, mapX: 9, charY: 21, mapY: 2 },
			success: function () { f5(); }
		});
	}
};

player.prototype.set_map = function ()
{
	$.getScript("map/"+ this.map +".js");
	$("#GAMEAREA").css({'background-image': 'url("map/'+ this.map +'.png")'});
	var mx = this.mapX * 32;
	var my = this.mapY * 32;
	$("#GAMEAREA").css({backgroundPosition: "-"+ mx +"px -"+ my +"px"});
	this.set_position();
};

player.prototype.set_position = function ()										//Ta metoda musi zostać wywoływana po metodzie set_map
{
	$("#CHAR").css({"background-image": 'url("outfits/dirkuu.gif")'});
	setTimeout(function()																	//To opóźnienie musi tutaj być żeby wszystko działało
	{
		if (character.X <= 14)
		{
			var x = character.X * 32;
			$("#CHAR").css({"left": ""+ x +"px"});
		}
		else if (character.X > 14 && character.X < max_map_x - 14)
		{
			$("#CHAR").css({"left": "448px"});
		}
		else if (character.X >= max_map_x - 14)
		{
			var x = character.X * 32 - ( (max_map_x - 28) * 32);
			$("#CHAR").css({"left": ""+ x +"px"});
		}


		if (character.Y <= 10)
		{
			var y = character.Y * 32 - 16;
			$("#CHAR").css({"top": ""+ y +"px"});
		}
		else if (character.Y > 10 && character.Y < max_map_y - 10)
		{
			$("#CHAR").css({"top": "304px"});
		}
		else if (character.Y >= max_map_y - 10)
		{
			var y = character.Y * 32 - ( (max_map_y - 20) * 32 + 16);
			$("#CHAR").css({"top": ""+ y +"px"});
			var my = (character.mapY - 10) * 32;
		}
		
		setTimeout(function()
		{
			//$("#EQ").html("<center>map="+ character.map +", charX="+ character.X +", charY="+ character.Y +", mapX="+ character.mapX +", mapY="+ character.mapY +",<br>kol["+ character.Y +"]["+character.X +"]="+kol[character.Y][character.X]+"</center>");
		}, 500);
	}, 1000);																						//To opóźnienie musi tutaj być żeby wszystko działało
};*/

player.prototype.handling_keyboard = function ()					//Celem przebudowy jest wyjebanie z bazy danych kolumn mapX i mapY
{
	var i = 0;
	var map = {}; // You could also use an array
	onkeydown = onkeyup = function (e)
	{
		e = e || event; // to deal with IE
		//console.log(e.type +" | "+ e.which);
		map[e.keyCode] = e.type == 'keydown';
		/* insert conditional here */
		

		if ( (map[87] && map[83]) || (map[65] && map[68]) )
		{
		}
		else if (map[87] && character.Y >= 1 && map[65] && character.X >=1)							//Góra + Lewo
		{
			character.Y--;
			character.conditions_y();
			other_players.conditions_y();
			character.X--;
			character.conditions_x();
			other_players.conditions_x();
		}
		else if (map[87] && character.Y >= 1 && map[68] && character.X <= max_map_x - 32)		//Góra + Prawo
		{
			character.Y--;
			character.conditions_y();
			other_players.conditions_y();
			character.X++;
			character.conditions_x();
			other_players.conditions_x();
		}
		else if (map[83] && character.Y <= max_map_y - 48 && map[65] && character.X >= 1)		//Dół + Lewo
		{
			character.Y++;
			character.conditions_y();
			other_players.conditions_y();
			character.X--;
			character.conditions_x();
			other_players.conditions_x();
		}
		else if (map[83] && character.Y <= max_map_y - 48 && map[68] && character.X <= max_map_x - 32)			//Dół + Prawo
		{
			character.Y++;
			character.conditions_y();
			other_players.conditions_y();
			character.X++;
			character.conditions_x();
			other_players.conditions_x();
		}
		else if (map[87] && character.Y >= 1)// && sprawdz == 1)												//Góra
		{
			character.Y--;
			character.conditions_y();
			other_players.conditions_y();
		}
		else if (map[83] && character.Y <= max_map_y - 48)// && sprawdz == 1)						//Dół
		{
			character.Y++;
			character.conditions_y();
			other_players.conditions_y();
		}
		else if (map[65] && character.X >= 1)// && sprawdz == 1)											//Lewo
		{
			character.X--;
			character.conditions_x();
			other_players.conditions_x();
		}
		else if (map[68] && character.X <= max_map_x - 32)// && sprawdz == 1)						//Prawo
		{
			character.X++;
			character.conditions_x();
			other_players.conditions_x();
		}
		/*else
		{
			console.log(e.type +" | "+ e.typeof);
		}*/

			
		socket.emit('new_position_info',
		{
			real_id: character.real_id,
			//map: character.map,
			X: character.X,
			Y: character.Y
		});
		
		$('#often_used_items').text("charX="+ character.X +", charY="+ character.Y +", przyciski="+ map[87] +", "+ map[83] +", "+ map[65] +", "+ map[68]);
		i++;
		var pomocnicze_i = i;
		//console.log(i);
		setTimeout(function ()
		{
			if (pomocnicze_i == i)
			{
				if (map[87])							simulateKeyDown("w");
				else if (map[83])					simulateKeyDown("d");
				else if (map[65])					simulateKeyDown("a");
				else if (map[68])					simulateKeyDown("d");
			}
		}, 5);
	}
}

player.prototype.conditions_x = function ()
{
	if (character.X <= 666)
	{
		$("#char").css({"left": character.X +"px"});
	}
	else if (character.X > 666 && character.X < max_map_x - 698)
	{
		$("#char").css({"left": "666px"});
		$("#main_box").css({"background-position-x": - character.X + 666 +"px"});
	}
	else if (character.X >= max_map_x - 698)
	{
		$("#char").css({"left": character.X - max_map_x + 1363 +"px"});
	}
}

player.prototype.conditions_y = function ()
{
	if (character.Y <= 304)
	{
		//var characterY_position_in_pixels = character.Y * 32 - 16;
		$("#char").css({"top": character.Y +"px"});
	}
	else if (character.Y > 304 && character.Y < max_map_y - 353)
	{
		//character.mapY--;
		$("#char").css({"top": "304px"});
		//$("#main_box").css({backgroundPosition: - character.X + 666 +"px -"+ character.Y + 304 +"px"});
		$("#main_box").css({"background-position-y": - character.Y + 304 +"px"});
	}
	else if (character.Y >= max_map_y - 353)
	{
		$("#char").css({"top": character.Y - max_map_y + 656 +"px"});
	}
}


/*
							Deklaracja klasy innych graczy
*/
function players ()
{
	this.div_id = new Array();		//Konstruktor
	this.real_id = new Array();
	this.nick = new Array();
	this.X = new Array();
	this.Y = new Array();
	this.lvl = new Array();
	
	
	
		/*
	socket.emit('download_first_info', 
	{
		real_id: character.real_id,
		map: character.map,
		X: character.X,
		Y: character.Y
	});*/
	
	
	/*socket.emit('i_want_to_log_in',
	{
		nick: //<?php echo $_SESSION($nick); ?>
	});*/
}
/*
							Prototypy klasy innych graczy
*/
players.prototype.set_player = function (real_id)
{
	$("#main_box").append('<div id="PLAYER_'+ real_id +'" class="player">'+ real_id +'</div>');
	
	other_players.conditions_x();
	other_players.conditions_y();
};

players.prototype.conditions_x = function ()
{
	for (var tab_id = 0; tab_id < other_players.real_id.length; tab_id++)
	{
		if (character.X <= 666)
		{
			$(other_players.div_id[tab_id]).css({"left": other_players.X[tab_id] +"px"});
		}
		else if (character.X > 666 && character.X < max_map_x - 698)
		{
			var left = 666 + (other_players.X[tab_id] - character.X);
			$(other_players.div_id[tab_id]).css({"left": left +"px"});
		}
		else if (character.X >= max_map_x - 698)
		{
			var right = (max_map_x - other_players.X[tab_id]);
			//var left = abs(other_players.X[index] - character.X);
			//var left = $("#PLAYER_"+ other_players.real_id[i]).position().left + (other_players.X[index] - character.X);
			$(other_players.div_id[tab_id]).css({"right": right +"px"});
			
			console.log("Czemu to nie działa? "+ max_map_x +" - "+ other_players.X[i] +" = "+ right);
		}

		console.log("other_players.id[tab_id] = "+ other_players.div_id[tab_id] +"; other_players.X[tab_id] = "+ other_players.X[tab_id] +";");
	}
};

players.prototype.conditions_y = function ()
{
	for (var tab_id = 0; tab_id < other_players.real_id.length; tab_id++)
	{
		if (character.Y <= 304)
		{
			$(other_players.div_id[tab_id]).css({"top": other_players.Y[tab_id] +"px"});
		}
		else if (character.Y > 304 && character.Y < max_map_y - 353)
		{
			var top = 304 + (other_players.Y[tab_id] - character.Y);
			$(other_players.div_id[tab_id]).css({"top": top +"px"});
		}
		else if (character.Y >= max_map_y - 353)
		{
			var bottom = max_map_y - other_players.Y[tab_id];
			//var top = $("#PLAYER_"+ other_players.real_id[i]).position().top + (other_players.Y[index] - character.Y);
			$(other_players.div_id[tab_id]).css({"bottom": bottom +"px"});
		}
	}
};



/*
							Deklaracja klasy shoutboxa
*/
function shoutbox ()
{
	this.id = new Array(10);
	this.message = new Array(10);
	this.nick = new Array(10);
	this.rank = new Array(10);
	this.id[0] = 0;
	
	this.handler();
	this.handling_info();
}
/*
							Prototypy klasy shoutboxa
*/
shoutbox.prototype.send_message = function (message)
{
	socket.emit('msg',
	{
		msg: message, nick: character.nick
	});
	
	return;
};

shoutbox.prototype.handler = function ()
{
	var write_now = false;
	
	$(document).keyup(function (event)
	{
		if (event.keyCode == 13)
		{
			if (write_now == false)
			{
				write_now = true;
				$("#text_box").focus();
			}
			else if (write_now)
			{
				write_now = false;
				
				shout.send_message( $("#text_box").val() );
				
				$("#messages").append( $('<li class="message">').text(character.nick +': '+ $("#text_box").val()) );
				$("#messages").scrollTop( $("#messages").height() );
				
				$("#text_box").val("");
				$("#text_box").blur();
			}
		}
	});
};

var max_messages = 10;

shoutbox.prototype.handling_info = function ()
{
	socket.on('msg', function (data)
	{
		/*var index = shout.id.length;
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
		}
		else
		{
			shout.id[index + 1] = shout.id[index] + 1;
			shout.message[index + 1] = data.mgs;
			shout.nick[index + 1] = data.nick;
			//shout.rank[index + 1] = coś;
		}*/
		
		$("#messages").append( $('<li class="message">').text(data.nick +': '+ data.msg) );
		$("#messages").scrollTop( $("#messages").height() );
	});
};



/*
							Luźne funkcje
*/
function simulateKeyDown(character) {
  jQuery.event.trigger({ type : 'keydown', which : character.charCodeAt(0) });
}