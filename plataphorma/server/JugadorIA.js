jugadorIA=function(id_jugador, Partida){
	var nuevaficha;
    this.robar = function () {
        var robado = Partida.saca_pieza();
        //var TotalPosiciones = [];
        nuevaficha = new Pieza(robado, 0, 0);       
        for(var i = 0; i < 3; i++)
        {
			
			console.log("ESTAMOS ROTANDO: ", nuevaficha);
		    posicion = Partida.posiblelugar(nuevaficha);
		    console.log("¿La cantidad de posiciones son ? ",posicion.length);
		    if(posicion.length != 0)
		    {
				nuevaficha.EncajaCon.push(posicion);
				//TotalPosiciones.push(posicion);
				console.log("¿La posicion nueva es? ",posicion);	
				break;
			}
			nuevaficha = nuevaficha.girar();
		}
		console.log("¿La posiciones TOTALES SON? ", nuevaficha.EncajaCon);
		//nuevaficha.EncajaCon = TotalPosiciones;
        if (nuevaficha.EncajaCon.length == 0 && Partida.totalFichas != 71) { this.robar() }
    };

    this.robar();

    var TipoJugada = [];
    
        var ProbarColocarFicha = function (ngiros) {
		console.log("ESTA FICHA ES?!?!?: ",nuevaficha);
        var colocando = Partida.coloco(nuevaficha, nuevaficha.EncajaCon[0].x, nuevaficha.EncajaCon[0].y);
        console.log("COLOCAMOS?!?!?!");
        if (colocando)
        {
            //Aqui Comparo Que es la Mejor Jugada, Por ahora vamos a decidir que si que es la mejor jugada, sin añadir seguidores.

           //Comprobamos cuando los tengamos hechos si cerramos algun camino, Ciudad o convento
            // CierroCamino(colocando);
            // CierroMonasterio(colocando);
            // CierroCiudad(colocando);
			
            var jugador = _.find(Partida.listaJugadores, function (obj) { console.log("COLOCAMOS?!?!?! ", obj.id); return (obj.id == id_jugador) });
            TipoJugada.push(nuevaficha.tipo);
            TipoJugada.push(jugador.puntuacion);
            TipoJugada.push(nuevaficha.EncajaCon[0].x);
            TipoJugada.push(nuevaficha.EncajaCon[0].y);
            TipoJugada.push(ngiros);
            console.log("QUIERES MOSTRAR DE UNA PUTA VEZ ", TipoJugada[2]);
            return true
        }
        else{
			return false;
			}
    }

    //for (coordenadas in nuevaficha.EncajaCon) { //Esto nos sirve para ver con que piezas nos encaja la nuestra
        
        if(!ProbarColocarFicha(0))
		{
			console.log("ROTAMOSSSS",nueva.ficha);
			nuevaficha = nuevaficha.girar();
			if(!ProbarColocarFicha(1))
			{
				console.log("ROTAMOS2",nueva.ficha);
				nuevaficha = nuevaficha.girar();
				nuevaficha = nuevaficha.girar();
				if(!ProbarColocarFicha(2))
				{
					console.log("ROTAMOS3",nueva.ficha);
					nuevaficha = nuevaficha.girar();
					nuevaficha = nuevaficha.girar();
					nuevaficha = nuevaficha.girar();
					ProbarColocarFicha(3);
				}
			}
		//}
		
    }
		console.log("Jugada?!?!?! ", TipoJugada);
		return TipoJugada;
    


}
