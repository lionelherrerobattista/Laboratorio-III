window.addEventListener("load", CargarBotones);

//Carga los listeners
function CargarBotones()
{
    var btnSignIn = document.getElementById("btnSignIn");

    btnSignIn.addEventListener("click", VerficarUsuario);
}

//Envía los datos de login al Servidor
function VerficarUsuario()
{
    //Recupero Objetos:
    var txtEmail = document.getElementById("txtEmail");
    var pwdPass = document.getElementById("pwdPass");
    //objetoJSON
    var datosLogin = {
        "email": txtEmail.value,
        "password": pwdPass.value
    }
    
    GuardarEnServidor("POST", datosLogin, "http://localhost:1337/login");
    
}

//Guarda un dato en el Servidor
//Tipo de petición: GET o POST
function GuardarEnServidor(tipoPeticion, dato, dirhttp)
{
    var http; 

    http = new XMLHttpRequest();

    http.onreadystatechange = function (){
        
        VerificarRespuesta(http, dato);
    }

    switch(tipoPeticion)
    {
        case "POST":
        http.open(tipoPeticion, dirhttp);
        //Cuando uso POST, aviso que paso texto plano:
        // http.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        http.send(JSON.stringify(dato));
        break;

        case "GET":
        // dirhttp = "?nombre= "xx" &//Agrego los parámetros
        http.open(tipoPeticion, dirhttp);
        http.send();
        break;

        default:
        console.log("No es una petición válida");
    }

    
}

//Verifica la respuesta del servidor
function VerificarRespuesta(http, dato)
{

    console.log("Llegó respuesta", http.readyState, http.status);

    if(http.readyState === 4 && http.status === 200)
    {
        console.log("Tenemos respuesta", http.responseText);

        var respuesta = JSON.parse(http.responseText);


        if(respuesta["autenticado"] === "si")
        {
            var url = "index.html";

            //Paso los parámetros por la url
            url += "?" + "color=" + respuesta["preferencias"]["color"] +
                    "&" + "font=" + respuesta["preferencias"]["font"] + "&" + "email=" + dato.email;

            alert("usuario correcto");

            window.location.replace(url);

        }
        else
        {

            alert("usuario incorrecto");
        }
    }
}