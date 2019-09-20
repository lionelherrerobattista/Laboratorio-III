
function CargarBotones()
{
    
    var btnEnviar = document.getElementById("btnEnviar");
    var btnLimpiar = document.getElementById("btnLimpiar");

    btnEnviar.addEventListener("click", VerificarUsuario);
    btnLimpiar.addEventListener("click", LimpiarTexto);
   
}


window.addEventListener("load", CargarBotones);

function VerificarUsuario()
{
    //Recupero Objetos:
    var txtUsuario = document.getElementById("txtUsuario");
    var pwdPass = document.getElementById("pwdPass");
    var dirhttp = "http://localhost:3000/loginUsuario?"
    var http = new XMLHttpRequest();

    http.onreadystatechange = function()
    {
        console.log("Llegó respuesta", http.readyState, http.status);

        if(http.readyState === 4 && http.status === 200)
        {
            console.log("Tenemos respuesta", http.responseText);

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

    //método get, paso los parámetros por la dirección http
    dirhttp += "usr=" + txtUsuario.value;
    dirhttp += "&pass=" + pwdPass.value;

    http.open("GET", dirhttp);
    http.send();

}

function LimpiarTexto()
{
    var txtUsuario = document.getElementById("txtUsuario");
    var pwdPass = document.getElementById("pwdPass");

    txtUsuario.value = "";
    pwdPass.value = "";

}



