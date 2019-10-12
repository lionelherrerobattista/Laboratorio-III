window.addEventListener("load", CargarPagina);

var id;
var tarjetaPersona;

//Carga los botones con sus listeners
function CargarPagina()
{
    var contenedorPersona;
    var btnCerrar;
    var btnModificar;
    var btnEliminar;

    contenedorPersona = document.getElementById("contenedorPersona");
    contenedorPersona.style.visibility = "hidden";

    btnCerrar = document.getElementById("botonCerrar");
    btnCerrar.addEventListener("click", CerrarContenedor);

    btnModificar = document.getElementById("btnModificar");
    btnModificar.addEventListener("click", ModificarTarjeta);

    btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.addEventListener("click", Eliminar);

    CargarDesdeServidor();



    // var btnNewPost = document.getElementById("btnNewPost");
    // var divNuevoPost = document.getElementById("divNuevoPost");

    

    // btnNewPost.addEventListener("click", CrearDivNewPost);
    
}

//Función que crea un tarjeta DOM con un texto
//Recibe elemento a crear y el texto que muestra
function crearTarjeta(id, nombre, apellido, sexo)
{
    var tarjeta = document.createElement("div");
    tarjeta.setAttribute("class", "tarjeta");

    var divDatos = document.createElement("div");
    divDatos.setAttribute("class", "tarjetaDatos");

    var imgFoto = document.createElement("img");
    imgFoto.setAttribute("src", "./img/user.png");
    tarjeta.appendChild(imgFoto);

    var idOculto= document.createElement("hidden");
    idOculto.setAttribute("value", id);
    divDatos.appendChild(idOculto);

    var parrafo= document.createElement("p");
    var txtNombre = document.createTextNode(nombre);
    parrafo.appendChild(txtNombre);
    divDatos.appendChild(parrafo);

    parrafo= document.createElement("p");
    var txtApellido = document.createTextNode(apellido);
    parrafo.appendChild(txtApellido);
    divDatos.appendChild(parrafo);

    parrafo= document.createElement("p");
    var txtSexo = document.createTextNode(sexo);
    parrafo.appendChild(txtSexo);
    divDatos.appendChild(parrafo);

    tarjeta.appendChild(divDatos);

    return tarjeta;
}

function CargarDesdeServidor()
{
    var divCards = document.getElementById("cards");
 
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


               var card = crearTarjeta(persona.id, persona.nombre, persona.apellido, persona.sexo);
                card.addEventListener("dblclick", MostrarContenedor);

               divCards.appendChild(card);
           }

        }       

    }

    http.send();

}

function MostrarContenedor(e)
{
    var contenedorPersona = document.getElementById("contenedorPersona");
    var txtNombre = document.getElementById("txtNombre");
    var txtApellido = document.getElementById("txtApellido");
    var radioMale = document.getElementById("rdMale");
    var radioFemale = document.getElementById("rdFemale");


    listaDatos = e.target.childNodes[1].childNodes;
    tarjetaPersona = e.target;

    id = listaDatos[0].getAttribute("value");

    txtNombre.value = listaDatos[1].innerText;
    txtApellido.value = listaDatos[2].innerText;

    

    if(listaDatos[3].innerText === "Female")
    {
        radioFemale.setAttribute("checked", "checked");
        
    }
    else
    {
        
        radioMale.setAttribute("checked", "checked");
    }

    if(contenedorPersona.style.visibility === "visible")
    {
        contenedorPersona.style.visibility = "hidden";
    }
    else
    {
        contenedorPersona.style.visibility = "visible";
    }
}

function ModificarTarjeta()
{

    var contenedorPersona = document.getElementById("contenedorPersona");
    var txtNombre = document.getElementById("txtNombre");
    var txtApellido = document.getElementById("txtApellido");
    var radiosBtn = document.getElementsByName("gender");
    var nombre;
    var apellido;
    var sexo;
    var i;
    
    nombre = txtNombre.value;
    apellido = txtApellido.value;
    
    for(i=0; i < radiosBtn.length; i++)
    {
        if(radiosBtn[i].checked)
        {
            sexo = radiosBtn[i].value;
            break;
        }
    }
    
    var persona = {
        "id": id,
        "nombre": nombre,
        "apellido":apellido,
        "sexo": sexo
    }

    
    GuardarPersona(persona);
    // GuardarEnServidor("POST", persona, "http://localhost:3000/editar");



}

function CerrarContenedor()
{
    if(contenedorPersona.style.visibility === "visible")
    {
        contenedorPersona.style.visibility = "hidden";
    }
    else
    {
        contenedorPersona.style.visibility = "visible";
    }
}

function Eliminar()
{

    var tarjetas = document.getElementById("cards");

    var persona = {
        "id": id,
    }

    BorrarPersona(persona);

    

}



function GuardarPersona(persona)
{
    var http = new XMLHttpRequest();
    var dirhttp = "http://localhost:3000/editar";

    // var imgLoading = document.getElementById("imagen-loading"); //gif loading

    //Muestro el spinner
    // imgLoading.style.visibility = "visible";

    http.onreadystatechange = function()
    {

        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

            var respuesta = JSON.parse(http.responseText);
            
            // imgLoading.style.visibility = "hidden";

            // if(respuesta["respuesta"] === "ok")
            // {
                
            //     alert("persona guardada");

            // }
            // else
            // {

            //     alert("no se guardo la persona");
            // }
        }
    }

    console.log(persona);

    
    http.open("POST", dirhttp);

    //Cuando uso POST, le tengo que avisar que le paso un JSON:
    http.setRequestHeader('Content-Type', "application/JSON"); 

    //paso el JSON a string
    http.send(JSON.stringify(persona));
}


function BorrarPersona(persona)
{
    var http = new XMLHttpRequest();
    var dirhttp = "http://localhost:3000/eliminar";

    // var imgLoading = document.getElementById("imagen-loading"); //gif loading

    //Muestro el spinner
    // imgLoading.style.visibility = "visible";

    http.onreadystatechange = function()
    {

        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

            var respuesta = JSON.parse(http.responseText);
            
            // imgLoading.style.visibility = "hidden";

            if(respuesta["respuesta"] === "ok")
            {
                
                tarjetas.removeChild(tarjetaPersona);

            }
            else
            {

                
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

// function VerificarRespuesta(http)
// {
//     var respuesta;

//     console.log("Llegó respuesta", http.readyState, http.status);

//     if(http.readyState === 4 && http.status === 200)
//     {
//         console.log("Tenemos respuesta", http.responseText);

//         var respuesta = JSON.parse(http.responseText);

//         if(respuesta["title"] != null)
//         {
//             CrearPost(respuesta);
//         }
//         else
//         {
//             alert("no se guardo la objetoJSON");
//         }
//     }   
// }