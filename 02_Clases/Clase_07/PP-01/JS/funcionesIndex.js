
window.addEventListener("load", CargarBotones);

function CargarBotones()
{
    var btnNewPost = document.getElementById("btnNewPost");
    var divNuevoPost = document.getElementById("divNuevoPost");

    divNuevoPost.style.visibility = "hidden";

    btnNewPost.addEventListener("click", CrearDivNewPost);
    
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

function CrearDivNewPost(e)
{
    var divNuevoPost;
    var titulo;
    var btnNewPost;
    var labelTitle;
    var labelHeader;
    var labelText;
    var postTitle;
    var postHeader;
    var postText;
    var btnPost;

    divNuevoPost = document.getElementById("divNuevoPost");
    btnNewPost = document.getElementById("btnNewPost");

    e.preventDefault();//evito que se recargue la página. Default elemento-> <a>

    //encabezado div
    titulo = crearObjetoConTexto("h2", "Write your new post");
    divNuevoPost.appendChild(titulo);

    //label de titulo
    labelTitle = crearObjetoConTexto("label","Post Title");
    divNuevoPost.appendChild(labelTitle);

    //txtTitulo
    postTitle = CrearInputTexto("Título", "txtTitulo");
    divNuevoPost.appendChild(postTitle);

    //lblHeader
    labelHeader= crearObjetoConTexto("label","Post Header");
    divNuevoPost.appendChild(labelHeader);

    //txtHeader
    postHeader = CrearInputTexto("Encabezado", "txtHeader");
    divNuevoPost.appendChild(postHeader);

    //lblText
    labelText= crearObjetoConTexto("label","Post Text")
    divNuevoPost.appendChild(labelText);

    //txtTexto
    postText = document.createElement("textarea");
    postText.setAttribute("id", "txtTexto");
    divNuevoPost.appendChild(postText);

    btnPost = document.createElement("input");
    btnPost.setAttribute("type", "button");
    btnPost.setAttribute("value", "Post");
    btnPost.addEventListener("click", GuardarPost);
    divNuevoPost.appendChild(btnPost);

    MostrarIngreso();

    //Saco los eventos para que no me cree más divs
    btnNewPost.removeEventListener("click", CrearDivNewPost);
    btnNewPost.addEventListener("click", MostrarIngreso);

}


function GuardarPost()
{
    var titulo;
    var header;
    var texto;
    var autor;

    titulo = document.getElementById("txtTitulo");
    header = document.getElementById("txtHeader");
    texto = document.getElementById("txtTexto");
    autor = getParameterByName("email", window.location.href);

    var datosPost = {
        "title": titulo.value,
        "header": header.value,
        "posttext": texto.value,
        "author": autor
    }

    //Guardo el post en el servidor y muestro los datos en la página:
    GuardarEnServidor("POST", datosPost, "http://localhost:1337/postearNuevaEntrada");

    MostrarIngreso();
 
}

//Función que crea el post utilizando DOM
function CrearPost(objeto)
{
    var sectionPostsUsuarios;
    var divPost;
    var tituloPost;
    var headerPost;
    var textoPost;
    var datosPost;

    sectionPostsUsuarios = document.getElementById("PostsUsuarios");

    divPost = document.createElement("div");

    tituloPost = crearObjetoConTexto("h2", objeto["title"]);
    divPost.appendChild(tituloPost);

    headerPost = crearObjetoConTexto("h4", objeto["header"]);
    divPost.appendChild(headerPost);

    textoPost = crearObjetoConTexto("p", objeto["posttext"]);

    divPost.appendChild(textoPost);

    datosPost = crearObjetoConTexto("p", "Posted by " + objeto["author"] + " on " + objeto["date"]);
    divPost.appendChild(datosPost);
    
    sectionPostsUsuarios.appendChild(divPost);
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


