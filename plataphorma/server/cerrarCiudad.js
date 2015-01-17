cerrarCiudad = function(pieza,final){
	var finalesCiudad = ["CiudadD", "CiudadE", "CiudadH", "CiudadI", "CiudadJ", "CiudadK", "CiudadL"];
	var seguidoresEncontrados = [];
	var puntos = 0;
	var cerrado = 0;
	var piezasRecorridas = [];


	this.sumar = function(){
		var sumados = [];
		seguidoresEncontrados.forEach(function(seguidor){

			jugador = Tablero.listaSeguidores.find(function(jug){jug == seguidor.jugador;});
			if(jugador.indexOf(sumados)>=0){
				jugador.puntuacion += puntos;
				sumados.push(jugador);
			}
			jugador.seguidores++;
		});
		
	};
	
	this.piezaArriba = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Arriba == 'Ciudad' && Tablero.piezaenposiciones(pieza.x,pieza.y+1).Abajo=='Ciudad' && vengode!='Arriba'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =Tablero.piezaenposiciones(pieza.x,pieza.y+1);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					i = aux.seguidores.indexOf(seguidor);
					aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo
				if(aux.Escudo == 1){
					puntos = puntos + 4;
				}else{
					puntos = puntos + 2;
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Abajo');
			}else{
				puntos = puntos + 2;
				cerrado++;
				return true;
				//En caso de que sea un final de ciudad no recursividad
			}
		}
	};
	
	this.piezaAbajo = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Abajo == 'Ciudad' && Tablero.piezaenposiciones(pieza.x,pieza.y-1).Arriba=='Ciudad' && vengode!='Abajo'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =Tablero.piezaenposiciones(pieza.x,pieza.y-1);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					i = aux.seguidores.indexOf(seguidor);
					aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo
				if(aux.Escudo == 1){
					puntos = puntos + 4;
				}else{
					puntos = puntos + 2;
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Arriba');
			}else{
				puntos = puntos + 2;
				cerrado++;
				return true;
				//En caso de que sea un final de ciudad no recursividad
			}
		}
	};
	
	this.piezaDerecha = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Derecha == 'Ciudad' && Tablero.piezaenposiciones(pieza.x+1,pieza.y).Izquierda=='Ciudad' && vengode!='Derecha'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =Tablero.piezaenposiciones(pieza.x+1,pieza.y);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					i = aux.seguidores.indexOf(seguidor);
					aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo
				if(aux.Escudo == 1){
					puntos = puntos + 4;
				}else{
					puntos = puntos + 2;
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Izquierda');
			}else{
				puntos = puntos + 2;
				cerrado++;
				return true;
				//En caso de que sea un final de ciudad no recursividad
			}
		}
	};
	
	this.piezaIzquierda = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Izquierda == 'Ciudad' && Tablero.piezaenposiciones(pieza.x-1,pieza.y).Derecha=='Ciudad' && vengode!='Izquierda'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =Tablero.piezaenposiciones(pieza.x-1,pieza.y);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					i = aux.seguidores.indexOf(seguidor);
					aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo
				if(aux.Escudo == 1){
					puntos = puntos + 4;
				}else{
					puntos = puntos + 2;
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Derecha');
			}else{
				puntos = puntos + 2;
				cerrado++;
				return true;
				//En caso de que sea un final de ciudad no recursividad
			}
		}
	};				
	
	
	this.cerrarCiudadRecur = function(pieza,vengode){
		var ok = new Array(4);
		piezasRecorridas.push(pieza);
		ok[0] = this.piezaAbajo(pieza,vengode);

		ok[1] = this.piezaArriba(pieza,vengode);

		ok[2] = this.piezaDerecha(pieza,vengode);

		ok[3] = this.piezaIzquierda(pieza,vengode);
		if(ok[0] || ok[1] || ok[2] || ok[3]){return true;}
	};
	
	if(finalesCiudad.idexOf(pieza.tipo)<0){
	//esto significa que la pieza no es un final de ciudad por lo tanto tendrá que cerrarse por varios lados (minimo 2 lados)
		cerrarCiudadRecur(pieza);
		if(cerrado >= 2 || final){
			this.sumar();
			piezasRecorridas.forEach(function(pieza){
				pieza.ciudadCerrada = true;
			});
			
		}else{
			puntuacion=0;
			seguidoresEncontrados = [];
		}
	}else{
	//es un final de ciudad por lo tanto tiene que haber como mínimo otro final de ciudad
		cerrarCiudadRecur(pieza);
		if(cerrado >= 1 || final){
			this.sumar();
			piezasRecorridas.forEach(function(pieza){
				pieza.ciudadCerrada = true;
			});
			
		}else{
			puntuacion=0;
			seguidoresEncontrados = [];
		}
	}
	return [puntuacion, seguidoresEncontrados];
}
