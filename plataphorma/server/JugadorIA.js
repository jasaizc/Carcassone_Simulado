jugadorIA=function(id_jugador, Partida){
	var nuevaficha;
    this.robar = function () {
        var robado = Partida.saca_pieza();
        var TotalPosiciones = [];
        nuevaficha = new Pieza(robado, 0, 0);       
        for(var i = 0; i < 3; i++)
        {
			nuevaficha = nuevaficha.girar();
			console.log("ESTAMOS ROTANDO: ", nuevaficha);
		    posicion = Partida.posiblelugar(nuevaficha);
		    console.log("¿La cantidad de posiciones son ? ",posicion.length);
		    if(posicion.length != 0)
		    {
				TotalPosiciones.push(posicion);
				console.log("¿La posicion nueva es? ",posicion);	
			}
		}
		console.log("¿La posiciones TOTALES SON? ", TotalPosiciones);
        if (TotalPosiciones.length == 0 && Partida.totalFichas != 71) { this.robar() }
    };

    this.robar();

    var TipoJugada = { puntos: 0, coorx: 0, coory: 0, giros: 0, }
    
        var ProbarColocarFicha = function (ngiros) {

        var colocando = Partida.coloco(nuevaficha, this.nuevaficha.encajaCon[coordenadas].x, this.nuevaficha.encajaCon[coordenadas].y);
        console.log("COLOCAMOS?!?!?!");
        if (colocando)
        {
            //Aqui Comparo Que es la Mejor Jugada, Por ahora vamos a decidir que si que es la mejor jugada, sin añadir seguidores.

           //Comprobamos cuando los tengamos hechos si cerramos algun camino, Ciudad o convento
            // CierroCamino(colocando);
            // CierroMonasterio(colocando);
            // CierroCiudad(colocando);
			console.log("COLOCAMOS?!?!?!");
            var jugador = _.find(Partida.listaJugadores, function (obj) { return (obj.id.user_id == nJugador) });
            TipoJugada = { puntos: jugador.puntos, coorx: this.nuevaficha.EncajaCon[coordenadas].x, coory: this.nuevaficha.EncajaCon[coordenadas].y, giros: ngiros, }
            return true
        }
        else{
			return false;
			}
    }

    for (coordenadas in nuevaficha.EncajaCon) { //Esto nos sirve para ver con que piezas nos encaja la nuestra
        
        if(!ProbarColocarFicha(0))
		{
			this.nuevaficha = this.nuevaficha.girar();
			if(!ProbarColocarFicha(1))
			{
				this.nuevaficha = this.nuevaficha.girar();
				this.nuevaficha = this.nuevaficha.girar();
				if(!ProbarColocarFicha(2))
				{
					this.nuevaficha = this.nuevaficha.girar();
					this.nuevaficha = this.nuevaficha.girar();
					this.nuevaficha = this.nuevaficha.girar();
					ProbarColocarFicha(3);
				}
			}
		}
		return [this.nuevaFicha.Tipo, TipoJugada];
    }

    


}
