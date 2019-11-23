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
        console.log("btnagregaer");
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
        var botonEliminar = $("<input></input>");
        botonEliminar.attr("type", "button");
        botonEliminar.attr("value", "Eliminar");
        botonEliminar.click(eliminar);
        fila.append(columnaNombre);
        fila.append(columnaApellido);
        fila.append(columnaLegajo);
        fila.append(botonEliminar);
        tBody.append(fila);
        console.log(listaPersonas);
    }
    personas.agregar = agregar;
    function eliminar(event) {
        // let fila = event.target.parent.parent;
        // let tbody = document.getElementById("tbody");
        // tbody.removeChild(fila);
        console.log(event.target);
    }
    personas.eliminar = eliminar;
    function filtrar() {
    }
    personas.filtrar = filtrar;
})(personas || (personas = {}));
