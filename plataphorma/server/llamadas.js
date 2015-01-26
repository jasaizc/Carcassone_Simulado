
// Lós metodos van dentro de Meteor.methods ya que utilizamos Meteor para desarrollar el juego

var ArrPartidas = {} // En esta coleccion guardamos las id de todas las partidas

function mirarCierres(){
		
		cerrarCamino(pieza,false,Partida); //graficamente se debe quitar los seguidores que se hayan puesto y tal y tal
	    cerrarCiudad(pieza,false,Partida); 
	    cerrarMonasterio(pieza,false,Partida);
	
	};
	
	
 Meteor.methods({
	//Crea una nueva partida, devuelve true si se consiguio false si no
nuevaPartida: function(parametros_game){
	id_game = parametros_game[0];
	jugadores = parametros_game[1];
	
    if(ArrPartidas[id_game]== undefined){
		////console.log(id_game);	
        Partida = new Tablero(id_game);
        Partida.iniciar();
        ArrPartidas[id_game] = Partida;
        ////console.log(jugadores);
        for(i=0;i<jugadores.length;i++){
			////console.log(jugadores[i]);
			////console.log(jugadores[i][0]);
			////console.log(jugadores[i][1]);		
            if (jugadores[i][1] == "IA"){
                Partida.listaJugadores.push(new Jugador(jugadores[i][0] ,jugadores[i][1]));
                //console.log("TENEMOS UNA IA");
            }else{ 
                Partida.listaJugadores.push(new Jugador(jugadores[i][0] ,jugadores[i][1]));
                //console.log("TENEMOS UNA JUGADOR");     
            }
        }	
        //console.log("Tenemos los jugadores: ", Partida.listaJugadores);
        ArrPartidas[id_game] =  Partida;
        return Partida.listaJugadores;
        
    }else{
        //console.log("Esa id ya pertenece a una partida creada");
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
		var lugares = [];
		if(ArrPartidas[id_game]){
			Partida = ArrPartidas[id_game];
			var ficharobada = Partida.saca_pieza();
			var ficha = new Pieza(ficharobada,0,0)
			//console.log("ROBAMOS!!");
			for(var i=0; i < 3; i++)
			{
				lugar = Partida.posiblelugar(ficha);
				if(lugar.length != 0)
				{
					var j = 0;
					while(j != lugar.length)
					{
						lugar[j].y = 70-(lugar[j].y-70);
						lugares.push(lugar[j]);	
						j++;					
					}
				}
				ficha = ficha.girar();
			}
			console.log(lugares);
			var resultado = [ficha,lugares];
			//console.log("RESULTADOS: " , resultado);
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
			//console.log(Partida.posiciones);
			//console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
			var ficha = new Pieza(pieza.sprite,posicion.x,posicion.y)
			for(i=0;i< giros;i++){
				ficha = ficha.girar();
				
			}
			////console.log("asdfasd ",posicion);
			
			
			var posciones = Partida.posiblelugar(ficha);
			////console.log(ficha);
			
			if(ficha.tipo == 'CiudadD' && Partida.totalFichas == 71)
			{
				
				encaja = Partida.coloco(ficha,ficha.x,ficha.y);
				////console.log("NOS ENCAJA???", encaja);
			posicion.y = 70-(posicion.y-70);	
			}else{
			for (sitio in posciones)
			{

					//console.log("SITIOS: ", posciones[sitio].x, " ",posciones[sitio].y, "POSI: ", posicion.x, " ",posicion.y);
					if (posciones[sitio].x == posicion.x &&  posciones[sitio].y == posicion.y)
					{
							encaja = Partida.coloco(ficha, posicion.x, posicion.y);
					}
			}			
			}
			if (encaja == false) { return 0 }
			var seguidores = [];
			var jugador = _.find(Partida.listaJugadores, function (obj) { return (obj.id == id_jugador) })
			
			if (jugador.seguidores != 0) {
			    var seguidores = Partida.posibleseguidor(ficha, Partida);
			}
			ArrPartidas[id_game] = Partida;
			colocada = [encaja, seguidores];
			////console.log("TENGO ESTOS SEGUIDORES: ", seguidores);
			return colocada;

		}else{
			return undefined;
		}
	},
	
	finalizarPartida: function (id_game)
	{
	    if (ArrPartidas[id_game]) {
			Partida = ArrPartidas[id_game]
	        var puntuacion = [];
			for(var i =0; i< Partida.posiciones.length; i++){
                pieza = Partida.posiciones[i];
                	if (pieza.seguidores.length != 0){					 		
                        if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="ladron")})){
							var datapunt = cerrarCamino(pieza,true,Partida);
						}
						if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="monje")})){
							var datapunt = cerrarMonasterio(pieza,true,Partida);
						}
                        if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="caballero")})){
							var datapunt = cerrarCiudad(pieza,true,Partida);
						}
                    }
            }
            
			for (i=0; i< Partida.listaJugadores.length; i++){
				puntuacion.push([Partida.listaJugadores[i].id, Partida.listaJugadores[i].puntos]);		
			}
			var finalizar = [id_game, puntuacion];
		    
		    //console.log("MANDAMOS", finalizar);
		    Meteor.call("matchFinishCarcassone", finalizar);
		

	    } else {
	        return undefined;
	    }


	},


	colocarSeguidor: function (id_game, id_jugador, posicion, coordenadas) {

	    if (ArrPartidas[id_game]) {
	        Partida = ArrPartidas[id_game];

	        var pieza = Partida.piezaenposiciones(coordenadas.x, coordenadas.y);
	        
	        var colocado = Partida.colocarseguidor(pieza, posicion, Partida, id_jugador);
	    

	        //cerrarMonasterio(pieza,false,Partida); //Metodo que llama para mirar si es cierre Monasterio
	        ArrPartidas[id_game] = Partida;
	        //console.log("COOOOOOOOOOOOOOOOOLOCADO SEGUIDOR---", colocado[0], colocado[1])

			mirarCierres(pieza);
	        return colocado;

	    } else {
	        return false;
	    }
	},

	eliminarPartida: function(id_game){
		if(ArrPartidas[id_game]){
			delete ArrPartidas[id_game];
		}else{
			//console.log("Partida no encontrada");
		}
	},

    JugadorArtificial: function(id_partida,id_jugador){
        Tablero = ArrPartidas[id_partida];
        //console.log("VAMOS MARIANO QUE TE TOCA A TI", id_jugador);
        var ColocoFicha = false;
        Jugada = jugadorIA(id_jugador, Tablero);
        var Piezanueva = new Pieza(Jugada[0], Jugada[2], Jugada[3]);
        for (var i = 0; i < Jugada[1]; i++) {
                Piezanueva = Piezanueva.girar()
            }
        Piezanueva.giros = Jugada[4];
        ColocoFicha = Tablero.coloco(Piezanueva, Jugada.coorx, Jugada.coory);
        var nuevoSeguidor = {tipoSeguidor:undefined, PosEnFicha:undefined, IdJugador:undefined, TipoFicha:undefined}
        var seguidores = [];
		var jugador = _.find(Partida.listaJugadores, function (obj) { return (obj.id == id_jugador) })			
		if (jugador.seguidores != 0) 
		{
			var seguidores = Partida.posibleseguidor(Piezanueva, Tablero);
		}
		/*
		if(seguidores.length != 0)
		{
			
				elquesigue = seguidores[seguidores.length];
				//console.log(seguidores[seguidores.length]);
			
		}
		//console.log("seguidores:::::" , elquesigue);*/
        // CierroCamino(ColocoFicha);
        // CierroMonasterio(colocando);
        // CierroCiudad(ColocoFicha);
        
        ArrPartidas[id_partida] = Tablero;
        return [Piezanueva.tipo, Piezanueva.giros, Piezanueva.x, Piezanueva.y, Tablero.listaJugadores, nuevoSeguidor.tipoSeguidor, nuevoSeguidor.PosEnFicha]
    }
});
