jugadorIA=function(id_jugador, Tablero){
	var nuevaficha;
    this.robar = function () {
        var robado = Tablero.saca_pieza();
        var TotalPosiciones = [];
        nuevaficha = new Pieza(robado, 0, 0);       
        for(var i = 0; i < 3; i++)
        {
			nuevaficha = nuevaficha.girar();
			console.log("ESTAMOS ROTANDO: ", nuevaficha);
		    posicion = Tablero.posiblelugar(nuevaficha);
		    console.log("¿La cantidad de posiciones son ? ",posicion.length);
		    if(posicion.length != 0)
		    {
				TotalPosiciones.push(posicion);
				console.log("¿La posicion nueva es? ",posicion);	
			}
		}
		console.log("¿La posiciones TOTALES SON? ", TotalPosiciones);
        if (TotalPosiciones.length == 0 && Tablero.totalFichas != 71) { this.robar() }
    };

    this.robar();

    var TipoJugada = { puntos: 0, coorx: 0, coory: 0, giros: 0, }
    var ProbarColocarFicha = function (ngiros) {
        TableroAux = new Tablero(10000000);
        TableroAux.iniciar();
        for (i in Tablero.posicion) {
             TableroAux.posicion[i] = Tablero.posicion[i] 
        }
        listaPuntos = []
        for (i in Tablero.listaJugadores) {
            listaPuntos.push(Tablero.listaJugadores[i].puntos);
        }

        var colocando = Tablero.coloco(nuevaficha, this.nuevaficha.encajaCon[coordenadas].x, this.nuevaficha.encajaCon[coordenadas].y);
        if (colocando)
        {
            //Aqui Comparo Que es la Mejor Jugada, Por ahora vamos a decidir que si que es la mejor jugada, sin añadir seguidores.

           //Comprobamos cuando los tengamos hechos si cerramos algun camino, Ciudad o convento
            // CierroCamino(colocando);
            // CierroMonasterio(colocando);
            // CierroCiudad(colocando);

            var jugador = _.find(Tablero.listaJugadores, function (obj) { return (obj.id.user_id == nJugador) });
            TipoJugada = { puntos: jugador.puntos, coorx: this.nuevaficha.EncajaCon[coordenadas].x, coory: this.nuevaficha.EncajaCon[coordenadas].y, giros: ngiros, }
            for (i in Tablero.listaJugadores) {
                Tablero.listaJugadores[i].puntos = listaPuntos[i];
            }
        }
    }

    for (coordenadas in nuevaficha.EncajaCon) { //Esto nos sirve para ver con que piezas nos encaja la nuestra
        
        ProbarColocarFicha(0);
        this.nuevaficha = this.nuevaficha.girar();
        ProbarColocarFicha(1);
        this.nuevaficha = this.nuevaficha.girar();
        this.nuevaficha = this.nuevaficha.girar();
        ProbarColocarFicha(2);
        this.nuevaficha = this.nuevaficha.girar();
        this.nuevaficha = this.nuevaficha.girar();
        this.nuevaficha = this.nuevaficha.girar();
        ProbarColocarFicha(3);
    }

    return [this.nuevaFicha.Tipo, TipoJugada];


}
