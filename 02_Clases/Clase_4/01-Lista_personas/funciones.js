function CargarBoton()
{
    var btnGuardar = document.getElementById("btnGuardar");
    var btnAgregarPersona = document.getElementById("btnAgregarPersona");  
    var contenedorPersona = document.getElementById("contenedorPersona");

    contenedorPersona.style.visibility = "hidden";

    btnGuardar.addEventListener("click", GuardarPersona);
    btnAgregarPersona.addEventListener("click", MostrarIngreso);


}

window.addEventListener("load", CargarBoton);


function GuardarPersona()
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

        document.getElementById("tbody").innerHTML += "<tr><td>" + nombre.value + "</td><td>"
            + apellido.value + "</td><td>" + "<a href='' onclick= Borrar(event)>borrar</a>" + "</td></</tr>";

        nombre.value = ""; 
        apellido.value = "";

        contenedorPersona.style.visibility = "hidden";
    }
    
}

function MostrarIngreso()
{
    var contenedorPersona = document.getElementById("contenedorPersona");

    contenedorPersona.style.visibility = "visible";
}

// function Borrar(e)
// {
 
//     e.preventDefault();
//     console.log(e.target);
//     console.log(e.target.parentNode); //me muestra el padre
//     console.log(e.target.parentNode.parentNode); //me muestra el padre del padre

//     //recupero el componente y lo cambio
//     // var tagA = e.target.parentNode;
//     // tagA.innerHTML = "Otra Cosa";

//     //saco la fila
//     e.target.parentNode.parentNode.innerHTML = "",

//     alert("Se borra");
// }

