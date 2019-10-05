var filaParaModificar;

window.addEventListener("load", CargarBoton);
window.addEventListener("load", CargarDesdeServidor);

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
        var tbody;
        var fila;

        tbody = document.getElementById("tbody");
     
        //Clases
        nombre.className = "sinError";
        apellido.className = "sinError";
        telefono.className = "sinError";
        fecha.className = "sinError";

        //Creo la tabla:
        fila = CrearFila(persona);

        //Adjunto todo al tbody:
        tbody.appendChild(fila);

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

//Funcion que muestra u oculta el boton
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

//Función que borra una línea de la tabla
function Borrar(e)
{
 
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.parentNode); //me muestra el padre
    console.log(e.target.parentNode.parentNode); //me muestra el padre del padre

    //saco la fila
    e.target.parentNode.parentNode.innerHTML = "";

    // alert("Se borra");
}

function Editar(e)
{
    var i;
    var txtNombre = document.getElementById("txtNombre"); 
    var txtApellido = document.getElementById("txtApellido");
    var txtTelefono = document.getElementById("txtTelefono");
    var txtFecha = document.getElementById("txtFecha");

    // le saco el evento por defecto (redireccionar a href)
    e.preventDefault();

    // busco los hijos de tr: (apellido y nombre)
    var hijos = e.target.parentNode.parentNode.children;

    // guardo la fila en una variable global
    filaParaModificar = e.target.parentNode.parentNode;

    // recupero los objetos:
    txtNombre.value = hijos[0].innerHTML;
    txtApellido.value = hijos[1].innerHTML;
    txtTelefono.value = hijos[2].innerHTML;
    txtFecha.value = hijos[3].innerHTML;

    MostrarIngreso();

    // modifico el listener
    btnGuardar.removeEventListener("click", GuardarPersona);
    btnGuardar.addEventListener("click", Modificar);
}

function Modificar()
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

        var persona = {"nombre" : nombre.value, "apellido": apellido.value, "fecha" : fecha.value, "telefono" : telefono.value};
        var contenedorPersona;
        var tbody;
        var filaModificada;

        contenedorPersona = document.getElementById("contenedorPersona"); 
        tbody = document.getElementById("tbody");
     
        //Clases
        nombre.className = "sinError";
        apellido.className = "sinError";
        telefono.className = "sinError";
        fecha.className = "sinError";

        //Creo la tabla:
        filaModificada = CrearFila(persona);

        tbody.replaceChild(filaModificada, filaParaModificar);

        //Limpio los casilleros del contenedor
        nombre.value = ""; 
        apellido.value = "";
        telefono.value = "";
        fecha.value = "";
        
        //Vuelvo a ocultar el contenedor
        contenedorPersona.style.visibility = "hidden";

        btnGuardar.removeEventListener("click", Modificar);
        btnGuardar.addEventListener("click", GuardarPersona);
    }

}


function CargarDesdeServidor()
{
    var tbody = document.getElementById("tbody");
 
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

               var fila = CrearFila(persona);

               tbody.appendChild(fila);

           }

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


//Funcion que crea una fila usando DOM, parametro: objeto con los datos
function CrearFila(persona)
{
  
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


    return fila;

}




