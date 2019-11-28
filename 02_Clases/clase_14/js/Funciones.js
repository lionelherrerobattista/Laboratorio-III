var personas;
(function (personas) {
    var listaPersonas;
    $("document").ready(CargarPagina);
    function CargarPagina() {
        //Inicializo lista cuando cargo la página
        listaPersonas = new Array();
        var btnAgregar = $("#btnAgregar");
        var btnLimpiar = $("#btnLimpiar");
        var cmbFiltro = $("#cmbFiltro");
        btnAgregar.click(agregar);
        btnLimpiar.click(limpiar);
        cmbFiltro.change(filtrar);
    }
    personas.CargarPagina = CargarPagina;
    function agregar() {
        var nombre = String($("#txtNombre").val()); //tengo que castear a string
        var apellido = String($("#txtApellido").val());
        var tipo = String($("#cmbTipo").find('option:selected').text()); //busco la opción seleccionada
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
        CrearTabla(persona);
        filtrar();
    }
    personas.agregar = agregar;
    function eliminar(event) {
        var fila = $(event.target).parent().parent();
        //tomo el legajo de la columna legajo
        var legajo = $(fila.children()[2]).text();
        //Elimino la persona de la lista
        listaPersonas.forEach(function (persona, indice) {
            var auxPersona = persona;
            if (persona instanceof personas.Alumno) {
                if (persona.getLegajo() == legajo && fila.attr('data-persona-tipo') == 'Alumno') {
                    listaPersonas.splice(indice, 1); //borro ese elemento del array
                }
            }
            else {
                if (persona.getCuil() == legajo && fila.attr('data-persona-tipo') == 'Profesor') {
                    listaPersonas.splice(indice, 1);
                }
            }
        });
        fila.remove();
    }
    personas.eliminar = eliminar;
    function filtrar() {
        var filtro = $("#cmbFiltro").find('option:selected').text();
        var listaFiltrada;
        switch (filtro) {
            case 'Alumnos':
                listaFiltrada = listaPersonas.filter(function (persona) {
                    return persona instanceof personas.Alumno;
                });
                break;
            case 'Profesores':
                listaFiltrada = listaPersonas.filter(function (persona) {
                    return persona instanceof personas.Profesor;
                });
                break;
            case 'Todos':
                listaFiltrada = listaPersonas;
        }
        $('#tbody').children().remove();
        listaFiltrada.forEach(function (persona) {
            CrearTabla(persona);
        });
    }
    personas.filtrar = filtrar;
    function limpiar() {
        $("#txtNombre").val('');
        $("#txtApellido").val('');
        $("#txtLegajo").val('');
    }
    personas.limpiar = limpiar;
    function CrearTabla(persona) {
        var tBody = $("#tbody");
        var fila = $("<tr></tr>");
        var columnaNombre = $("<td></td>");
        columnaNombre.append(persona.getNombre());
        var columnaApellido = $("<td></td>");
        columnaApellido.append(persona.getApellido());
        var columnaLegajo = $("<td></td>");
        if (persona instanceof personas.Alumno) {
            columnaLegajo.append(persona.getLegajo());
            fila.attr('data-persona-tipo', 'Alumno'); //Agrego el tipo como un atributo
        }
        else {
            columnaLegajo.append(persona.getCuil());
            fila.attr('data-persona-tipo', 'Profesor'); //Agrego el tipo como un atributo
        }
        var columnaEliminar = $("<td></td>");
        var botonEliminar = $("<input></input>");
        botonEliminar.attr("type", "button");
        botonEliminar.attr("value", "Eliminar");
        botonEliminar.attr("class", "btn btn-danger");
        botonEliminar.click(eliminar);
        columnaEliminar.append(botonEliminar);
        fila.append(columnaNombre);
        fila.append(columnaApellido);
        fila.append(columnaLegajo);
        fila.append(columnaEliminar);
        fila.dblclick(completarTxt);
        tBody.append(fila);
    }
    personas.CrearTabla = CrearTabla;
    function completarTxt(event) {
        var fila = $(event.target).parent();
        var columnasTabla = fila.children();
        //completo los txt:
        $("#txtNombre").val($(columnasTabla[0]).html());
        $("#txtApellido").val($(columnasTabla[1]).html());
        $("#txtLegajo").val($(columnasTabla[2]).html());
        //cambio el cmb:
        switch (fila.attr('data-persona-tipo')) {
            case 'Alumno':
                $('#cmbTipo option[value="Alumno"]').prop('selected', true);
                break;
            case 'Profesor':
                $('#cmbTipo option[value="Profesor"]').prop('selected', true);
                break;
        }
    }
    personas.completarTxt = completarTxt;
})(personas || (personas = {}));
