
// window.addEventListener("load", CargarBotones);
$("document").ready(CargarBotones); 

function CargarBotones()
{
    var parrafo;
    // var parrafo = document.getElementById("parrafo");
    var texto;
    var boton;
    var input;


    parrafo = $("#parrafo"); //id
    boton = $(".btn2"); //clase

    texto = parrafo.html(); //recupero el innerhtml
    console.log(texto);
    parrafo.html("algo"); //cambio lo de adentro
    console.log(texto);

    $("#btn").click(Saludar) //seteo eventos

    input = $("#txt").val(); //recupero el valor
    console.log(input);
    $("#txt").val("nuevo valor"); 

    console.log($("#txt").attr("id")); //me devulve el valor del atributo
    $("#txt").attr("class", "texto");//cambio el valor


    //AJAX
    $("button").click(function(){
        $.get("http://localhost:3000/personas",
         function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      });

}

function Saludar()
{
    alert("Hola");
}