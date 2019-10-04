var fila;

function CargarBoton()
{
    var btnGuardar = document.getElementById("btnGuardar");
    var btnCancelar = document.getElementById("btnCancelar");
    var btnAgregarPersona = document.getElementById("btnAgregarPersona");  
    var contenedorPersona = document.getElementById("contenedorPersona");

    contenedorPersona.style.visibility = "hidden";

    btnGuardar.addEventListener("click", GuardarPersona);
    btnCancelar.addEventListener("click", MostrarIngreso);
    btnAgregarPersona.addEventListener("click", MostrarIngreso);

    


}

window.addEventListener("load", CargarBoton);
window.addEventListener("load", CargarLista);


function GuardarPersona()
{
    var nombre = document.getElementById("txtNombre"); 
    var apellido = document.getElementById("txtApellido");
    var telefono = document.getElementById("txtTelefono");
    var fecha = document.getElementById("txtFecha");

    if( nombre.value == "" || apellido.value == "")
    {
        nombre.className = "error";
        apellido.className = "error";
        telefono.className = "error";
        fecha.className = "error";
        alert("Debe agregar nombre y apellido");
    }
    else
    {   
        //Objeto JSON    
        var persona = {"nombre" : nombre.value, "apellido": apellido.value, "fecha" : fecha.value, "telefono" : telefono.value};
        var contenedorPersona = document.getElementById("contenedorPersona");  
     
        //Clases
        nombre.className = "sinError";
        apellido.className = "sinError";

        //Creo la tabla:
        CrearTabla(persona);

        //Limpio los casilleros del contenedor
        nombre.value = ""; 
        apellido.value = "";
        telefono.value = "";
        fecha.value = "";

        //Guardo en el servidor
        GuardarEnServidor(persona);
        
        //Vuelvo a ocultar el contenedor
        contenedorPersona.style.visibility = "hidden";
    }
    
}

function MostrarIngreso()
{
    var contenedorPersona = document.getElementById("contenedorPersona");

    if(contenedorPersona.style.visibility === "visible")
    {
        contenedorPersona.style.visibility = "hidden";
    }
    else
    {
        contenedorPersona.style.visibility = "visible";
    }
    
}

function Borrar(e)
{
 
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.parentNode); //me muestra el padre
    console.log(e.target.parentNode.parentNode); //me muestra el padre del padre

    //recupero el componente y lo cambio
    // var tagA = e.target.parentNode;
    // tagA.innerHTML = "Otra Cosa";

    //saco la fila
    e.target.parentNode.parentNode.innerHTML = "";

    // alert("Se borra");
}

function Editar(e)
{
    var i;
    var txtNombre = document.getElementById("txtNombre"); 
    var txtApellido = document.getElementById("txtApellido");
    var btnGuardar = document.getElementById("btnGuardar");

    // le saco el evento por defecto (redireccionar a href)
    e.preventDefault();

    // busco los hijos de tr: (apellido y nombre)
    var hijos = e.target.parentNode.parentNode.children;

    // guardo la fila en una variable global
    fila = e.target.parentNode.parentNode;

    // recupero los objetos:
    for(i = 0; i < hijos.length-1; i++)
    {
        if(i == 0)
        {
            txtNombre.value = hijos[i].innerHTML;
        }
        else
        {
            txtApellido.value = hijos[i].innerHTML;
        }
    }

    MostrarIngreso();

    // modifico el listener
    btnGuardar.removeEventListener("click", GuardarPersona);
    btnGuardar.addEventListener("click", Modificar);
}

