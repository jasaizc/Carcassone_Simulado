
// Lós metodos van dentro de Meteor.methods ya que utilizamos Meteor para desarrollar el juego

var ArrPartidas = {} // En esta coleccion guardamos las id de todas las partidas
 Meteor.methods({
	//Crea una nueva partida, devuelve true si se consiguio false si no
nuevaPartida: function(parametros_game){
	id_game = parametros_game[0];
	jugadores = parametros_game[1];
	
    if(ArrPartidas[id_game]== undefined){
		console.log(id_game);	
        Partida = new Tablero(id_game);
        Partida.iniciar();
        ArrPartidas[id_game] = Partida;
        //console.log(jugadores);
        for(i=0;i<jugadores.length;i++){
			console.log(jugadores[i]);
			console.log(jugadores[i][0]);
			console.log(jugadores[i][1]);		
            if (jugadores[i][1] == "IA"){
                Partida.listaJugadores.push(new Jugador(jugadores[i][0] ,jugadores[i][1]));
                console.log("TENEMOS UNA IA");
            }else{ 
                Partida.listaJugadores.push(new Jugador(jugadores[i][0] ,jugadores[i][1]));
                console.log("TENEMOS UNA JUGADOR");     
            }
        }	
        console.log("Tenemos los jugadores");
        ArrPartidas[id_game] =  Partida;
        return Partida.listaJugadores;
        
    }else{
        console.log("Esa id ya pertenece a una partida creada");
        Partida=ArrPartidas[id_game];
        return Partida.listaJugadores;
    }
},

	//Los jugadores se añaden de uno en 1 y solo se podran meter en partidas ya creadas devuelve true si se consiguio, false si no
	
	/*Se comprueba que la partida tiene menos de 5 jugadores entre las IAS y los jugadores reales, se devuelve false si
	  el numero excede el maximo. Se devuelve la lista de jugadores si es correcto. Ademas elige aleatoriamente quien
	  comienza el juego */


	//Roba una ficha, si id = id_game es un juego existente, devuelve la ficha
	// y las posicones donde se pueden colocar, si no devuelve false, si no quedan piezas que extraer devuelve undefined
	robarFicha: function(id_game){
		if(ArrPartidas[id_game]){
			Partida = ArrPartidas[id_game];
			var ficharobada = Partida.saca_pieza();
			var ficha = new Pieza(ficharobada,0,0)
			console.log("ROBAMOS!!");
			lugares = Partida.posiblelugar(ficha);
			var resultado = [ficha,lugares];
			ArrPartidas[id_game] =  Partida;
			return resultado;
		}else{
			return false;
		}
	},
	

	//Devuelve el turno en el que se encuentra la partida con id = id_game, si no existe devuelve undefined
	turnoActual: function(id_game){
		if(ArrPartidas[id_game]){
			return ArrPartidas[id_game].turno
		}else{
			return undefined;
		}
	},
	
	//Pasa al siguiente turno de la partida id = id_game, devuelve el turno siguiente y si no existe esa partida devuelve undefined
	cambiarTurno: function(id_game){
		if(ArrPartidas[id_game]){
			Partida = ArrPartidas[id_game];
			if(Partida.turno===Partida.listaJugadores.length-1){
				Partida.turno=0;
			}else{
				Partida.turno++;
			}
			return Partida.turno;
		}else{
			return undefined;
		}
	},

	//Coloca una ficha en una posición, devuelve la lista de posiciones donde se puede colocar un seguidor si se ha conseguido, 0 en caso de que no se pueda
	colocarFicha: function (id_game, pieza, posicion, giros, id_jugador) {
      
    
	    if (ArrPartidas[id_game]) {
	        var encaja = false;
			Partida = ArrPartidas[id_game];
			var ficha = new Pieza(pieza.sprite,posicion.x,posicion.y)
			for(i=0;i<giros;i++){
				ficha = ficha.girar();
			}
			console.log("asdfasd ",posicion);
			var posciones = Partida.posiblelugar(ficha);
			console.log(ficha);
			console.log("POSCIONES  ",posciones);
			if(ficha.tipo == 'CiudadD' && Partida.totalFichas == 71)
			{
				
				encaja = Partida.coloco(ficha,ficha.x,ficha.y);
				console.log("NOS ENCAJA???", encaja);
				
			}else{
			//El if comprueba que la posicion este dentro de las posibles posicones donde podemos colocar
			if(Partida.posiblelugar(ficha).indexof(posicion)<=0){
				encaja = Partida.coloco(ficha);
			}}
			if (encaja == false) { return 0 }
			var seguidores = [];
			var jugador = _.find(Partida.listaJugadores, function (obj) { return (obj.id == id_jugador) })
			
			if (jugador.seguidores != 0) {
			    var seguidores = Partida.posibleseguidor(ficha, Partida);
			}
			ArrPartidas[id_game] = Partida;
      
			console.log("TENGO ESTOS SEGUIDORES: ", seguidores);
			return seguidores;

		}else{
			return undefined;
		}
	},
	
	finalizarPartida: function (id_game)
	{
	    if (ArrPartidas[id_game]) {
			Partida = ArrPartidas[id_game]
	    	console.log("llamamos a finalizar");
	        var puntuacion = [];
           /* Partida= ArrPartidas[id_game];
            for(var i =0; i< Partida.posiciones.length; i++)
            {
                pieza = Partida.posiciones[i];
                	if (pieza.seguidores.length != 0){
					 		
						if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Granjero")})){cerrarGranja(pieza,true,Partida);}
                        if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Ladron")})){cerrarCamino(pieza,true,Partida);}
						if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Monje")})){cerrarMonasterio(pieza,true,Partida);}
                        if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Caballero")})){cerrarCiudad(pieza,true,Partida);}
                        }
            }*/
            
            console.log("MANDAMOS", Partida.listaJugadores);
            Partida.listaJugadores[0].puntos = 5;
            Partida.listaJugadores[1].puntos = 0;
			for (i=0; i< Partida.listaJugadores.length; i++){
			
			puntuacion.push([Partida.listaJugadores[i].id, Partida.listaJugadores[i].puntos]);
			
			}
			var finalizar = [id_game, puntuacion];
		    
		    console.log("MANDAMOS", finalizar);
		    Meteor.call("matchFinishCarcassone", finalizar);
		

	    } else {
	        return undefined;
	    }


	},

	colocarSeguidor: function (id_game, id_jugador, posicion, seguidor) {
	    if (ArrPartidas[id_game]) {
	        Partida = ArrPartidas[id_game];
	        var pieza = Partida.piezaenposiciones(posicion.x, posicion.y);
	        if (seguidor > 0)
	        {
	           var colocado = Partida.colocarseguidor(pieza, seguidor);
	        }
	        cerrarMonasterio(pieza,false,Partida); //Metodo que llama para mirar si es cierre Monasterio
	        ArrPartidas[id_game] = Partida;
	        return Partida.listaJugadores;

	    } else {
	        return undefined;
	    }
	},

	eliminarPartida: function(id_game){
		if(ArrPartidas[id_game]){
			delete ArrPartidas[id_game];
		}else{
			console.log("Partida no encontrada");
		}
	},

    JugadorArtificial: function(id_partida,id_jugador){
        Tablero = ArrPartidas[id_partida];
        console.log("VAMOS MARIANO QUE TE TOCA A TI", id_jugador);
        var ColocoFicha = false;
  //      while (ColocoFicha == false)
 //       { //Bucle en el cual probamos a colocar las fichas, Robamos con la clase JUGADORIA, y la colocamos, no podemos, tendremos que volver a robar otra ficha y realziar el mismo proceso.
            Jugada = jugadorIA(id_jugador, Tablero);
            console.log("MENUDO JUGADON MARIANO: ", Jugada[0], "Otra ",Jugada[1],"Viva el vino" ,Jugada[2]);
            var Piezanueva = new Pieza(Jugada[0], Jugada[2], Jugada[3]);
            
            console.log("¿Ha sido Colocada?", Piezanueva);
            for (var i = 0; i < Jugada.giros; i++) {
                Piezanueva = Piezanueva.girar()
            }
            ColocoFicha = Tablero.coloco(Piezanueva, Jugada.coorx, Jugada.coory);
         //   if (ColocoFicha)
         //   {
		//		console.log("¿Ha sido Colocada? Juanita?", ColocoFicha);
				
		//	}
            
        // }
        var nuevoSeguidor = {tipoSeguidor:undefined, PosEnFicha:undefined, IdJugador:undefined, TipoFicha:undefined}
       // var jugador = _.find(Tablero.listaJugadores, function (obj) { return (obj.id.user_id == id_jugador) })
      /*  if (jugador.seguidores > 0)
        {
            if (ColocoFicha.tipo == "MonCamino" || ColocoFicha.tipo == "MonGranja")
            {
                nuevoSeguidor = { tipoSeguidor: "monje", PosEnFicha: 5, IdJugador: jugador.id, TipoFicha: ColocoFicha }
                Tablero.colocarseguidor(ColocoFicha, nuevoSeguidor.PosEnFicha);
            }
            else
            {
                var posiciones = posibleseguidor(ColocoFicha);
                if (posiciones.length > 0)
                {
                    var Pos_Aleatorio = Math.floor(Math.random() * posiciones.length);
                    seguidor = posiciones[Pos_Aleatorio];
                    nuevoSeguidor = { tipoSeguidor: seguidor.tipo, PosEnFicha: seguidor.posicion, IdJugador: jugador.numero, TipoFicha: fichaColocada }
                    Tablero.colocarseguidor(ColocoFicha, nuevoSeguidor.PosEnFicha);
                }
            }
        }*/
        // CierroCamino(ColocoFicha);
        // CierroMonasterio(colocando);
        // CierroCiudad(ColocoFicha);
        ArrPartidas[id_partida] = Tablero;
        return [Piezanueva.tipo, Piezanueva.giros, Piezanueva.x, Piezanueva.y, Tablero.listaJugadores, nuevoSeguidor.tipoSeguidor, nuevoSeguidor.PosEnFicha]
    }
});
