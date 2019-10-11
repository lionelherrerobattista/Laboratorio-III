window.addEventListener("load", CargarBotones);

//Carga los botones con sus listeners
function CargarBotones()
{
    // var btnNewPost = document.getElementById("btnNewPost");
    // var divNuevoPost = document.getElementById("divNuevoPost");

    // divNuevoPost.style.visibility = "hidden";

    // btnNewPost.addEventListener("click", CrearDivNewPost);
    
}

//Muestra/Oculta el div que crea el post
function MostrarIngreso()
{
    var divNuevoPost = document.getElementById("divNuevoPost");

    if(divNuevoPost.style.visibility === "visible")
    {
        divNuevoPost.style.visibility = "hidden";
    }
    else
    {
        divNuevoPost.style.visibility = "visible";
    }
    
}

//Función que crea un objeto DOM con un texto
//Recibe elemento a crear y el texto que muestra
function crearObjetoConTexto(tipoElemento, texto)
{
    var objeto = document.createElement(tipoElemento);
    var nodoTexto = document.createTextNode(texto);
    objeto.appendChild(nodoTexto);

    return objeto;
}


//Función que crea un input DOM con un texto
//Recibe placeholder y el id
function CrearInputTexto(placeholder, id)
{
    var inputTexto;

    inputTexto = document.createElement("input");

    inputTexto.setAttribute("type", "text");
    inputTexto.setAttribute("placeholder", placeholder);
    inputTexto.setAttribute("id", id);

    return inputTexto;
}

//Guarda un dato en el Servidor
//Tipo de petición: GET o POST
function GuardarEnServidor(tipoPeticion, dato, dirhttp)
{
    var http; 

    http = new XMLHttpRequest();

    http.onreadystatechange = function (){
        
        VerificarRespuesta(http);
    }

    switch(tipoPeticion)
    {
        case "POST":
        http.open(tipoPeticion, dirhttp);
        //Cuando uso POST, aviso que paso texto plano:
        // http.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        http.send(JSON.stringify(dato));
        break;

        case "GET":
        // dirhttp = "?nombre= "xx" &//Agrego los parámetros
        http.open(tipoPeticion, dirhttp);
        http.send();
        break;

        default:
        console.log("No es una petición válida");
    }

    
}

//Verifica la respuesta del servidor
function VerificarRespuesta(http)
{
    var respuesta;

    console.log("Llegó respuesta", http.readyState, http.status);

    if(http.readyState === 4 && http.status === 200)
    {
        console.log("Tenemos respuesta", http.responseText);

        var respuesta = JSON.parse(http.responseText);

        if(respuesta["title"] != null)
        {
            CrearPost(respuesta);
        }
        else
        {
            alert("no se guardo la objetoJSON");
        }
    }   
}

//Funcion que crea una fila usando DOM, parametro: objeto con los datos
function CrearFila(dato)
{
  
    var fila;
    var columna;
    var textoTabla;
    var enlace;

    //Creo la tabla:
    
    //Fila:
    fila = document.createElement("tr");

    Object.keys(persona).forEach(function (key) {
        
        columna = crearObjetoConTexto("td", peronsa[key]);
        fila.appendChild(columna);

     });

    //Columna Acciones:
    columna = document.createElement("td");
    enlace = document.createElement("a");
    enlace.setAttribute("href", "''");
    enlace.setAttribute("onclick", "Borrar(event)");
    textoTabla = document.createTextNode("Borrar");
    enlace.appendChild(textoTabla);
    columna.appendChild(enlace);
    fila.appendChild(columna);

    enlace = document.createElement("a");
    enlace.setAttribute("href", "''");
    enlace.setAttribute("onclick", "Editar(event)");
    textoTabla = document.createTextNode("Editar");
    enlace.appendChild(textoTabla);
    columna.appendChild(enlace);
    fila.appendChild(columna);

    return fila;

}