
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
    var nodoTexto;
    var labelHeader;
    var labelText;
    var postTitle;
    var postHeader;
    var postText;
    var btnPost;

    divNuevoPost = document.getElementById("divNuevoPost");
    btnNewPost = document.getElementById("btnNewPost");

    e.preventDefault();

    //encabezado div
    titulo = document.createElement("h2");
    nodoTexto = document.createTextNode("Write your new post");
    titulo.appendChild(nodoTexto);
    divNuevoPost.appendChild(titulo);

    //label de titulo
    labelTitle = document.createElement("label");
    nodoTexto = document.createTextNode("Post Title");
    labelTitle.appendChild(nodoTexto);
    divNuevoPost.appendChild(labelTitle);

    //txtTitulo
    postTitle = document.createElement("input");
    postTitle.setAttribute("type", "text");
    postTitle.setAttribute("placeholder", "Título");
    postTitle.setAttribute("id", "txtTitulo");
    divNuevoPost.appendChild(postTitle);

    //lblHeader
    labelHeader= document.createElement("label");
    nodoTexto = document.createTextNode("Post Header");
    labelHeader.appendChild(nodoTexto);
    divNuevoPost.appendChild(labelHeader);

    //txtHeader
    postHeader = document.createElement("input");
    postHeader.setAttribute("type", "text");
    postHeader.setAttribute("placeholder", "Encabezado");
    postHeader.setAttribute("id", "txtHeader");
    divNuevoPost.appendChild(postHeader);

    //lblText
    labelText= document.createElement("label");
    nodoTexto = document.createTextNode("Post Text:");
    labelText.appendChild(nodoTexto);
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

    GuardarEnServidor(datosPost);

    MostrarIngreso();
 
}

function GuardarEnServidor(objetoJSON)
{
    var http = new XMLHttpRequest();
    var dirhttp = "http://localhost:1337/postearNuevaEntrada";
    // var imgLoading = document.getElementById("imagen-loading"); //gif loading

    // //Muestro el spinner
    // imgLoading.style.visibility = "visible";

    http.onreadystatechange = function()
    {

        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

            var respuesta = JSON.parse(http.responseText);
            
            // imgLoading.style.visibility = "hidden";

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

    console.log(objetoJSON);

    
    http.open("POST", dirhttp);

    //Cuando uso POST, le tengo que avisar que le paso un JSON:
    // http.setRequestHeader('Content-Type', "application/JSON"); 

    //paso el JSON a string
    http.send(JSON.stringify(objetoJSON));
}

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


