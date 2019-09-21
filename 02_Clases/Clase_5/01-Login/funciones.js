
function CargarBotones()
{
    
    var btnEnviar = document.getElementById("btnEnviar");
    var btnLimpiar = document.getElementById("btnLimpiar");

    btnEnviar.addEventListener("click", VerificarUsuario);
    btnLimpiar.addEventListener("click", LimpiarTexto);

    var imgLoading = document.getElementById("imagen-loading")

    imgLoading.style.visibility = "hidden";

}


window.addEventListener("load", CargarBotones);

function VerificarUsuario()
{
    //Recupero Objetos:
    var txtUsuario = document.getElementById("txtUsuario");
    var pwdPass = document.getElementById("pwdPass");
    var dirhttp = "http://localhost:3000/loginUsuario"
    var http = new XMLHttpRequest();
    var imgLoading = document.getElementById("imagen-loading")

    imgLoading.style.visibility = "visible";

    http.onreadystatechange = function()
    {
 
        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

            imgLoading.style.visibility = "hidden";

            if(http.responseText === "true")
            {
                alert("usuario correcto");

            }
            else
            {

                alert("usuario incorrecto");
            }
        }
    }

    //método get, paso los parámetros por la dirección http en open
    // dirhttp += "?usr=" + txtUsuario.value;
    // dirhttp += "&pass=" + pwdPass.value;

    
    http.open("POST", "http://localhost:3000/loginUsuario");
    http.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    http.send("usr=" + txtUsuario.value + "&pass=" + pwdPass.value);

}

function LimpiarTexto()
{
    var txtUsuario = document.getElementById("txtUsuario");
    var pwdPass = document.getElementById("pwdPass");

    txtUsuario.value = "";
    pwdPass.value = "";

}



