var Personas;
(function (Personas) {
    var listaPersonas;
    $("document").ready(cargarPagina);
    function cargarPagina() {
        var btnAgregar = $("#btnAgregar");
        var btnEliminar = $("btnEliminar");
        listaPersonas = new Array();
        btnAgregar.click(agregar);
    }
    Personas.cargarPagina = cargarPagina;
    function agregar() {
        var persona;
        persona = CrearPersona();
        listaPersonas.push(persona); //variable global
        console.log(listaPersonas);
        calcularPromedio();
    }
    Personas.agregar = agregar;
    function CrearPersona() {
        var persona;
        var nombre = String($("#txtNombre").val()); //tengo que castear a string
        var apellido = String($("#txtApellido").val());
        var id = Number($("#txtId").val());
        var edad = Number($("#txtEdad").val());
        var sexo = String($("#selectSexo").find('option:selected').text()); //busco la opción seleccionada
        if (id < 1000) {
            persona = new Personas.Alumno(nombre, apellido, edad, sexo, id);
        }
        else {
            persona = new Personas.Profesor(nombre, apellido, edad, sexo, id);
        }
        return persona;
    }
    Personas.CrearPersona = CrearPersona;
    function calcularPromedio() {
        var acumuladorEdad;
        var promedio;
        acumuladorEdad = listaPersonas.reduce(function (acumuladorEdad, persona) {
            return acumuladorEdad += persona.getEdad();
        }, 0);
        promedio = acumuladorEdad / listaPersonas.length;
        console.log(promedio);
    }
    Personas.calcularPromedio = calcularPromedio;
})(Personas || (Personas = {}));
