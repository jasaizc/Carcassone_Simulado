var TPiezas = {
	Recto:        {Arriba: 'Camino' , Abajo : 'Camino' , Derecha: 'Granja' , Izquierda: 'Granja' , Escudo: 0},
	Curva:        {Arriba: 'Granja' , Abajo : 'Camino' , Derecha: 'Granja' , Izquierda: 'Camino' , Escudo: 0},
	Cruce3:       {Arriba: 'Granja' , Abajo : 'Camino' , Derecha: 'Camino' , Izquierda: 'Camino' , Escudo: 0},
	Cruce4:       {Arriba: 'Camino' , Abajo : 'Camino' , Derecha: 'Camino' , Izquierda: 'Camino' , Escudo: 0},
	MonCamino:    {Arriba: 'Granja' , Abajo : 'Camino' , Derecha: 'Granja' , Izquierda: 'Granja' , Escudo: 0},
	MonGranja:    {Arriba: 'Granja' , Abajo : 'Granja' , Derecha: 'Granja' , Izquierda: 'Granja' , Escudo: 0},
	CiudadC:      {Arriba: 'Ciudad' , Abajo : 'Ciudad' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 1},
	CiudadD:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Camino' , Izquierda: 'Camino' , Escudo: 0},
	CiudadE:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Granja' , Izquierda: 'Granja' , Escudo: 0},
	CiudadF:      {Arriba: 'Granja' , Abajo : 'Granja' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 1},
	CiudadG:      {Arriba: 'Granja' , Abajo : 'Granja' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 0},
	CiudadH:      {Arriba: 'Ciudad' , Abajo : 'Ciudad' , Derecha: 'Granja' , Izquierda: 'Granja' , Escudo: 0},
	CiudadI:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Ciudad' , Izquierda: 'Granja' , Escudo: 0},
	CiudadJ:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Camino' , Izquierda: 'Granja' , Escudo: 0},
	CiudadK:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Granja' , Izquierda: 'Camino' , Escudo: 0},
	CiudadL:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Camino' , Izquierda: 'Camino' , Escudo: 0},
	CiudadM:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Granja' , Izquierda: 'Ciudad' , Escudo: 1},
	CiudadN:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Granja' , Izquierda: 'Ciudad' , Escudo: 0},
	CiudadO:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Camino' , Izquierda: 'Ciudad' , Escudo: 1},
	CiudadP:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Camino' , Izquierda: 'Ciudad' , Escudo: 0},
	CiudadQ:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 1},
	CiudadR:      {Arriba: 'Ciudad' , Abajo : 'Granja' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 0},
	CiudadS:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 1},
	CiudadT:      {Arriba: 'Ciudad' , Abajo : 'Camino' , Derecha: 'Ciudad' , Izquierda: 'Ciudad' , Escudo: 0}

}

Jugador = function(user_id,nombre){
	this.puntuacion = 0;
	this.nombre = nombre;
	this.seguidores = 7;
	this.id = user_id;
	this.IA = false;
}

Piezas = function(piezas,npiezas){	
	//Tipos de pieza
	this.piezas =piezas || Object.keys(TPiezas)
	//Numero de piezas por Tipo
	this.npiezas =npiezas || {Recto: 8, Curva: 9, Cruce3: 4, Cruce4: 1, MonCamino: 2, MonGranja: 2, CiudadC: 1, CiudadD: 4,    
				  CiudadE: 5, CiudadF: 2, CiudadG: 1, CiudadH: 3, CiudadI: 2, CiudadJ: 3, CiudadK: 3, CiudadL: 3,
				  CiudadM: 2, CiudadN: 3, CiudadO: 2, CiudadP: 3, CiudadQ: 1, CiudadR: 3, CiudadS:2,CiudadT:1};		  
	//Total de piezas
	this.totalPiezas = 0;
	for(i=0;i<this.piezas.length;i++){
		this.totalPiezas += this.npiezas[this.piezas[i]];
	} 
}

var Seguidor = function(posicion,tipo, jugador){
	this.posicion = posicion || undefined;
	this.tipo = tipo || undefined;
	this.jugador = jugador || undefined;
}

