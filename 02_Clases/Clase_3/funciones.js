function CargarBoton()
{
    var btnGuardar = document.getElementById("btnGuardar");

    btnGuardar.addEventListener("click", GuardarPersona);


}

window.addEventListener("load", CargarBoton);


function GuardarPersona()
{
    var nombre = document.getElementById("txtNombre").value; 
    var apellido = document.getElementById("txtApellido").value;
    

    if( nombre == "" || apellido == "")
    {
        document.getElementById("txtNombre").className = "error";
        document.getElementById("txtApellido").className = "error";
        alert("Debe agregar nombre y apellido");
    }
    else
    {
        
        var txtNombre = document.getElementById("txtNombre").className = "sinError";
        var txtApellido = document.getElementById("txtApellido").className = "sinError";

        document.getElementById("tbody").innerHTML += "<tr><td>" + nombre + "</td><td>"
         + apellido + "</td><td>" + "<a href='' onclick= Borrar(event)>borrar</a>" + "</td></</tr>";
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
    e.target.parentNode.parentNode.innerHTML = "",

    alert("Se borra");
}