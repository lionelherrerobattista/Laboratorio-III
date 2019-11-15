// Funciones Básicas
function sumar( a, b ):number{
  return a + b;
}
//Arrowfunction
var sumarAr = (a, b)=>a+b; 

var contar = function( heroes ):number{
  return heroes.length;
}

var superHeroes:string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];

contar(superHeroes);

//Parametros por defecto
function llamarBatman( llamar:boolean = false):void{
  if( llamar ){
    console.log("Batiseñal activada");
  }
}

llamarBatman();

// Rest?
function unirheroes( ...personas:string[] ):string{
  return personas.join(", ");
}


// Tipo funcion
function noHaceNada( numero, texto, booleano, arreglo ){
}

// Crear el tipo de funcion que acepte la funcion "noHaceNada"
var noHaceNadaTampoco = function(noHaceNada:any){

};

