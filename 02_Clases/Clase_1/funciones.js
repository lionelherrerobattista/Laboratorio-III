    
    var nombre;
    
    function Cargar()
    {
        var boton = document.getElementById("btn");
        boton.onclick = Mostrar; //tambien es válido, cuando genero función se genera una variable con el
                                //mismo nombre
        boton.addEventListener("click", Mostrar);
    }

    //window.onload = a; //paso la variable como puntero a la función sin () sino ejecuta y es null
    window.addEventListener("load", Cargar); //puedo ejecutar más de una funcion

    
    function Sumar(num1, num2)
    {
        console.log(num1);
        return num1+num2;
    }

    function Mostrar()
    {
        //recupero los objetos
        var inputUser = document.getElementById("user");
        var inputPass = document.getElementById("password");
        
        //compruebo el valor de los objetos
        if(inputUser.value == "usuario" && inputPass.value  == "1234")
        {
            alert("usuario y contraseña correctos");
        }
        else
        {
            alert("usuario y contraseña incorrectos");
        }
        
    }



