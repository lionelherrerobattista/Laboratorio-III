
window.addEventListener("load", CargarPagina);  

function CargarPagina()
{
    // creo un elemento de tipo parrafo
    var elemento = document.createElement("p"); // <p></p>

    //Agrego el texto
    var texto = document.createTextNode("Hola Mundo");

    // le agrego el elemento
    // package.innerHTML = "Hola Mundo";
    elemento.appendChild(texto);

    
    var body = document.getElementById("body");
    
    //Agrego todo en el body
    body.appendChild(elemento);

}

   