Pieza = function(tipo,x,y){

	if(x!=undefined){
		this.x=x
	}else{
		this.x=undefined
	}
	if(y!=undefined){
		this.y=y
	}else{
		this.y=undefined
	}
	
	this.tipo = tipo;
	this.lleno = false;
	this.Abajo = TPiezas[this.tipo].Abajo;
	this.Arriba = TPiezas[this.tipo].Arriba;
	this.Derecha = TPiezas[this.tipo].Derecha;
	this.Izquierda = TPiezas[this.tipo].Izquierda;
	this.Escudo = TPiezas[this.tipo].Escudo;
	this.giros = 0;
	this.caminoCerrado = false;
	this.ciudadCerrada = false;

	//Devuelvo una variable auxiliar en vez de la original girada, no se si es lo mejor
	this.girar = function(){
		var aux = new Pieza(tipo,x,y);
		aux.Abajo = this.Izquierda;
		aux.Derecha = this.Abajo;
		aux.Arriba = this.Derecha;
		aux.Izquierda = this.Arriba;
		return aux;
	}
	this.seguidores = []; // Para llevar un control del numero de seguidores que hay en cada pieza	
	this.EncajaCon = []; //Array para saber con que otras piezas puede encajar.
}

var Coor = function(x,y){

	if(x!=undefined){
		this.x=x
	}else{
		this.x=undefined
	}
	if(y!=undefined){
		this.y=y
	}else{
		this.y=undefined
	}
}

 Tablero = function(id_game){
     this.id_game = id_game;
     this.listaJugadores = [];
     this.turno = 0;
     this.iniciar = function () {

         this.totalFichas = 72;

         this.piezas = ['Recto', 'Curva', 'Cruce3', 'Cruce4', 'MonCamino', 'MonGranja', 'CiudadC', 'CiudadD', 'CiudadL', 'CiudadK', 'CiudadJ', 'CiudadI', 'CiudadH', 'CiudadG',
                         'CiudadF', 'CiudadE', 'CiudadM', 'CiudadN', 'CiudadO', 'CiudadP', 'CiudadQ', 'CiudadR', 'CiudadS', 'CiudadT', ];
         this.npiezas = {
             Recto: 8, Curva: 9, Cruce3: 4, Cruce4: 1, MonCamino: 2, MonGranja: 2, CiudadC: 1, CiudadD: 4,
             CiudadE: 5, CiudadF: 2, CiudadG: 1, CiudadH: 3, CiudadI: 2, CiudadJ: 3, CiudadK: 3, CiudadL: 3,
             CiudadM: 2, CiudadN: 3, CiudadO: 2, CiudadP: 3, CiudadQ: 1, CiudadR: 3, CiudadS: 2, CiudadT: 1
         };
		
         console.log("LLEGAMOS AQUI");
     }

	
			       
	this.saca_pieza = function () {

	    if (this.totalFichas > 0) {
	        
	        if (this.totalFichas == 72) { var indice = 7 }
	        else { var indice = Math.floor(Math.random() * this.piezas.length); }
	        
	        var pieza = this.piezas[indice];
	        console.log("1-tipo pieza ", pieza, "  indice  ", indice, "  npiezas  ", this.npiezas[pieza])
	        this.npiezas[pieza] = this.npiezas[pieza] - 1;
	        console.log("2-tipo pieza ", pieza, "  indice  ", indice, "  npiezas  ", this.npiezas[pieza])
	        //restamos del total de piezas y de las piezas restantes de ese tipo
	        this.totalFichas--;
	        //	this.piezas.npiezas[this.piezas.piezas[this.piezas.piezas[indice]]]--;
	        if (this.npiezas[pieza] == 0) { this.piezas.pop(this.piezas[indice]); }
	        //Si no quedan de ese tipo las eliminamos
	        
	        //Pasar el turno al siguiente

	        return pieza
	    } else {
	        console.log("No quedan piezas");
	        return undefined;
	    }
	}
	
	this.posiciones = [] //relaci�n de piezas con coordenadas puestas
	this.piezaenposiciones = function(x,y){
		var i;
		for(i=0;i<this.posiciones.length;i++){
			if((this.posiciones[i].x==x)&&(this.posiciones[i].y==y))
				return this.posiciones[i]
		}return undefined
	}

	this.posiblelugar= function(pieza){
		
		var array= [];
		for(i=0; i<=this.posiciones.length-1; i++){
			//console.log("TENEMOS LAS FICHAS: ", this.posiciones);
			//console.log("QUIERO COLOCAR LA FICHA: ", pieza);
			
			var aux = this.posiciones[i];
			var cooraux = new Coor();
			var cooraux1 = new Coor();
			var cooraux2 = new Coor();
			var cooraux3 = new Coor();
			if(this.puedocolocar(pieza,aux.x,aux.y+1)){
				cooraux.x=aux.x;
				cooraux.y=aux.y+1;
				if(array.indexOf(cooraux)==-1)
					array.push(cooraux);
			}if(this.puedocolocar(pieza,aux.x,aux.y-1)){
				cooraux1.x=aux.x;
				cooraux1.y=aux.y-1;
				if(array.indexOf(cooraux1)==-1)
					array.push(cooraux1);
			}if(this.puedocolocar(pieza,aux.x+1,aux.y)){
				cooraux2.x=aux.x+1;
				cooraux2.y=aux.y;
				if(array.indexOf(cooraux2)==-1)
					array.push(cooraux2);
			}if(this.puedocolocar(pieza,aux.x-1,aux.y)){
				cooraux3.x=aux.x-1;
				cooraux3.y=aux.y;
			if(array.indexOf(cooraux3)==-1)
					array.push(cooraux3);
			}
		}
		
		
		return array;  
	}
	
	 this.puedocolocar = function(pieza,x,y){
		//saco si hay ficha en cada posicion
		var haypieza = this.piezaenposiciones(x,y)	//si es undefined, puedo poner
		
			//devuelve true si no hay conflicto con alguna pieza
		var comparo = true	
				// para comparar con 4 posiciones alrededor
		var dummyU = this.piezaenposiciones(x,y+1)	
		var dummyD = this.piezaenposiciones(x,y-1)
		var dummyR = this.piezaenposiciones(x+1,y)
		var dummyL = this.piezaenposiciones(x-1,y)
			
		if((dummyU==undefined)&&(dummyD==undefined)&&(dummyR==undefined)&&(dummyL==undefined)&&(pieza.tipo != 'CiudadD')){comparo = false}//ninguna pieza cercana
			
		if((dummyU!=undefined)&&(dummyU.Abajo!=pieza.Arriba)){comparo = false}	//algun conflicto; false
		if((dummyD!=undefined)&&(dummyD.Arriba!=pieza.Abajo)){comparo = false}
		if((dummyR!=undefined)&&(dummyR.Izquierda!=pieza.Derecha)){comparo = false}
		if((dummyL!=undefined)&&(dummyL.Derecha!=pieza.Izquierda)){comparo = false}	//exista y no coincida
		
		
		if((comparo)&&(haypieza==undefined)){ 	//exito en la comparacion
			
			return true	// puedo colocar ficha
			
		}else{
			return false	// no puedo colocar ficha
		}
	}
	
	this.coloco = function(pieza,x,y){
		
		
		if(this.puedocolocar(pieza,x,y)){
			pieza.x=x;
			pieza.y = y;
			pieza.lleno = true; 
			this.posiciones.push(pieza)
			return true
		}
		return false
	}
	
	
	// ENTRA UNA PIEZA YA COLOCADA Y DEVUELVE ARRAY CON POSIBLES SITIOS DONDE COLOCAR SEGUIDOR (ARRAY CON VALORES DE 1 A 9)
		this.posibleseguidor= function(pieza,Tablero){		//la pieza ya trae las coordenadas				//a otroladron(pieza,posicion cuadrícula)
		var tablero = Tablero;
		console.log("entro en posible seguidor");
		var array= [];
		var correcto = 0;
			//posiciones pieza (cuadricula)
			console.log(i);
		
			/////////// ESQUINAS ///////////////
			i=1;
			if(i==1){	//superior izq 
				
			    if (((pieza.Arriba == 'Camino') || (pieza.Arriba == 'Granja') || (pieza.Arriba != pieza.Izquierda)) && (otrogranjero(pieza, 1,tablero) == false)) 
			    {
					//console.log(i);
			       // no tiene sentido camino en esquina---> if (pieza.Arriba == 'Camino') { array.push({ tipo: "ladron", posicion: i }); }
			       array.push({ tipo: "granjero", posicion: 1 });
			    }
			    else {
				
			        if ((pieza.Arriba == pieza.Izquierda)&&(pieza.tipo!='Ciudadl')&&(otrocaballero(tablero, pieza, 1) == false)) { array.push({ tipo: "caballero", posicion: 1 }); }
			    }
						//si granja o camino, 1 siempre granja. Si arriba==izquierda --> es ciudad, sino granja también
				
			}
			i=3;
			if(i==3){	//superior dcha 
				
			    if (((pieza.Derecha == 'Camino') || (pieza.Derecha == 'Granja') || (pieza.Derecha != pieza.Arriba)) && (otrogranjero(pieza, 3,tablero) == false))
			    {
			        array.push({ tipo: "granjero", posicion: 3 });
			    }
			    else {
					//console.log(i);
			        if ((pieza.Derecha == pieza.Arriba)&&(pieza.tipo!='Ciudadl')&&(otrocaballero(tablero, pieza, 3) == false)){ array.push({ tipo: "caballero", posicion: 3 }); }
			    }
						//si granja o camino, 1 siempre granja. Si Derecha==Izquierda --> es ciudad, sino granja también
				
			}
			i=7;
			if(i==7){	//inferior izda 
				//console.log(i);
				
			    if (((pieza.Izquierda == 'Camino') || (pieza.Izquierda == 'Granja') || (pieza.Izquierda != pieza.Abajo)) && (otrogranjero(pieza, 7,tablero) == false))
			    {
			    	
			        array.push({ tipo: "granjero", posicion: 7 });
			    }
			    else {
					//console.log(i);
			        if ((pieza.Izquierda == pieza.Abajo)&&(pieza.tipo!='Ciudadl')&&(otrocaballero(tablero, pieza, 7) == false)) { array.push({ tipo: "caballero", posicion: 7 }); }
			    }
						//si granja o camino, 1 siempre granja. Si Izquierda==Abajo --> es ciudad, sino granja también
				
			}
			i=9;
			if(i==9){	//inferior izda 
				//console.log(i);
				
			    if (((pieza.Abajo == 'Camino') || (pieza.Abajo == 'Granja') || (pieza.Abajo != pieza.Derecha)) && (otrogranjero(pieza, 9,tablero) == false))
			    {
			    	
			        array.push({ tipo: "granjero", posicion: 9 });
			    }
			    else
			    {
					//console.log(i);
			        if ((pieza.Abajo == pieza.Derecha)&&(pieza.tipo!='Ciudadl')&&(otrocaballero(tablero, pieza, 9) == false)) {array.push({ tipo: "caballero", posicion: 9 });}
			    }
						//si granja o camino, 1 siempre granja. Si Abajo==Derecha --> es ciudad, sino granja también
				
			}
			
			/////////// EJE + (cruz central) ///////////////
			i=2;
			if(i==2){	//superior centro 
				
				//console.log(i);
				if((pieza.Arriba == 'Camino')&&(otroladron(pieza,2,tablero)==false)) {array.push({tipo: "ladron",posicion:2});}
				if((pieza.Arriba == 'Ciudad')&&(otrocaballero(tablero, pieza, 2)==false)) {array.push({tipo: "caballero",posicion:2});}
				if((pieza.Arriba == 'Granja')&&(otrogranjero(pieza,2,tablero)==false)) {array.push({tipo: "granjero",posicion:2});}
				
			}
			
			
			i=8;
			if(i==8){	//inferior centro 
				
				//console.log(i);
				
				if((pieza.Abajo == 'Camino')&&(otroladron(pieza,8,tablero)==false)) {array.push({tipo: "ladron",posicion:8});}
				if((pieza.Abajo == 'Ciudad')&&(otrocaballero(tablero, pieza, 8)==false)) {array.push({tipo: "caballero",posicion:8});}
				if((pieza.Abajo == 'Granja')&&(otrogranjero(pieza,8,tablero)==false)) {array.push({tipo: "granjero",posicion:8});}
				
			}
			
			/////////// PIEZA CENTRAL ///////////////

			if(i==5){	//inferior centro 
				
				//console.log(i);
			    if ((pieza.tipo=='MonCamino')||(pieza.tipo=='MonGranja'))			    
			    {
			        array.push({tipo: "monje",posicion:5});
			    }			       
			    
			}
			i=4;
			if(i==4){	//medio izq
				
				//console.log(i);
				if((pieza.Izquierda == 'Ciudad')&&(otrocaballero(tablero, pieza, 4)==false)) {array.push({tipo: "caballero",posicion:4});}
				if((pieza.Izquierda == 'Granja')&&(otrogranjero(pieza,4,tablero)==false)) {array.push({tipo: "granjero",posicion:4});}
				if((pieza.Izquierda == 'Camino')&&(otroladron(pieza,4,tablero)==false)) {array.push({tipo: "ladron",posicion:4});}
			}
			

			i=6;
			if(i==6){	//medio dcha
				
				//console.log(i);

				if((pieza.Derecha == 'Ciudad')&&(otrocaballero(tablero, pieza, 6)==false)) {array.push({tipo: "caballero",posicion:6});}
				if((pieza.Derecha == 'Granja')&&(otrogranjero(pieza,6,tablero)==false)) {array.push({tipo: "granjero",posicion:6});}
				if((pieza.Derecha == 'Camino')&&(otroladron(pieza,6,tablero)==false)) {array.push({tipo: "ladron",posicion:6});}
				
			}
		
		return array;	
	}

	this.colocarseguidor = function(pieza, posicion, tablero, id_jugador){
		var arraysalida = [];
		var jugador = _.find(tablero.listaJugadores, function (obj) { return (obj.id == id_jugador) })
		if(jugador.seguidores > 0){ //SIEMPRE Y CUANDO EL JUGADOR TENGA SEGUIDORES
			//POR CADA POSICION DE LA MATRIZ DE LA PIEZA
			if(posicion == 1){
				if(pieza.Arriba == "Granja" || pieza.Izquierda == "Granja" || pieza.Izquierda == "Camino" || pieza.Arriba == "Camino"){
					//if(!otrogranjero(pieza, 1,tablero)){
						var granjero = new Seguidor(1, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Izquierda == "Ciudad" && pieza.Arriba == "Ciudad" && pieza.tipo != "CiudadI"){ //ciudad especial (dos cachos separados)
					//if(!otrocaballero(tablero,pieza,1)){
						var caballero = new Seguidor(1, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Izquierda == "Ciudad" && pieza.Arriba == "Ciudad" && pieza.tipo == "CiudadI"){
					//if(!otrogranjero(pieza, 1,tablero)){
						var granjero = new Seguidor(1, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}
				
			}else if(posicion == 2){
				if(pieza.Arriba == "Camino"){
					//if(!otroladron(pieza, 2,tablero)){
						var ladron = new Seguidor(2, "ladron", jugador);
						pieza.seguidores.push(ladron);
						jugador.seguidores--; arraysalida.push(true,"ladron"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Arriba == "Ciudad"){
					//if(!otrocaballero(tablero,pieza,2)){
						var caballero = new Seguidor(2, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Arriba == "Granja"){
					//if(!otrogranjero(pieza, 2,tablero)){
						var granjero = new Seguidor(2, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}
				
			}else if(posicion == 3){
				if(pieza.Derecha == "Granja" || pieza.Arriba == "Granja" || pieza.Arriba == "Camino" || pieza.Derecha == "Camino"){
					//if(!otrogranjero(pieza, 3,tablero)){
						var granjero = new Seguidor(3, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Arriba == "Ciudad" && pieza.Derecha == "Ciudad" && pieza.tipo != "CiudadI"){ //ciudad especial (dos cachos separados)
					//if(!otrocaballero(tablero,pieza,3)){
						var caballero = new Seguidor(3, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Arriba == "Ciudad" && pieza.Derecha == "Ciudad" && pieza.tipo == "CiudadI"){
					//if(!otrogranjero(pieza, 3,tablero)){
						var granjero = new Seguidor(3, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}
			
			}else if(posicion == 4){
				if(pieza.Izquierda == "Camino"){
					//if(!otroladron(pieza, 4,tablero)){
						var ladron = new Seguidor(4, "ladron", jugador);
						pieza.seguidores.push(ladron);
						jugador.seguidores--; arraysalida.push(true,"ladron"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Izquierda == "Ciudad"){
					//if(!otrocaballero(tablero,pieza,4)){
						var caballero = new Seguidor(4, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Izquierda == "Granja"){
					//if(!otrogranjero(pieza, 4,tablero)){
						var granjero = new Seguidor(4, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}				
				
			}else if(posicion == 5){
				if(pieza.tipo == "MonCamino" || pieza.tipo == "MonGranja"){
					var monje = new Seguidor(5, "monje", jugador);
					pieza.seguidores.push(monje);
					jugador.seguidores--; arraysalida.push(true,"monje"); return arraysalida;
				}else if(pieza.tipo == "CiudadE" || pieza.tipo == "CiudadH" || pieza.tipo == "CiudadI" || pieza.tipo == "CiudadM" || pieza.tipo == "CiudadN"){
					//if(!otrogranjero(pieza, 5,tablero)){
						var granjero = new Seguidor(5, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.tipo == "CiudadC" || pieza.tipo == "CiudadF" || pieza.tipo == "CiudadG" || pieza.tipo == "CiudadQ" || pieza.tipo == "CiudadR" || pieza.tipo == "CiudadS" || pieza.tipo == "CiudadT"){
					//if(!otrocaballero(tablero,pieza,5)){
						var caballero = new Seguidor(5, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.tipo == "CiudadD" || pieza.tipo == "CiudadJ" || pieza.tipo == "CiudadK" || pieza.tipo == "CiudadO" || pieza.tipo == "CiudadP" || pieza.tipo == "Recto" || pieza.tipo == "Curva"){
					//if(!otroladron(pieza, 5,tablero)){
						var ladron = new Seguidor(5, "ladron", jugador);
						pieza.seguidores.push(ladron);
						jugador.seguidores--; arraysalida.push(true,"ladron"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.tipo == "CiudadL" || pieza.tipo == "Cruce3" || pieza.tipo == "Cruce4"){
					console.log("AHI NO PUEDES COLOCAR EL SEGUIDOR QUE ES UN CRUCE¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡");
					arraysalida.push(false, ""); return arraysalida;
				} 				
								
			}else if(posicion == 6){
				if(pieza.Derecha == "Camino"){
					//if(!otroladron(pieza, 6,tablero)){
						var ladron = new Seguidor(6, "ladron", jugador);
						pieza.seguidores.push(ladron);
						jugador.seguidores--; arraysalida.push(true,"ladron"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Derecha == "Ciudad"){
					//if(!otrocaballero(tablero,pieza,6)){
						var caballero = new Seguidor(6, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Derecha == "Granja"){
					//if(!otrogranjero(pieza, 6,tablero)){
						var granjero = new Seguidor(6, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}	
			}else if(posicion == 7){
				if(pieza.Izquierda == "Granja" || pieza.Abajo == "Granja" || pieza.Abajo == "Camino" || pieza.Izquierda == "Camino"){
					//if(!otrogranjero(pieza, 7,tablero)){
						var granjero = new Seguidor(7, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Abajo == "Ciudad" && pieza.Izquierda == "Ciudad" && pieza.tipo != "CiudadI"){ //ciudad especial (dos cachos separados)
					//if(!otrocaballero(tablero,pieza,7)){
						var caballero = new Seguidor(7, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Abajo == "Ciudad" && pieza.Izquierda == "Ciudad" && pieza.tipo == "CiudadI"){
					//if(!otrogranjero(pieza, 7,tablero)){
						var granjero = new Seguidor(7, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}			
			}else if(posicion == 8){
				if(pieza.Abajo == "Camino"){
					//if(!otroladron(pieza, 8,tablero)){
						var ladron = new Seguidor(8, "ladron", jugador);
						pieza.seguidores.push(ladron);
						jugador.seguidores--; arraysalida.push(true,"ladron"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Abajo == "Ciudad"){
					//if(!otrocaballero(tablero,pieza,8)){
						var caballero = new Seguidor(8, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Abajo == "Granja"){
					//if(!otrogranjero(pieza, 8,tablero)){
						var granjero = new Seguidor(8, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}
			}else if(posicion == 9){
				if(pieza.Abajo == "Granja" || pieza.Derecha == "Granja" || pieza.Derecha == "Camino" || pieza.Abajo == "Camino"){
					//if(!otrogranjero(pieza, 9,tablero)){
						var granjero = new Seguidor(9, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Derecha == "Ciudad" && pieza.Abajo == "Ciudad" && pieza.tipo != "CiudadI"){ //ciudad especial (dos cachos separados)
					//if(!otrocaballero(tablero,pieza,9)){
						var caballero = new Seguidor(9, "caballero", jugador);
						pieza.seguidores.push(caballero);
						jugador.seguidores--; arraysalida.push(true,"caballero"); return arraysalida;
					//}else{
					//	return false;
					//}
				}else if(pieza.Derecha == "Ciudad" && pieza.Abajo == "Ciudad" && pieza.tipo == "CiudadI"){
					//if(!otrogranjero(pieza, 9,tablero)){
						var granjero = new Seguidor(9, "granjero", jugador);
						pieza.seguidores.push(granjero);
						jugador.seguidores--; arraysalida.push(true,"granjero"); return arraysalida;
					//}else{
					//	return false;
					//}
					
				}
			}
		}else{
			console.log("Jugador sin seguidores!!!!");
			arraysalida.push(false, ""); return arraysalida;
		}
		
	}	
	
 }




