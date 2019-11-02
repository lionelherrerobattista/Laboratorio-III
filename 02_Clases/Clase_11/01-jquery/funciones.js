
//funcion this


person1 = {
    name : "Juan",
    lastName : "Perez"
}

person1 = {
    name : "Carlos",
    lastName : "Lopez"
}

var printName = function(){
    console.log(this.name + " " + this.lastName);
}

//Le aplico a la funcion el objeto
printName.apply(person1); //el this pasa a ser ese objeto


$(document).ready(function(){

    //Animaciones en JQuery:
    $("#btnO").click(function(){

        $("#div1").fadeOut();
        $("#div2").fadeOut("slow");
        $("#div3").fadeOut(3000);

    });

    $("#btnM").click(function(){

        $("#div1").fadeIn();
        $("#div2").fadeIn("slow");
        $("#div3").fadeIn(3000);
        

    });

    $("div").click(function(){
        $(this).hide();//elemento que lanzo el evento
        $(this).show();
    })
})


//Servidor
// $.get("http://localhost:3000/personas?key=value&key=value");

// .$post(url,
//     {
//         nombre: "juan",
//         apellido: "perez"
//     },
//     function(data,status){

//     });

// $.ajax({
//     url:"demo_test.txt",
//     type: "POST",
//     data: {
//         nombre: "juan",
//         apellido: "perez"
//     },
//     contentType: "application/Json",
//     success: function(result){
//         $("#div1").html(result){

//         }
//     }
// })