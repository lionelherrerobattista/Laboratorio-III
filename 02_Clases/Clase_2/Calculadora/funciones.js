
window.onload = Cargar;

function Cargar()
{
    var btnSumar = document.getElementById("btnSumar");
    var btnSumarGuardar = document.getElementById("btnSumarGuardar");
    btnSumar.onclick = Sumar;
    btnSumarGuardar.onclick = SumarGuardar;
}


function Sumar()
{
    var resultado;
    var num1 = document.getElementById("numero 1").value;
    var num2 = document.getElementById("numero 2").value;
    
    resultado = parseInt(num1) + parseInt(num2);

    document.getElementById("resultado").value = resultado;

    
}

function SumarGuardar()
{
    var resultado;
    var num1 = document.getElementById("numero 1").value;
    var num2 = document.getElementById("numero 2").value;
    
    resultado = parseInt(num1) + parseInt(num2);

    document.getElementById("resultado").value = resultado;

    document.getElementById("tbody").innerHTML += "<tr><td>" + num1 + "</td><td>" + num2 + "</td><td>" + resultado + "</td></tr>";
}







