var personas;
(function (personas) {
    var listaPersonas;
    $("document").ready(CargarPagina);
    function CargarPagina() {
        var btnAgregar = $("#btnAgregar");
        var btnLimpiar = $("#btnLimpiar");
        var btnModificar = $("#btnModificar");
        var cmbFiltro = $("#cmbFiltro");
        var filtrosColumnas = $("input[name='filtro']");
        //Inicializo lista cuando cargo la página
        listaPersonas = new Array();
        //Eventos
        btnAgregar.click(Agregar);
        btnLimpiar.click(Limpiar);
        btnModificar.click(Modificar);
        cmbFiltro.change(FiltrarPorTipo);
        filtrosColumnas.change(FiltrarColumnas);
    }
    personas.CargarPagina = CargarPagina;
    //ABM
    function Agregar() {
        var persona;
        persona = CrearPersona();
        listaPersonas.push(persona); //variable global
        CrearTabla(listaPersonas);
        $('#cmbFiltro option[value="Todos"]').prop('selected', true);
        FiltrarPorTipo();
    }
    personas.Agregar = Agregar;
    function Eliminar(event) {
        var fila = $(event.target).parent().parent();
        var legajo = $(fila.children()[2]).text(); //tomo el legajo de la columna legajo
        //Elimino la persona de la lista
        EliminarPersona(listaPersonas, legajo, fila.attr('data-persona-tipo'));
        fila.remove();
    }
    personas.Eliminar = Eliminar;
    function Modificar() {
        var tipo = String($("#cmbTipo").find('option:selected').text());
        var legajo = String($("#txtLegajo").val());
        var persona = CrearPersona();
        ModificarPersona(persona, legajo, tipo);
        CrearTabla(listaPersonas);
    }
    personas.Modificar = Modificar;
    //Fin ABM
    //Crea a una persona a partir de los datos del inputTxt
    //Devuelve persona
    function CrearPersona() {
        var nombre = String($("#txtNombre").val()); //tengo que castear a string
        var apellido = String($("#txtApellido").val());
        var tipo = String($("#cmbTipo").find('option:selected').text()); //busco la opción seleccionada
        var persona;
        if (tipo === 'Alumno') {
            var legajo = String($("#txtLegajo").val());
            persona = new personas.Alumno(nombre, apellido, legajo);
        }
        else {
            var cuil = String($("#txtLegajo").val());
            persona = new personas.Profesor(nombre, apellido, cuil);
        }
        return persona;
    }
    personas.CrearPersona = CrearPersona;
    ///Elimina a una persona por legajo
    //tipo, por si no hay id único (?)
    function EliminarPersona(lista, legajo, tipo) {
        listaPersonas.forEach(function (persona, indice) {
            var auxPersona = persona;
            if (persona instanceof personas.Alumno) {
                if (persona.getLegajo() == legajo && tipo == 'Alumno') {
                    listaPersonas.splice(indice, 1); //borro ese elemento del array
                }
            }
            else {
                if (persona.getCuil() == legajo && tipo == 'Profesor') {
                    listaPersonas.splice(indice, 1);
                }
            }
        });
    }
    personas.EliminarPersona = EliminarPersona;
    //Modifica a la persona por legajo
    //Recibe la persona ya modificada
    function ModificarPersona(persona, legajo, tipo) {
        listaPersonas.forEach(function (auxPersona, indice) {
            if (auxPersona instanceof personas.Alumno) {
                if (auxPersona.getLegajo() == legajo && tipo == 'Alumno') {
                    listaPersonas[indice] = persona;
                }
            }
            else {
                if (auxPersona.getCuil() == legajo && tipo == 'Profesor') {
                    listaPersonas[indice] = persona;
                }
            }
        });
    }
    personas.ModificarPersona = ModificarPersona;
    function FiltrarPorTipo() {
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
        //Muestro tabla filtrada:
        CrearTabla(listaFiltrada);
    }
    personas.FiltrarPorTipo = FiltrarPorTipo;
    function FiltrarColumnas() {
        var filtro = $("input[name='filtro']:checked").val();
        if (filtro != undefined) {
            CrearTabla(listaPersonas);
        }
        else //si no está definido ningún valor, no muestro nada
         {
            $("#tabla").children().remove();
        }
    }
    personas.FiltrarColumnas = FiltrarColumnas;
    function Limpiar() {
        $("#txtNombre").val('');
        $("#txtApellido").val('');
        $("#txtLegajo").val('');
    }
    personas.Limpiar = Limpiar;
    function CrearTabla(lista) {
        var tabla = $("#tabla");
        var opcionesMarcadas = $("input[type='checkbox']:checked").get(); //para tomar los elementos del dom
        var listaDeColumnas = new Array();
        //Limpio la tabla anterior:
        tabla.children().remove();
        //Agrego los filtros seleccionados:
        opcionesMarcadas.forEach(function (f) {
            listaDeColumnas.push(String($(f).val()));
        });
        //Agrego la columna eliminar a la lista
        listaDeColumnas.push("Eliminar");
        CrearThead(listaDeColumnas);
        CrearBody(lista, listaDeColumnas);
    }
    personas.CrearTabla = CrearTabla;
    //Crea el thead
    //Recibe un array con los nomrbes de las columnas que va a crear
    function CrearThead(titulosColumnas) {
        var tabla = $("#tabla");
        var thead = $("<thead>></thead>");
        var filahead = $("<tr></tr>");
        //Creo las columnas
        var columnasThead = titulosColumnas.map(function (valor) {
            var th = $("<th></th>");
            th.attr("scope", "col");
            th.append(valor);
            return th;
        });
        columnasThead.forEach(function (columna) {
            filahead.append(columna);
        });
        thead.append(filahead);
        tabla.append(thead);
    }
    personas.CrearThead = CrearThead;
    //Crea un body a partir de una lista de objetos,
    //ubicando los datos en la columna correspondiente
    function CrearBody(listaObjetos, listaColumnas) {
        var tabla = $("#tabla");
        var tBody = $("<tbody></tbody>");
        tBody.prop('id', 'tbody');
        listaObjetos.forEach(function (persona) {
            var fila = $("<tr></tr>");
            //Uso map para tomar el valor
            var columnasTbody = listaColumnas.map(function (valor) {
                var columna = $("<td></td>"); //Creo la columna
                //Le paso el valor
                switch (valor) {
                    case 'Nombre':
                        columna.append(persona.getNombre());
                        break;
                    case 'Apellido':
                        columna.append(persona.getApellido());
                        break;
                    case 'Legajo':
                        if (persona instanceof personas.Alumno) {
                            columna.append(persona.getLegajo());
                            fila.attr('data-persona-tipo', 'Alumno'); //Agrego el tipo como un atributo
                        }
                        else {
                            columna.append(persona.getCuil());
                            fila.attr('data-persona-tipo', 'Profesor'); //Agrego el tipo como un atributo
                        }
                        break;
                    case 'Eliminar':
                        var botonEliminar = $("<input></input>");
                        botonEliminar.attr("type", "button");
                        botonEliminar.attr("value", "Eliminar");
                        botonEliminar.attr("class", "btn btn-danger");
                        botonEliminar.click(Eliminar);
                        columna.append(botonEliminar);
                        break;
                }
                return columna;
            });
            columnasTbody.forEach(function (columna) {
                fila.append(columna);
            });
            fila.dblclick(CompletarTxt);
            tBody.append(fila);
            tabla.append(tBody);
        });
    }
    personas.CrearBody = CrearBody;
    //Completa el formulario para modificar
    function CompletarTxt(event) {
        var fila = $(event.target).parent();
        var columnasTabla = fila.children();
        //autocompleto los txt del "formulario":
        $("#txtNombre").val($(columnasTabla[0]).html());
        $("#txtApellido").val($(columnasTabla[1]).html());
        $("#txtLegajo").val($(columnasTabla[2]).html());
        //cambio la opción seleccionada:
        switch (fila.attr('data-persona-tipo')) {
            case 'Alumno':
                $('#cmbTipo option[value="Alumno"]').prop('selected', true);
                break;
            case 'Profesor':
                $('#cmbTipo option[value="Profesor"]').prop('selected', true);
                break;
        }
    }
    personas.CompletarTxt = CompletarTxt;
})(personas || (personas = {}));
