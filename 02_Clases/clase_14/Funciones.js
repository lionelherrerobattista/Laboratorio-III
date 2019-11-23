var personas;
(function (personas) {
    var listaPersonas = new Array();
    $("document").ready(CargarPagina);
    function CargarPagina() {
        var btnAgregar = $("#btnAgregar");
        btnAgregar.click(agregar);
    }
    personas.CargarPagina = CargarPagina;
    function agregar() {
        var nombre = String($("#txtNombre").val()); //tengo que castear a string
        var apellido = String($("#txtApellido").val());
        var tipo = String($("#cmbTipo").find('option:selected').text());
        var persona;
        if (tipo === 'Alumno') {
            var legajo = String($("#txtLegajo").val());
            persona = new personas.Alumno(nombre, apellido, legajo);
            listaPersonas.push(persona);
        }
        else {
            var cuil = String($("#txtLegajo").val());
            persona = new personas.Profesor(nombre, apellido, cuil);
            listaPersonas.push(persona);
        }
        var tBody = $("#tbody");
        var fila = $("<tr></tr>");
        var columnaNombre = $("<td></td>");
        columnaNombre.append(persona.getNombre());
        var columnaApellido = $("<td></td>");
        columnaApellido.append(persona.getApellido());
        var columnaLegajo = $("<td></td>");
        if (tipo === 'Alumno') {
            columnaLegajo.append(persona.getLegajo());
        }
        else {
            columnaLegajo.append(persona.getCuil());
        }
        var columnaEliminar = $("<td></td>");
        var botonEliminar = $("<input></input>");
        botonEliminar.attr("type", "button");
        botonEliminar.attr("value", "Eliminar");
        botonEliminar.click(eliminar);
        columnaEliminar.append(botonEliminar);
        fila.append(columnaNombre);
        fila.append(columnaApellido);
        fila.append(columnaLegajo);
        fila.append(columnaEliminar);
        tBody.append(fila);
        console.log(listaPersonas);
    }
    personas.agregar = agregar;
    function eliminar(event) {
        var fila = $(event.target).parent().parent();
        console.log(fila);
        fila.remove();
    }
    personas.eliminar = eliminar;
    function filtrar() {
    }
    personas.filtrar = filtrar;
})(personas || (personas = {}));
