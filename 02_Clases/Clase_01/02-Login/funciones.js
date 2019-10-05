
function CargarBotones()
{
    // Cargo el boton para que no sea null
    var btnEnviar = document.getElementById("btnEnviar");
    var btnLimpiar = document.getElementById("btnLimpiar");

    btnEnviar.addEventListener("click", VerificarUsuario);  // ejecuta funcion mostrar
    btnLimpiar.addEventListener("click", LimpiarTexto);
    

    //otra forma:
    // btnEnviar.onclick = VerificarUsuario;
}


window.addEventListener("load", CargarBotones); //Cargo el boton, evito null

// otra forma:
// window.onload = Cargar;

function VerificarUsuario()
{
    //Recupero Objetos:
   var txtUsuario = document.getElementById("txtUsuario");
   var pwdPass = document.getElementById("pwdPass");

   //Compruebo valor:
   if(txtUsuario.value == "juan" && pwdPass.value == "1234")
   {
       alert("Login exitoso.");
   }
   else
   {
       alert("Usuario y contraseña incorrectos.");
   }
}

function LimpiarTexto()
{
    var txtUsuario = document.getElementById("txtUsuario");
    var pwdPass = document.getElementById("pwdPass");

    txtUsuario.value = "";
    pwdPass.value = "";

}



