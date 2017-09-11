/*
							Deklaracja klasy gracza
*/
function player (id, real_id, nick, map, X, Y, hp, max_hp, mana, max_mana, exp, need_exp, lvl, gold, bank)
{//("CHAR", data.login, data.map, data.charX, data.charY, data.mapX, data.mapY, data.hp, data.max_hp, data.mana, data.max_mana, data.exp, data.next_lvl, data.lvl, data.gold, data.bank)
	//inni.call(this, id);	//Dziedziczenie					//Nie da się zrobić dziedziczenia pojedyńczyche elementów
	this.id = id;		//Konstruktor
	this.real_id = real_id;
	this.nick = nick;
	this.map = map;
	this.X = X;
	this.Y = Y;
	this.hp = hp;
	this.max_hp = max_hp;
	this.mana = mana;
	this.max_mana = max_mana;
	this.exp = exp;
	this.need_exp = need_exp;
	this.lvl = lvl;
	this.gold = gold;
	this.bank = bank;
	
	//this.set_map();
	setTimeout(function()
	{
		character.calculate_map_position();
		
	}, 1);
	
	
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
}
/*
							Prototypy klasy gracza
*/
player.prototype.calculate_map_position = function ()
{
	this.conditions_x();
	this.conditions_y();
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
	var map = {}; // You could also use an array
	onkeydown = onkeyup = function(e){
		e = e || event; // to deal with IE
		map[e.keyCode] = e.type == 'keydown';
		/* insert conditional here */

		
		if (map[87] && character.Y >= 1 && map[65] && character.X >=1)							//Góra + Lewo
		{
			character.Y--;
			character.conditions_y();
			character.X--;
			character.conditions_x();
		}
		else if (map[87] && character.Y >= 1 && map[68] && character.X <= max_map_x - 32)		//Góra + Prawo
		{
			character.Y--;
			character.conditions_y();
			character.X++;
			character.conditions_x();
		}
		else if (map[83] && character.Y <= max_map_y - 48 && map[65] && character.X >= 1)		//Dół + Lewo
		{
			character.Y++;
			character.conditions_y();
			character.X--;
			character.conditions_x();
		}
		else if (map[83] && character.Y <= max_map_y - 48 && map[68] && character.X <= max_map_x - 32)			//Dół + Prawo
		{
			character.Y++;
			character.conditions_y();
			character.X++;
			character.conditions_x();
		}
		
		if (map[87] && character.Y >= 1)// && sprawdz == 1)												//Góra
		{
			character.Y--;
			character.conditions_y();
		}
		else if (map[83] && character.Y <= max_map_y - 48)// && sprawdz == 1)						//Dół
		{
			character.Y++;
			character.conditions_y();
		}
		else if (map[65] && character.X >= 1)// && sprawdz == 1)											//Lewo
		{
			character.X--;
			character.conditions_x();
		}
		else if (map[68] && character.X <= max_map_x - 32)// && sprawdz == 1)						//Prawo
		{
			character.X++;
			character.conditions_x();
		}
		
		socket.emit('position_info',
		{
			real_id: character.real_id,
			map: character.map,
			X: character.X,
			Y: character.Y
		});
		
		$('#messages').text("charX="+ character.X +", charY="+ character.Y +", mapX="+ character.mapX +", mapY="+ character.mapY);
		//character.calculate_map_position();
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


var max_players = 10;
/*
							Deklaracja klasy innych graczy
*/
function players ()
{
	this.id = new Array(max_players);		//Konstruktor
	this.real_id = new Array(max_players);
	this.nick = new Array(max_players);
	this.X = new Array(max_players);
	this.Y = new Array(max_players);
	this.lvl = new Array(max_players);
	
	setTimeout(function()
	{
		other_players.calculate_map_position();
	}, 1);
	
	
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
players.prototype.calculate_map_position = function ()
{
	//this.conditions_x();
	//this.conditions_y();
};