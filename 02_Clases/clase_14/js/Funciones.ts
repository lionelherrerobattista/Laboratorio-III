namespace personas
{
    var listaPersonas:Array<Persona>;

    $("document").ready(CargarPagina);

    export function CargarPagina():void{

        //Inicializo lista cuando cargo la página
        listaPersonas = new Array<Persona>();
        
        let btnAgregar = $("#btnAgregar");
        let btnLimpiar = $("#btnLimpiar");
        let cmbFiltro = $("#cmbFiltro");

        btnAgregar.click(agregar);
        btnLimpiar.click(limpiar);
        cmbFiltro.change(filtrar);
    }


    export function agregar()
    {

        let nombre:string = String($("#txtNombre").val()); //tengo que castear a string
        let apellido:string = String($("#txtApellido").val());    
        let tipo:string = String($("#cmbTipo").find('option:selected').text());//busco la opción seleccionada
        let persona:Persona;

        if(tipo === 'Alumno')
        {
            let legajo:string = String($("#txtLegajo").val());

            persona = new Alumno(nombre, apellido, legajo);

            listaPersonas.push(persona);
        }
        else
        {
            let cuil:string = String($("#txtLegajo").val());

            persona = new Profesor(nombre, apellido, cuil);

            listaPersonas.push(persona);
        }

        CrearTabla(persona);
        
        filtrar();

    }



    export function eliminar(event)
    {
        let fila = $(event.target).parent().parent();

        //tomo el legajo de la columna legajo
        let legajo = $(fila.children()[2]).text();

        //Elimino la persona de la lista
        listaPersonas.forEach(function (persona, indice) {

            let auxPersona = persona;

            if(persona instanceof Alumno)
            {
                if((<Alumno>persona).getLegajo() == legajo && fila.attr('data-persona-tipo') == 'Alumno')
                {
                    listaPersonas.splice(indice, 1);//borro ese elemento del array

                }

            }
            else
            {
                if((<Profesor>persona).getCuil() == legajo && fila.attr('data-persona-tipo') == 'Profesor')
                {
                    listaPersonas.splice(indice, 1);

                }

                 
            }
            
        })
    
        fila.remove();

    }
    
    export function filtrar()
    {
        let filtro = $("#cmbFiltro").find('option:selected').text();
        let listaFiltrada;

        switch(filtro)
        {
            case 'Alumnos':
                listaFiltrada = listaPersonas.filter(function (persona) {
                    
                    return persona instanceof Alumno;

                });
                break;
            case 'Profesores':
                listaFiltrada = listaPersonas.filter(function (persona) {
                
                    return persona instanceof Profesor;

                });
                break;
            case 'Todos':
                listaFiltrada = listaPersonas;
        }

        $('#tbody').children().remove();

        listaFiltrada.forEach(function(persona) {

            CrearTabla(persona);

        });

    }

    export function limpiar()
    {
        $("#txtNombre").val(''); 
        $("#txtApellido").val('');    
        $("#txtLegajo").val('');
    }


    export function CrearTabla(persona)
    {
        let tBody = $("#tbody");
        let fila = $("<tr></tr>");

        let columnaNombre = $("<td></td>");
        columnaNombre.append(persona.getNombre());

        let columnaApellido = $("<td></td>");
        columnaApellido.append(persona.getApellido());

        let columnaLegajo = $("<td></td>");  
        if(persona instanceof Alumno)
        {
            columnaLegajo.append((<Alumno>persona).getLegajo());
            fila.attr('data-persona-tipo', 'Alumno');//Agrego el tipo como un atributo
        }
        else
        {
            columnaLegajo.append((<Profesor>persona).getCuil());
            fila.attr('data-persona-tipo', 'Profesor');//Agrego el tipo como un atributo
        }

        let columnaEliminar = $("<td></td>");
        let botonEliminar = $("<input></input>");
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

    export function completarTxt(event)
    {
        let fila = $(event.target).parent();
        let columnasTabla = fila.children();
        
        //completo los txt:
        $("#txtNombre").val($(columnasTabla[0]).html()); 
        $("#txtApellido").val($(columnasTabla[1]).html());    
        $("#txtLegajo").val($(columnasTabla[2]).html());

        //cambio el cmb:
        switch(fila.attr('data-persona-tipo'))
        {
            case 'Alumno':
                $('#cmbTipo option[value="Alumno"]').prop('selected', true);  
                break;
            case 'Profesor':
                $('#cmbTipo option[value="Profesor"]').prop('selected', true);
                break;
        }

    }
}