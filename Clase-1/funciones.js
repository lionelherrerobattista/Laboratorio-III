    var nombre;

    nombre=1234;
    
    /*
    if(nombre === "1234")
    {
        alert("el nombre es 1234");
    }
    else
    {
        alert("No es 1234");
    }*/

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



