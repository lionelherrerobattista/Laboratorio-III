window.addEventListener("load", CargarBotones);

function CargarBotones()
{
    var btnSignIn = document.getElementById("btnSignIn");

    btnSignIn.addEventListener("click", VerficarUsuario);
}

function VerficarUsuario()
{
    //Recupero Objetos:
    var txtEmail = document.getElementById("txtEmail");
    var pwdPass = document.getElementById("pwdPass");
    var datosLogin = {
        "email": txtEmail.value,
        "password": pwdPass.value
    }

    var http = new XMLHttpRequest();
    var dirhttp = "http://localhost:1337/login";


    http.onreadystatechange = function()
    {
 
        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

            var respuesta = JSON.parse(http.responseText);


            if(respuesta["autenticado"] === "si")
            {
                var url = "index.html";

                url += "?" + "color=" + respuesta["preferencias"]["color"] +
                     "&" + "font=" + respuesta["preferencias"]["font"] + "&" + "email=" + datosLogin.email;

                alert("usuario correcto");

                window.location.replace(url);

            }
            else
            {

                alert("usuario incorrecto");
            }
        }
    }

    http.open("POST", dirhttp);

    //Cuando uso POST, aviso que paso texto plano:
    // http.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");

    http.send(JSON.stringify(datosLogin));
}