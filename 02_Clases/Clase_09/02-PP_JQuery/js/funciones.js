$("document").ready(CargarPagina);//Ejecuto la función cuando carga la página

var id;
var tarjetaPersona;

//Carga los botones con sus listeners
function CargarPagina()
{
    var contenedorPersona;
    var btnCerrar;
    var btnModificar;
    var btnEliminar;

    contenedorPersona = $("#contenedorPersona");
    contenedorPersona.css("visibility","hidden");

    btnCerrar = $("#botonCerrar");
    btnCerrar.click(MostrarDivPersona);

    btnModificar = $("#btnModificar");
    btnModificar.click(ModificarTarjeta);

    btnEliminar = $("#btnEliminar");
    btnEliminar.click(Eliminar);

    $(".spinner").css("visibility", "hidden");

    CargarDesdeServidor();
    
}

//Función que crea un tarjeta DOM con un texto
//Recibe elemento a crear y el texto que muestra
function CrearTarjeta(persona)
{
    var tarjeta;
    var divDatos;
    var imgFoto;
    var idOculto;
    var parrafo;

    tarjeta = $("<div></div>");
    tarjeta.attr("class", "tarjeta");

    divDatos = $("<div></div>");
    divDatos.attr("class", "tarjetaDatos");

    imgFoto = $("<img></img>");
    imgFoto.attr("src", "./img/user.png");
    tarjeta.append(imgFoto);

    idOculto= $("<hidden></hidden>");
    idOculto.attr("value", persona.id);
    divDatos.append(idOculto);

    parrafo= $("<p></p>").text(persona.nombre);
    divDatos.append(parrafo);

    parrafo= $("<p></p>").text(persona.apellido);
    divDatos.append(parrafo);

    parrafo= $("<p></p>").text(persona.sexo);
    divDatos.append(parrafo);

    tarjeta.append(divDatos);

    return tarjeta;
}

function CargarDesdeServidor()
{
    
    var dirhttp;

    dirhttp = "http://localhost:3000/personas";

    //Instrucción GET 
    $.get(dirhttp, function(data,status)
    {
        var divCards;
        var listaPersonas;
        var persona;
        var card;
    
        divCards = $("#cards");

        if(status === "success")
        {
            listaPersonas = data;//Ya viene como JSON

            for(var i= 0; i < listaPersonas.length; i++)
            {
                persona = listaPersonas[i];

                card = CrearTarjeta(persona);

                divCards.append(card);
                
            }

            $(".tarjeta").dblclick(MostrarContenedor);//Asigno el evento a toda la clase

        }

    });

}

function MostrarContenedor(event)
{
    var listaDatos;
    var contenedorPersona = $("#contenedorPersona");
    var txtNombre = $("#txtNombre");
    var txtApellido = $("#txtApellido");
    var radioMale = $("#rdMale");
    var radioFemale = $("#rdFemale");


    //Recupero los datos del div:
    tarjetaPersona = $(event.target);//para variable global
    listaDatos = $(event.target).children("div").children();

    id = $(listaDatos[0]).attr("value");//variable global

    //Cargo los datos en el div:
    txtNombre.val($(listaDatos[1]).text());
    txtApellido.val($(listaDatos[2]).text());

    if($(listaDatos[3]).text() === "Female")
    {
        radioFemale.prop("checked", true);
        
    }
    else
    {
        
        radioMale.prop("checked", true);
    }

    MostrarDivPersona();

}

function ModificarTarjeta()
{
    var nombre;
    var apellido;
    var sexo;
    var i;
    var txtNombre = $("#txtNombre");
    var txtApellido = $("#txtApellido");
    var radiosBtn = $("[name=gender]");

    nombre = txtNombre.val();
    apellido = txtApellido.val();
    
    for(i=0; i < radiosBtn.length; i++)
    {
        if($(radiosBtn[i]).prop("checked") === true)
        {
            sexo = $(radiosBtn[i]).val();
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
}

function MostrarDivPersona()
{
    if($("#contenedorPersona").css("visibility") === "visible")
    {
        $("#contenedorPersona").css("visibility","hidden");
    }
    else
    {
        $("#contenedorPersona").css("visibility","visible");
    }

}

function Eliminar()
{

    var persona = {
        "id": id,
    }

    BorrarPersona(persona);

}



function GuardarPersona(persona)
{
    var dirhttp = "http://localhost:3000/editar";

    MostrarDivPersona();

    $(".spinner").css("visibility", "visible");

    $.post(dirhttp, persona, function(data, status){

        if(status === "success")
        {
            //Cambio los datos del div
            listaDatos = $(tarjetaPersona).children("div").children();

            $(listaDatos[1]).text(persona.nombre);
            $(listaDatos[2]).text(persona.apellido);
            $(listaDatos[3]).text(persona.sexo);

            $(".spinner").css("visibility", "hidden");

        }     
    });  
}


function BorrarPersona(persona)
{
    var dirhttp = "http://localhost:3000/eliminar";

    MostrarDivPersona();

    $(".spinner").css("visibility", "visible");

    $.post(dirhttp, persona, function(data, status){

        if(status === "success")
        {
            $("#cards").removeChild(tarjetaPersona);

            $(".spinner").css("visibility", "hidden");

        }     
    });  
}