function Modificar()
{
    var nombre = document.getElementById("txtNombre"); 
    var apellido = document.getElementById("txtApellido");
    
    
    if( nombre.value == "" || apellido.value == "")
    {
        nombre.className = "error";
        apellido.className = "error";
        alert("Debe agregar nombre y apellido");
    }
    else
    {       
        var contenedorPersona = document.getElementById("contenedorPersona");    
        var fila = document.createElement("<tr>");
        var columna = document.createElement("<td>");
        var textoTabla = document.createTextNode(nombre.value);
        var linkBorrar = document.createElement("<a>");
        var linkEditar = document.createElement("<a>");


        nombre.className = "sinError";
        apellido.className = "sinError";

        //fila variable global

        
        // fila.innerHTML = "<tr><td>" + nombre.value + "</td><td>"
        //     + apellido.value + "</td><td>" +
        //     "<a href='' onclick= Borrar(event)>borrar</a><a href='' onclick= Editar(event)>editar</a>" +
        //     "</td></</tr>";

        columna.appendChild(textoTabla);
        fila.appendChild(columna);


        columna = document.createElement("<td>");
        textoTabla = document.createTextNode(apellido.value);

        columna.appendChild(textoTabla);
        fila.appendChild(columna);

        columna = document.createElement("<td>");
        linkBorrar.setAttribute("href", "''");
        linkBorrar.setAttribute("onclick", "Borrar(event)");
        textoTabla = document.createTextNode("Borrar");
        linkBorrar.appendChild(textoTabla);
        columna.appendChild(linkBorrar);
        fila.appendChild(columna);


        linkEditar.setAttribute("href", "''");
        linkEditar.setAttribute("onclick", "Editar(event)");
        textoTabla = document.createTextNode("Editar");
        linkEditar.appendChild(textoTabla);
        columna.appendChild(linkEditar);
        fila.appendChild(columna);

        nombre.value = ""; 
        apellido.value = "";

        contenedorPersona.style.visibility = "hidden";

        console.log("edito");

        btnGuardar.removeEventListener("click", Modificar);
        btnGuardar.addEventListener("click", GuardarPersona);
    }



}


function CargarLista()
{
    
    var http = new XMLHttpRequest();

    var dirhttp = "http://localhost:3000/personas";

    http.open("GET", dirhttp);

    http.onreadystatechange = function()
    {

        console.log(http.readyState);

        if(http.readyState === 4 && http.status === 200)
        {
           var respuesta = http.responseText;

           console.log("inicio la funcion");

           var lista = JSON.parse(respuesta);

           for(var i= 0; i < lista.length; i++)
           {
               var persona = lista[i];

               CrearTabla(persona);

           }

           //llamo funcion para pasar objeto a row

        }

       
        

    }

    http.send();


}

function GuardarEnServidor(persona)
{
    var http = new XMLHttpRequest();
    var dirhttp = "http://localhost:3000/nuevaPersona";
    var imgLoading = document.getElementById("imagen-loading"); //gif loading

    //Muestro el spinner
    imgLoading.style.visibility = "visible";

    http.onreadystatechange = function()
    {

        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

            var respuesta = JSON.parse(http.responseText);
            
            imgLoading.style.visibility = "hidden";

            if(respuesta["respuesta"] === "ok")
            {
                
                alert("persona guardada");

            }
            else
            {

                alert("no se guardo la persona");
            }
        }
    }

    console.log(persona);

    
    http.open("POST", dirhttp);

    //Cuando uso POST, le tengo que avisar que le paso un JSON:
    http.setRequestHeader('Content-Type', "application/JSON"); 

    //paso el JSON a string
    http.send(JSON.stringify(persona));
}


//Funcion que crea una tabla usando DOM, parametro: objeto con los datos
function CrearTabla(persona)
{

    var tbody = document.getElementById("tbody");      
    var fila;
    var columna;
    var textoTabla;
    var enlace;

    //Creo la tabla:
    
    //Fila:
    fila = document.createElement("tr");
    
    //Columna nombre:
    columna = document.createElement("td");
    textoTabla = document.createTextNode(persona.nombre);
    columna.appendChild(textoTabla);
    fila.appendChild(columna);

    //Columna apellido:
    columna = document.createElement("td");
    textoTabla = document.createTextNode(persona.apellido);
    columna.appendChild(textoTabla);
    fila.appendChild(columna);

    //Columna teléfono:
    columna = document.createElement("td");
    textoTabla = document.createTextNode(persona.telefono);
    columna.appendChild(textoTabla);
    fila.appendChild(columna);

    //Columna fecha:
    columna = document.createElement("td");
    textoTabla = document.createTextNode(persona.fecha);
    columna.appendChild(textoTabla);
    fila.appendChild(columna);

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

    //Adjunto todo al tbody:
    tbody.appendChild(fila);
}




