ficha = function(x,y,a,b,c,d,e,f,g,h,i){

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
	this.z=[];

	if(a!= undefined){
		this.z.push(a);
	}
	if(b!= undefined){
		this.z.push(b);
	}
	if(c!= undefined){
		this.z.push(c);
	}
	if(d!= undefined){
		this.z.push(d);
	}
	if(e!= undefined){
		this.z.push(e);
	}
	if(f!= undefined){
		this.z.push(f);
	}
	if(g!= undefined){
		this.z.push(g);
	}
	if(h!= undefined){
		this.z.push(h);
	}
	if(i!= undefined){
		this.z.push(i);
	}
	
}

otrogranjero= function(pieza,posSeg,tablero){
	var valido=false;
	var valido2=false;
	var valido3=false;
	var valido4=false;
	visitado=[];
	//hacer pieza inicial visitada
	if(pieza.Arriba!= 'Ciudad'){
		valido = piezaArriba(pieza,posSeg,tablero,valido);
	}

	if(pieza.Abajo!= 'Ciudad'){
		valido2 = piezaAbajo(pieza,posSeg,tablero,valido);	
	}

	if(pieza.Derecha!= 'Ciudad'){
		valido3 = piezaDerecha(pieza,posSeg,tablero,valido);	
	}

	if(pieza.Izquierda!= 'Ciudad'){
		valido4 = piezaIzquierda(pieza,posSeg,tablero,valido);	
	}

	if(valido==true || valido2==true || valido3==true || valido4==true){
		return true;
	}else{
		return false;
	}
	
}

//comprueba si las posicione donde decidmos hay seguidor 
compruebaSeg = function(aux,a,b,c,d,e,f,g,h,i){
	for(j=0;i<visitado.length;j++){
		if(visitado[j].x==aux.x && visitado[j].y==aux.y){
			if(visitado[j].z.indexOf(a)==0 || visitado[j].z.indexOf(b)==0 || visitado[j].z.indexOf(c)==0 ||
			   visitado[j].z.indexOf(d)==0 || visitado[j].z.indexOf(e)==0 || visitado[j].z.indexOf(f)==0 || 
			   visitado[j].z.indexOf(g)==0 || visitado[j].z.indexOf(h)==0 || visitado[i].z.indexOf(i)==0){
				console.log('0000');
					return null;
			}
		}
	}
	visitado.push(new ficha(aux.x,aux.y,a,b,c,d,e,f,g,h,i));
	for(k=0;k<aux.seguidores.length;k++){
		if(aux.seguidores[k].tipo== 'granjero' ){
			if(aux.seguidores[k].posicion== a ||aux.seguidores[k].posicion== b  ||aux.seguidores[k].posicion== c ||
			   aux.seguidores[k].posicion== d ||aux.seguidores[k].posicion== e  ||aux.seguidores[k].posicion== f ||
			   aux.seguidores[k].posicion== g ||aux.seguidores[k].posicion== h  ||aux.seguidores[k].posicion== i){ 
				return true;
			}else{
				return false;
			}
		}
	}return false;
}

