/*******************************************************************************
 *  Publish collections
 */

Meteor.publish("all_games", function () {
    // publish every field of every game
    return Games.find();
});

Meteor.publish("all_players", function () {
    // publish every field of every game
    return Players.find();
});

Meteor.publish("all_rooms", function () {
    // publish every field of every game
    return Rooms.find();
});

Meteor.publish("all_joinPlayers", function () {
    // publish every field of every game
    return JoinPlayer.find();
});

Meteor.publish("users", function () {
    // publish every field of every game
    return Meteor.users.find();
});



Meteor.publish("current_scores", function(current_game){
    var filtro;

    if (current_game == "none")
	filtro = {};
    else 
	filtro = {game_id: current_game};

    // publish every field of the latest 5 matches sorted by points in
    // descending order
    return Scores.find(filtro,{});
    
});

Meteor.publish("messages_current_game", function (current_game) {

    return Messages.find({game_id: current_game}, 
			 {limit:5, sort: {time:-1}});
    
});


Meteor.publish("messages_current_room", function (currentRoom) {

    return Messages.find({id_room: currentRoom}, 
             {limit:5, sort: {time:-1}});
    
});


//Definición de permisos de usuarios que intentan tocar dentro de la colección users.
function adminUser(userId) {
    var adminUser = Meteor.users.findOne({username: "admin"});
    return (userId && adminUser && userId === adminUser._id);
}

//*****************ALERT SOLO EL ADMIN DEBE CAMBIAR EL PLAYERS 
Players.allow({
    insert: function(userId, doc){

    return Meteor.userId();
    },
    remove: function (userId, docs){

    return Meteor.userId();
    },
    update: function (userId, docs){

    return Meteor.userId();//esto lo hace el admin
    },
});

Messages.allow({
    insert: function(userId, doc){

	return Meteor.userId();
    },
    remove: function (userId, docs){

	return adminUser(userId);
    }
});

//***************** ALERT ZONA PROVISIONAL
Scores.allow({
    insert: function(userId, doc){

    return Meteor.userId();
    },
    remove: function (userId, docs){

    return adminUser(userId);
    }
});

JoinPlayer.allow({
    insert: function(userId, doc){

	return Meteor.userId();
    },
    remove: function (userId, docs){

	return Meteor.userId();
    }
});

//Permisos añadidos para que los usuarios puedan insertar en Rooms

Rooms.allow({
    insert: function(userId, doc){

	return Meteor.userId();
    },
    remove: function (userId, docs){

	return Meteor.userId();
    },
    update: function (userId, docs){

    return Meteor.userId();
    },
});


Meteor.users.allow({
	remove: function(userId,doc){		//Solo el administrador puede eliminar cuentas de jugadores.
		return adminUser(userId);
	},
	update: function(userId,doc){		
		return Meteor.userId();
	}
});

//Insertar puntuación al acabar un juego

Meteor.methods({
    matchFinish: function (game, points,varstate) {
    if(varstate==null){
       varstate='';
    }
	if (this.userId)
	    Scores.insert ({
                 user_id: this.userId, 
			     time_end: Date.now(),
			     points: points,
			     game_id: game,
                 state: varstate
			    });
    },
    matchFinishCarcassone: function (state,points){
    	if (this.userId){
    		if(state=="ganada"){
    			Meteor.users.update({_id:this.userId}, { $inc: { total_points: +points , victories: +1 } });
    		}else if(state="perdida"){
    			Meteor.users.update({_id:this.userId}, { $inc: { total_points: +points , defeats: +1 } });
    		}else{
    			Meteor.users.update({_id:this.userId}, { $inc: { total_points: -50 , dropouts: +1 } });
    		}
    	}
    },
    matchInit: function(room,players){
        console.log(room)
        nuevaPartida(room, players)
        
        //console.log(comenzar(room,players))
    }
});



/*******************************************************************************
 *  Inicializacion del juego
 */
Meteor.startup(function() {
    // Miramos si la coleccion de objetos esta vacia, y en caso de estarlo añadimos los juegos
    if (Games.find().count() == 0) {
		Games.insert({name: "Carcassone",banner: "http://domneuve.com/img/Carcassone%20banner.jpg",presentation:"¡Conviertete en el mas poderoso señor feudal de todos los reinos existentes! Comanda a tus caballeros, apoya el poder del clero y contrata a mercenarios y bandidos para que hagan el trabajo sucio."});
		Games.insert({name: "AlienInvasion",banner: "http://ccchuntersville.com/wp-content/uploads/2012/04/Aliens-Banner.jpg",presentation:"Emocionante juego de naves espaciales. Se el piloto de la nave Karsis y embarcate en la defensa del sistema solar contra la amenaza de Andromeda. El futuro de la raza humana esta en tus manos",tutorial:"Use los botones de dirección del teclado para manejar la nave. Con el botón espacio puede disparar. La destrucción de la nave supone el reseteo del juego"});
		Games.insert({name: "FrootWars",banner: "http://www.viralvideopalace.com/wp-content/uploads/mvbthumbs/img_14457_annoying-orange-monster-burger.jpg",presentation:"¡La batalla ha comenzado! Comida hipercalorífica contra fruta sana... nunca antes en la historia se había visto una batalla tan sangrienta... . Gore en estado puro.",tutorial:"Use el ratón para tensar el tirachinas y lanzar la fruta para golpear la comida basura"});

        /**
		Players.insert({user_name:"Pepe",total_points:8,victories:5,defeats:2,dropouts:0});
		Players.insert({user_name:"Antonio",total_points:14,victories:7,defeats:0,dropouts:0});
		Players.insert({user_name:"Manolo",total_points:20,victories:10,defeats:0,dropouts:0});
		Players.insert({user_name:"Jesulin",total_points:40,victories:30,defeats:20,dropouts:0});
		Players.insert({user_name:"Carmensita",total_points:0,victories:10,defeats:20,dropouts:0});
        */
		
		Rooms.insert({user_name:"Pepiño",max_players:5,max_IAs:1,in_players:2,date:0,start:false});
		Rooms.insert({user_name:"Antonio",max_players:5,max_IAs:1,in_players:2,date:0,start:false});
		Rooms.insert({user_name:"Manolo",max_players:5,max_IAs:1,in_players:2,date:0,start:false});
		Rooms.insert({user_name:"Jesulin",max_players:5,max_IAs:1,in_players:2,date:0,start:false});
		Rooms.insert({user_name:"Pepiño",max_players:5,max_IAs:1,in_players:2,date:0,start:false});
		

	};
});
