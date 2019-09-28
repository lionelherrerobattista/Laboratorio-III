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

    var imgLoading = document.getElementById("imagen-loading");//gif loading

    
    
    if( nombre.value == "" || apellido.value == "")
    {
        nombre.className = "error";
        apellido.className = "error";
        alert("Debe agregar nombre y apellido");
    }
    else
    {       
        var contenedorPersona = document.getElementById("contenedorPersona");
        var persona = {"nombre" : nombre.value, "apellido": apellido.value, "fecha" : fecha.value, "telefono" : telefono.value};

        imgLoading.style.visibility = "visible";
        nombre.className = "sinError";
        apellido.className = "sinError";

        document.getElementById("tbody").innerHTML += "<tr><td>" + nombre.value + "</td><td>"
            + apellido.value + "</td><td>" + telefono.value + "</td><td>" + fecha.value + "</td><td>" +
            "<a href='' onclick= Borrar(event)>borrar</a><a href='' onclick= Editar(event)>editar</a>" +
            "</td></</tr>";

        nombre.value = ""; 
        apellido.value = "";
        telefono.value = "";
        fecha.value = "";

        //guardo en el servidor
        var http = new XMLHttpRequest();
        var dirhttp = "http://localhost:3000/nuevaPersona";

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

        nombre.className = "sinError";
        apellido.className = "sinError";

        //fila variable global
        fila.innerHTML = "<tr><td>" + nombre.value + "</td><td>"
            + apellido.value + "</td><td>" +
            "<a href='' onclick= Borrar(event)>borrar</a><a href='' onclick= Editar(event)>editar</a>" +
            "</td></</tr>";

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
    var tabla = document.getElementById("tbody");
    
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

               tabla.innerHTML += "<tr><td>" + persona.nombre + "</td><td>"
               + persona.apellido + "</td><td>" + persona.telefono + "</td><td>" + persona.fecha + "</td><td>" +
               "<a href='' onclick= Borrar(event)>borrar</a><a href='' onclick= Editar(event)>editar</a>" +
               "</td></</tr>";

           }

           //llamo funcion para pasar objeto a row

        }

       
        

    }

    http.send();


}




