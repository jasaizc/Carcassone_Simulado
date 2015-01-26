jugadorIA=function(id_jugador, Partida){
	var nuevaficha;
	var numerogiros = 0;
    this.robar = function () {
        var robado = Partida.saca_pieza();
        //var TotalPosiciones = [];
        nuevaficha = new Pieza(robado, 0, 0);       
        for(var i = 0; i < 3; i++)
        {
			
			//console.log("ESTAMOS ROTANDO: ", nuevaficha);
		    posicion = Partida.posiblelugar(nuevaficha);
		    //console.log("¿La cantidad de posiciones son ? ",posicion.length, "Y las posiciones son: ", posicion );
		    if(posicion.length != 0)
		    {
				var j = 0;
				//console.log(j);
				//console.log("¿La posicion total es? ",posicion.length);
				while(j != posicion.length)
				{
					
				nuevaficha.EncajaCon.push(posicion[j]);
				//TotalPosiciones.push(posicion);
				//console.log("¿La posicion nueva es? ",posicion[j]);
				
				j++;
				}
				break;
			}
			nuevaficha = nuevaficha.girar();
			numerogiros = numerogiros + 1;
		}
		//console.log("¿Los GIROS SON? ", numerogiros);
		//console.log("¿La posiciones TOTALES SON? ", nuevaficha.EncajaCon);
		//nuevaficha.EncajaCon = TotalPosiciones;
        if (nuevaficha.EncajaCon.length == 0 && Partida.totalFichas != 71) { this.robar() }
    };

    this.robar();

    var TipoJugada = [];
    
        var ProbarColocarFicha = function (ngiros) {
		//console.log("ESTA FICHA ES?!?!?: ",nuevaficha);
        var colocando = Partida.coloco(nuevaficha, nuevaficha.EncajaCon[0].x, nuevaficha.EncajaCon[0].y);
        //console.log("COLOCAMOS?!?!?!");
        if (colocando)
        {
            //Aqui Comparo Que es la Mejor Jugada, Por ahora vamos a decidir que si que es la mejor jugada, sin añadir seguidores.

           //Comprobamos cuando los tengamos hechos si cerramos algun camino, Ciudad o convento
            // CierroCamino(colocando);
            // CierroMonasterio(colocando);
            // CierroCiudad(colocando);
			
            var jugador = _.find(Partida.listaJugadores, function (obj) { //console.log("COLOCAMOS?!?!?! ", obj.id); return (obj.id == id_jugador) });
            TipoJugada.push(nuevaficha.tipo);
            TipoJugada.push(jugador.puntuacion);
            TipoJugada.push(nuevaficha.EncajaCon[0].x);
           
            nuevaficha.EncajaCon[0].y = 70-(nuevaficha.EncajaCon[0].y-70);

            TipoJugada.push(nuevaficha.EncajaCon[0].y);
            TipoJugada.push(numerogiros);
            //console.log("QUIERES MOSTRAR DE UNA PUTA VEZ ", TipoJugada);
            return true
        }
        else{
			return false;
			}
    }

    //for (coordenadas in nuevaficha.EncajaCon) { //Esto nos sirve para ver con que piezas nos encaja la nuestra
        
        if(!ProbarColocarFicha(0))
		{
			//console.log("ROTAMOSSSS",nueva.ficha);
			nuevaficha = nuevaficha.girar();
			if(!ProbarColocarFicha(1))
			{
				//console.log("ROTAMOS2",nueva.ficha);
				nuevaficha = nuevaficha.girar();
				nuevaficha = nuevaficha.girar();
				if(!ProbarColocarFicha(2))
				{
					//console.log("ROTAMOS3",nueva.ficha);
					nuevaficha = nuevaficha.girar();
					nuevaficha = nuevaficha.girar();
					nuevaficha = nuevaficha.girar();
					ProbarColocarFicha(3);
				}
			}
		//}
		
    }
		//console.log("Jugada?!?!?! ", TipoJugada);
		return TipoJugada;
    


}
