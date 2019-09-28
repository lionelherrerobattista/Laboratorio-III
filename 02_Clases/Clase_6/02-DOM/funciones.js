
    // creo un elemento de tipo parrafo

    
    var elemento = document.createElement("p"); // <p></p>

    var texto = elemento.createTextoNode("Hola Mundo");

    // le agrego el elemento
    // package.innerHTML = "Hola Mundo";
    elemento.appendChild(texto);

    var body = document.getElementById("body");

    body.appendChild(elemento);

   