piezaArriba = function(pieza,posSeg,tablero,otro){
	var aux =tablero.piezaenposiciones(pieza.x,pieza.y+1);
	var otro=false;
	if(aux == undefined){
		//console.log('no mas piezas arriba');
		return false;
	}
	if(pieza.Arriba != 'Ciudad' && aux.Abajo != 'Ciudad' && otro==false){
		//Se cierra con estos primeros casos
		if(aux.tipo == 'CiudadF' || aux.tipo =='CiudadG' || aux.tipo =='CiudadQ' || aux.tipo =='CiudadR'){
			otro=compruebaSeg(aux,7,8,9);
			if(otro==true){return otro}
		}else{//aux abajo granja y pieza arriba granja con seguidor que comunica granja arriba 
			if(pieza.Arriba == 'Granja' ){
				if(aux.tipo == 'MonCamino' || aux.tipo =='MonGranja'|| aux.tipo =='CiudadE' ||
		  		   aux.tipo == 'CiudadH' || aux.tipo =='CiudadI'|| aux.tipo =='CiudadM' || aux.tipo == 'CiudadN'){
					otro=compruebaSeg(aux,1,2,3,4,5,6,7,8,9);
					if(otro==true){return otro}
					if(aux.Arriba != 'Ciudad'){
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}	
					}
					if(aux.Derecha != 'Ciudad'){
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
					if(aux.Izquierda != 'Ciudad'){
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'|| aux.tipo =='Cruce3'){
					otro=compruebaSeg(aux,7,8,9);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,7,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadJ'){
					otro=compruebaSeg(aux,1,5,7,8,9);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro}
					otro=piezaArriba(aux,1,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadK'){
					otro=compruebaSeg(aux,3,5,7,8,9);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,7,tablero,otro);
					if(otro==true){return otro}
					otro=piezaArriba(aux,3,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'Curva'){
					if(aux.Izquierda == 'Camino'){
						otro=compruebaSeg(aux,3,6,7,8,9);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,7,tablero,otro);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,9,tablero,otro);
						if(otro==true){return otro}
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
					}else if(aux.Derecha == 'Camino'){
						otro=compruebaSeg(aux,1,4,7,8,9);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,7,tablero,otro);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,9,tablero,otro);
						if(otro==true){return otro}
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}	
			}else if (pieza.Arriba == 'Camino'){
				var auxSeg=posSeg;
				//coloca el seguidor en 1 o 3 para comparar con la pieza de arriba
				if(pieza.tipo== 'CiudadJ'||pieza.tipo== 'CiudadK' || pieza.tipo== 'CiudadO'||pieza.tipo=='CiudadP'      			         ||pieza.tipo== 'Curva'){
					if(pieza.Izquierda == 'Camino' && posSeg== 7){
						auxSeg=3;
					}else if(pieza.Derecha == 'Camino' && posSeg== 9){
						auxSeg=1;	
					}else if(pieza.Derecha == 'Camino' && posSeg== 8){
						auxSeg=1;	
					}else if(pieza.Izquierda == 'Camino' && posSeg== 8){
						auxSeg=3;	
					}
				}

				if (auxSeg==4 || auxSeg==7){
					auxSeg=1;
				}else if (auxSeg==6 || auxSeg==9){
					auxSeg=3;
				}

				if(aux.tipo == 'CiudadS' || aux.tipo=='CiudadT'){//cierra con estos
					if(auxSeg==1){
						otro=compruebaSeg(aux,7);
						if(otro==true){return otro}
					}else if(auxSeg==3){
						otro=compruebaSeg(aux,9);
						if(otro==true){return otro}
					}
				//compruebsi hay seguidores arriba en las posicion que coinciden con la granja de auxpos
				}else if(aux.tipo =='Recto' || aux.tipo == 'CiudadD'){
					if(auxSeg==1){
						otro=compruebaSeg(aux,1,4,7);
						if(otro==true){return otro}
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
						if(aux.Izquierda != 'Ciudad'){
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(auxSeg==3){
						otro=compruebaSeg(aux,3,6,9);
						if(otro==true){return otro}
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
						if(aux.Derecha != 'Ciudad'){
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}
					
				}else if(aux.tipo == 'CiudadJ' || aux.tipo =='Curva'|| aux.tipo =='CiudadK'|| aux.tipo =='CiudadO'||
					 aux.tipo =='CiudadP'){  
					if(auxSeg==1){	
						if(aux.Izquierda=='Camino'){
							otro=compruebaSeg(aux,7);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,7,tablero,otro);
							if(otro==true){return otro}
						}else if(aux.Derecha=='Camino'){
							otro=compruebaSeg(aux,1,2,3,4,7);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
							if(aux.Arriba != 'Ciudad'){
								otro=piezaArriba(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
							if (aux.Izquierda != 'Ciudad'){
								otro=piezaIzquierda(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
						}
					}else if(auxSeg==3){
						if(aux.Izquierda=='Camino'){
							otro=compruebaSeg(aux,1,2,3,6,9);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
							if(aux.Arriba != 'Ciudad'){
								otro=piezaArriba(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
							if (aux.Derecha != 'Ciudad'){
								otro=piezaDerecha(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(aux.Derecha=='Camino'){
							otro=compruebaSeg(aux,9);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}
				}else if(aux.tipo =='Cruce4'){
					if(auxSeg==1){
						otro=compruebaSeg(aux,7);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,7,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg==3){
						otro=compruebaSeg(aux,9);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,9,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadL' || aux.tipo =='Cruce3'){
					if(aux.Arriba != 'Camino'){
						if(auxSeg==1){
							otro=compruebaSeg(aux,7);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,7,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==3){
							otro=compruebaSeg(aux,9);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Derecha != 'Camino'){
						if(auxSeg==1){
							otro=compruebaSeg(aux,7);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,7,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==3){
							otro=compruebaSeg(aux,3,6,9);
							if(otro==true){return otro}
							if(aux.Derecha!= 'Ciudad'){
								otro=piezaDerecha(aux,9,tablero,otro);
								if(otro==true){return otro}
							}
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Izquierda != 'Camino'){
						if(auxSeg==1){
							otro=compruebaSeg(aux,1,4,7);
							if(otro==true){return otro}
							if(aux.Izquierda!= 'Ciudad'){
								otro=piezaIzquierda(aux,7,tablero,otro);
								if(otro==true){return otro}
							}
							otro=piezaArriba(aux,1,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==3){
							otro=compruebaSeg(aux,9);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}
				}else if(aux.tipo=='MonCamino'){
					otro=compruebaSeg(aux,1,2,3,4,5,6,7,9);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,7,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro}
					if (auxSeg == 1){
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg == 3){
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}
					}
					otro=piezaArriba(aux,3,tablero,otro);
					if(otro==true){return otro}
				}
			}
		}
	}
	return otro;
}

piezaAbajo = function(pieza,posSeg,tablero,otro){
	var aux =tablero.piezaenposiciones(pieza.x,(pieza.y-1));
	var otro=false;
	if(aux == undefined){
		//console.log('no mas piezas abajo');
		return false;
	}
	if(pieza.Abajo != 'Ciudad' && aux.Arriba != 'Ciudad' && otro==false){
		//Se sigue el mismo procedimiento que en piezaArriba
		if(aux.tipo == 'CiudadF' || aux.tipo =='CiudadG'|| aux.tipo =='CiudadQ' || aux.tipo =='CiudadR'){
			otro=compruebaSeg(aux,1,2,3);
			if(otro==true){return otro}
		}else{
			if(pieza.Abajo == 'Granja' ){
				if(aux.tipo == 'MonCamino' || aux.tipo =='MonGranja'|| aux.tipo =='CiudadE' ||
		  		   aux.tipo == 'CiudadH' || aux.tipo =='CiudadI'|| aux.tipo =='CiudadM' || aux.tipo == 'CiudadN'){
					otro=compruebaSeg(aux,1,2,3,4,5,6,7,8,9);
					if(otro==true){return otro}
					if(aux.Abajo != 'Ciudad'){
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}	
					}
					if(aux.Derecha != 'Ciudad'){
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
					if(aux.Izquierda != 'Ciudad'){
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'|| aux.tipo =='Cruce3'){
					otro=compruebaSeg(aux,1,2,3);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,7,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro} 
				}else if(aux.tipo == 'CiudadJ'){
					otro=compruebaSeg(aux,1,2,3);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,1,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,9,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadK'){
					otro=compruebaSeg(aux,1,2,3,7);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,3,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,7,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'Curva'){
					if(aux.Izquierda == 'Camino'){
						otro=compruebaSeg(aux,1,2,3,6,9);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}else if(aux.Derecha == 'Camino'){
						otro=compruebaSeg(aux,1,2,3,4,7);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
				}	
			}else if (pieza.Abajo == 'Camino'){
				
				var auxSeg=posSeg;
				if(pieza.tipo== 'CiudadJ'||pieza.tipo== 'CiudadK' || pieza.tipo== 'CiudadO'||pieza.tipo=='CiudadP'      			           ||pieza.tipo== 'Curva'){
					if(pieza.Izquierda == 'Camino' && posSeg== 1){
						auxSeg=9;
					}else if(pieza.Derecha == 'Camino' && posSeg== 3){
						auxSeg=7;	
					}else if(pieza.Derecha == 'Camino' && posSeg== 2){
						auxSeg=7;	
					}else if(pieza.Izquierda == 'Camino' && posSeg== 2){
						auxSeg=9;	
					}
				}

				if(auxSeg==1 || auxSeg==4){
				auxSeg=7;
				}else if (auxSeg==3 || auxSeg==6){
					auxSeg=9;
				}
				if(aux.tipo == 'CiudadS' || aux.tipo=='CiudadT'){
					if(auxSeg==7){
						otro=compruebaSeg(aux,1);
						if(otro==true){return otro}
					}else if(auxSeg==9){
						otro=compruebaSeg(aux,3);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'){
					if(auxSeg==7){
						otro=compruebaSeg(aux,1,4,7);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}
						if(aux.Izquierda != 'Ciudad'){
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(auxSeg==9){
						otro=compruebaSeg(aux,3,6,9);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}
						if(aux.Derecha != 'Ciudad'){
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}
					
				}else if(aux.tipo == 'CiudadJ' || aux.tipo =='Curva'|| aux.tipo =='CiudadK'|| aux.tipo =='CiudadO'||
					 aux.tipo =='CiudadP'){ 
					if(auxSeg==7){	
						if(aux.Izquierda=='Camino'){
							otro=compruebaSeg(aux,1);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
						}else if(aux.Derecha=='Camino'){
							otro=compruebaSeg(aux,1,4,7,8,9);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,9,tablero,otro);
							if(otro==true){return otro}
							if(aux.Abajo != 'Ciudad'){
								otro=piezaAbajo(aux,7,tablero,otro);
								if(otro==true){return otro}
							}else if (aux.Izquierda != 'Ciudad'){
								otro=piezaIzquierda(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
						} 
					}else if(auxSeg==9){
						if(aux.Izquierda=='Camino'){
							otro=compruebaSeg(aux,3,7,8,9);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,7,tablero,otro);
							if(otro==true){return otro}
							if(aux.Abajo != 'Ciudad'){
								otro=piezaAbajo(aux,7,tablero,otro);
								if(otro==true){return otro}
							}
							if (aux.Derecha != 'Ciudad'){
								otro=piezaDerecha(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(aux.Derecha=='Camino'){
							otro=compruebaSeg(aux,3);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}
				}else if(aux.tipo =='Cruce4'){
					if(auxSeg==7){
						otro=compruebaSeg(aux,1);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg==9){
						otro=compruebaSeg(aux,3);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadL' || aux.tipo =='Cruce3'){
					if(aux.Abajo != 'Camino'){
						if(auxSeg==7){
							otro=compruebaSeg(aux,1);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==9){
							otro=compruebaSeg(aux,3);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Derecha != 'Camino'){
						if(auxSeg==7){
							otro=compruebaSeg(aux,1);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==9){
							otro=compruebaSeg(aux,3,6,9);
							if(otro==true){return otro}
							if(aux.Derecha!= 'Ciudad'){
								otro=piezaDerecha(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Izquierda != 'Camino'){
						if(auxSeg==7){
							otro=compruebaSeg(aux,1,4,7);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,7,tablero,otro);
							if(otro==true){return otro}
							if(aux.Izquierda!= 'Ciudad'){
								otro=piezaIzquierda(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(auxSeg==9){
							otro=compruebaSeg(aux,3);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}
				}else if(aux.tipo=='MonCamino'){
					otro=compruebaSeg(aux,1,3,4,5,6,7,8,9);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,7,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,7,tablero,otro);
					if(otro==true){return otro}
					if (auxSeg == 7){
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg == 9){
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}
			}
		}
	}
	return otro;
}

piezaDerecha = function(pieza,posSeg,tablero,otro){
	var aux =tablero.piezaenposiciones(pieza.x+1,pieza.y);
	var otro=false;
	if(aux == undefined){
		//console.log('no mas piezas derecha');
		return false;
	}
	if(pieza.Derecha != 'Ciudad' && aux.Izquierda != 'Ciudad' && otro==false){
		//Mismo procedimiento que en los lados anteriores
		if(aux.tipo == 'CiudadF' || aux.tipo =='CiudadG'|| aux.tipo =='CiudadQ' || aux.tipo =='CiudadR'){
			otro=compruebaSeg(aux,1,4,7);
			if(otro==true){return otro}
		}else{
			if(aux.Izquierda== 'Granja'){
				if(aux.tipo == 'MonCamino' || aux.tipo =='MonGranja'|| aux.tipo =='CiudadE' ||
		  		   aux.tipo == 'CiudadH' || aux.tipo =='CiudadI'|| aux.tipo =='CiudadM' || aux.tipo == 'CiudadN'){
					otro=compruebaSeg(aux,1,2,3,4,5,6,7,8,9);
					if(otro==true){return otro}
					if(aux.Abajo != 'Ciudad'){
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}	
					}
					if(aux.Derecha != 'Ciudad'){
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
					if(aux.Arriba != 'Ciudad'){
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'|| aux.tipo =='Cruce3'){
					otro=compruebaSeg(aux,1,4,7);
					if(otro==true){return otro}
					otro=piezaArriba(aux,1,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,7,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadJ'){
					otro=compruebaSeg(aux,1,3,4,7);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,7,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,3,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadK'){
					otro=compruebaSeg(aux,1,4,7,9);
					if(otro==true){return otro}
					otro=piezaArriba(aux,1,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'Curva'){
					if(aux.Abajo == 'Camino'){
						otro=compruebaSeg(aux,1,2,3,4,7);
						if(otro==true){return otro}
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}else if(aux.Arriba == 'Camino'){
						otro=compruebaSeg(aux,1,4,7,8,9);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,9,tablero,otro);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}	
			}else if (pieza.Derecha == 'Camino'){
				var auxSeg=posSeg;
				if(pieza.tipo== 'CiudadJ'||pieza.tipo== 'CiudadK' || pieza.tipo== 'CiudadO'||pieza.tipo=='CiudadP'      			         ||pieza.tipo== 'Curva'){
					if(pieza.Abajo == 'Camino' && posSeg== 7){
						auxSeg=3;
					}else if(pieza.Arriba == 'Camino' && posSeg== 1){
						auxSeg=9;	
					}else if(pieza.Arriba == 'Camino' && posSeg== 4){
						auxSeg=9;	
					}else if(pieza.Abajo == 'Camino' && posSeg== 4){
						auxSeg=3;	
					}
				}

				if (auxSeg==1 || auxSeg==2){
					auxSeg=3;
				}else if (auxSeg==7 || auxSeg==8){
					auxSeg=9;
				}

				if(aux.tipo == 'CiudadS' || aux.tipo=='CiudadT'){
					if(auxSeg==3){
						otro=compruebaSeg(aux,1);
						if(otro==true){return otro}
					}else if(auxSeg==9){
						otro=compruebaSeg(aux,7);
						if(otro==true){return otro}
					}

				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'){
					if(auxSeg==3){
						otro=compruebaSeg(aux,1,2,3);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
						if(aux.Arriba!= 'Ciudad'){
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(auxSeg==9){
						otro=compruebaSeg(aux,7,8,9);
						if(otro==true){return otro}
						otro=piezaDerecha(aux,9,tablero,otro);
						if(otro==true){return otro}
						if(aux.Abajo != 'Ciudad'){
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}
					
				}else if(aux.tipo == 'CiudadJ' || aux.tipo =='Curva'|| aux.tipo =='CiudadK'|| aux.tipo =='CiudadO'||
					 aux.tipo =='CiudadP'){  
					if(auxSeg==3){	
						if(aux.Abajo=='Camino'){
							otro=compruebaSeg(aux,1,2,3,6,9);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
							if(aux.Derecha != 'Ciudad'){
								otro=piezaDerecha(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
							if(aux.Arriba != 'Ciudad'){
								otro=piezaArriba(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(aux.Arriba=='Camino'){
							otro=compruebaSeg(aux,1);
							if(otro==true){return otro}
							otro=piezaArriba(aux,1,tablero,otro);
							if(otro==true){return otro}
						} 
					}else if(auxSeg==9){
						if(aux.Arriba=='Camino'){
							otro=compruebaSeg(aux,3,6,7,8,9);
							if(otro==true){return otro}
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
							if(aux.Derecha != 'Ciudad'){
								otro=piezaDerecha(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
							if(aux.Abajo != 'Ciudad'){
								otro=piezaAbajo(aux,7,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(aux.Abajo=='Camino'){
							otro=compruebaSeg(aux,7);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,7,tablero,otro);
							if(otro==true){return otro}
						}
					}
				}else if(aux.tipo =='Cruce4'){
					if(auxSeg==3){
						otro=compruebaSeg(aux,1);
						if(otro==true){return otro}
						otro=piezaArriba(aux,1,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg==9){
						otro=compruebaSeg(aux,7);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,7,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadL' || aux.tipo =='Cruce3'){
					if(aux.Derecha != 'Camino'){
						if(auxSeg==3){
							otro=compruebaSeg(aux,1);
							if(otro==true){return otro}
							otro=piezaArriba(aux,1,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==9){
							otro=compruebaSeg(aux,7);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,7,tablero,otro);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Arriba != 'Camino'){
						if(auxSeg==3){
							otro=compruebaSeg(aux,1,2,3);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,3,tablero,otro);
							if(otro==true){return otro}
							if(aux.Arriba!= 'Ciudad'){
								otro=piezaArriba(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(auxSeg==9){
							otro=compruebaSeg(aux,7);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,7,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Abajo != 'Camino'){
						if(auxSeg==3){
							otro=compruebaSeg(aux,1);
							if(otro==true){return otro}
							otro=piezaArriba(aux,1,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==9){
							otro=compruebaSeg(aux,7,8,9);
							if(otro==true){return otro}
							otro=piezaDerecha(aux,9,tablero,otro);
							if(otro==true){return otro}
							if(aux.Abajo!= 'Ciudad'){
								otro=piezaAbajo(aux,7,tablero,otro);
								if(otro==true){return otro}
							}
						}
					}
				}else if(aux.tipo=='MonCamino'){
					otro=compruebaSeg(aux,1,2,3,6,7,8,9);
					if(otro==true){return otro}
					otro=piezaArriba(aux,1,tablero,otro);
					if(otro==true){return otro}
					otro=piezaDerecha(aux,9,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,7,tablero,otro);
					if(otro==true){return otro}
					if (auxSeg == 3){
						otro=piezaIzquierda(aux,7,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg == 9){
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}
			}
		}
	}
	return otro;
}

piezaIzquierda = function(pieza,posSeg,tablero,otro){
	var aux =tablero.piezaenposiciones((pieza.x-1),pieza.y);
	var otro=false;
	if(aux == undefined){
		//console.log('no mas piezas izquierda');
		return false;
	}
	//Mismo procedimiento que en los lados anteriores
	if(pieza.Izquierda != 'Ciudad' && aux.Derecha != 'Ciudad' && otro==false){
		if(aux.tipo == 'CiudadF' || aux.tipo =='CiudadG'|| aux.tipo =='CiudadQ' || aux.tipo =='CiudadR'){//cierra con estos 
			otro=compruebaSeg(aux,3,6,9);
			if(otro==true){return otro}
		}else{
			if(aux.Derecha== 'Granja'){
				if(aux.tipo == 'MonCamino' || aux.tipo =='MonGranja'|| aux.tipo =='CiudadE' ||
		  		   aux.tipo == 'CiudadH' || aux.tipo =='CiudadI'|| aux.tipo =='CiudadM' || aux.tipo == 'CiudadN'){
					otro=compruebaSeg(aux,1,2,3,4,5,6,7,8,9);
					if(otro==true){return otro}
					if(aux.Abajo != 'Ciudad'){
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}	
					}
					if(aux.Arriba != 'Ciudad'){
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
					if(aux.Izquierda != 'Ciudad'){
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'|| aux.tipo =='Cruce3'){
					otro=compruebaSeg(aux,3,6,9);
					if(otro==true){return otro}
					otro=piezaArriba(aux,3,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,3,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadJ'){
					otro=compruebaSeg(aux,3,6,7,9);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,7,tablero,otro);
					if(otro==true){return otro}			
					otro=piezaArriba(aux,3,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'CiudadK'){
					otro=compruebaSeg(aux,1,3,6,9);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,9,tablero,otro);
					if(otro==true){return otro}
					otro=piezIzquierda(aux,1,tablero,otro);
					if(otro==true){return otro}
				}else if(aux.tipo == 'Curva'){
					if(aux.Abajo == 'Camino'){
						otro=compruebaSeg(aux,1,2,3,6,9);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
					}else if(aux.Arriba == 'Camino'){
						otro=compruebaSeg(aux,3,6,7,8,9);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,7,tablero,otro);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
				}	
			}else if (pieza.Izquierda == 'Camino'){
				var auxSeg=posSeg;
				if(pieza.tipo== 'CiudadJ'||pieza.tipo== 'CiudadK' || pieza.tipo== 'CiudadO'||pieza.tipo=='CiudadP'      			         ||pieza.tipo== 'Curva'){
					if(pieza.Abajo == 'Camino' && posSeg== 9){
						auxSeg=1;
					}else if(pieza.Arriba == 'Camino' && posSeg== 3){
						auxSeg=7;	
					}else if(pieza.Arriba == 'Camino' && posSeg== 6){
						auxSeg=7;	
					}else if(pieza.Abajo == 'Camino' && posSeg== 6){
						auxSeg=1;	
					}
				}
				if (auxSeg==2 || auxSeg==3){
					auxSeg=1;
				}else if (auxSeg==8 || auxSeg==9){
					auxSeg=7;
				}

				if(aux.tipo == 'CiudadS' || aux.tipo=='CiudadT'){
					if(auxSeg==1){
						otro=compruebaSeg(aux,3);
						if(otro==true){return otro}
					}else if(auxSeg==7){
						otro=compruebaSeg(aux,9);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadD' || aux.tipo =='Recto'){
					if(auxSeg==1){
						otro=compruebaSeg(aux,1,2,3);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,1,tablero,otro);
						if(otro==true){return otro}
						if (aux.Arriba != 'Ciudad'){
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(auxSeg==7){
						otro=compruebaSeg(aux,7,8,9);
						if(otro==true){return otro}
						otro=piezaIzquierda(aux,7,tablero,otro);
						if(otro==true){return otro}
						if(aux.Abajo != 'Ciudad'){
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}
					
				}else if(aux.tipo == 'CiudadJ' || aux.tipo =='Curva'|| aux.tipo =='CiudadK'|| aux.tipo =='CiudadO'||
					 aux.tipo =='CiudadP'){ 
					if(auxSeg==1){	
						if(aux.Abajo=='Camino'){
							otro=compruebaSeg(aux,1,2,3,4,7);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,7,tablero,otro);
							if(otro==true){return otro}
							if(aux.Izquierda !='Ciudad'){
								otro=piezaIzquierda(aux,1,tablero,otro);
								if(otro==true){return otro}
							}
							if(aux.Arriba != 'Ciudad'){
								otro=piezaArriba(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(aux.Arriba=='Camino'){
							otro=compruebaSeg(aux,3);
							if(otro==true){return otro}
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
						} 
					}else if(auxSeg==7){
						if(aux.Arriba=='Camino'){
							otro=compruebaSeg(aux,1,4,7,8,9);
							if(otro==true){return otro}
							otro=piezaArriba(aux,1,tablero,otro);
							if(otro==true){return otro}
							if(aux.Izquierda != 'Ciudad'){
								otro=piezaIzquierda(aux,7,tablero,otro);
								if(otro==true){return otro}
							}
							if(aux.Abajo != 'Ciudad'){
								otro=piezaAbajo(aux,9,tablero,otro);
								if(otro==true){return otro}
							}
							
						}else if(aux.Abajo=='Camino'){
							otro=compruebaSeg(aux,9);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}
				}else if(aux.tipo =='Cruce4'){
					if(auxSeg==1){
						otro=compruebaSeg(aux,3);
						if(otro==true){return otro}
						otro=piezaArriba(aux,3,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg==7){
						otro=compruebaSeg(aux,9);
						if(otro==true){return otro}
						otro=piezaAbajo(aux,9,tablero,otro);
						if(otro==true){return otro}
					}
				}else if(aux.tipo == 'CiudadL' || aux.tipo =='Cruce3'){
					if(aux.Izquierda != 'Camino'){
						if(auxSeg==1){
							otro=compruebaSeg(aux,3);
							if(otro==true){return otro}
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==7){
							otro=compruebaSeg(aux,9);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Arriba != 'Camino'){
						if(auxSeg==1){
							otro=compruebaSeg(aux,1,2,3);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,1,tablero,otro);
							if(otro==true){return otro}
							if(aux.Arriba!= 'Ciudad'){
								otro=piezaArriba(aux,3,tablero,otro);
								if(otro==true){return otro}
							}
						}else if(auxSeg==7){
							otro=compruebaSeg(aux,9);
							if(otro==true){return otro}
							otro=piezaAbajo(aux,9,tablero,otro);
							if(otro==true){return otro}
						}
					}else if(aux.Abajo != 'Camino'){
						if(auxSeg==1){
							otro=compruebaSeg(aux,3);
							if(otro==true){return otro}
							otro=piezaArriba(aux,3,tablero,otro);
							if(otro==true){return otro}
						}else if(auxSeg==7){
							otro=compruebaSeg(aux,7,8,9);
							if(otro==true){return otro}
							otro=piezaIzquierda(aux,7,tablero,otro);
							if(otro==true){return otro}
							if(aux.Abajo!= 'Ciudad'){
								otro=piezaAbajo(aux,9,tablero,otro);
								if(otro==true){return otro}
							}
						}
					}
				}else if(aux.tipo=='MonCamino'){
					otro=compruebaSeg(aux,1,2,3,4,7,8,9);
					if(otro==true){return otro}
					otro=piezaArriba(aux,3,tablero,otro);
					if(otro==true){return otro}
					otro=piezaIzquierda(aux,1,tablero,otro);
					if(otro==true){return otro}
					otro=piezaAbajo(aux,9,tablero,otro);
					if(otro==true){return otro}
					if (auxSeg == 1){
						otro=piezaDerecha(aux,9,tablero,otro);
						if(otro==true){return otro}
					}else if(auxSeg == 7){
						otro=piezaDerecha(aux,3,tablero,otro);
						if(otro==true){return otro}
					}
				}
			}
		}
	}
	return otro;
}
