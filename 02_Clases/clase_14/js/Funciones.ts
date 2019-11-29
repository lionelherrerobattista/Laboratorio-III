namespace personas
{
    var listaPersonas:Array<Persona>;

    $("document").ready(CargarPagina);

    export function CargarPagina():void{
   
        let btnAgregar = $("#btnAgregar");
        let btnLimpiar = $("#btnLimpiar");
        let btnModificar = $("#btnModificar");
        let cmbFiltro = $("#cmbFiltro");
        let filtrosColumnas = $("input[name='filtro']");

        //Inicializo lista cuando cargo la página
        listaPersonas = new Array<Persona>();

        //Eventos
        btnAgregar.click(Agregar);
        btnLimpiar.click(Limpiar);
        btnModificar.click(Modificar);
        cmbFiltro.change(FiltrarPorTipo);
        filtrosColumnas.change(FiltrarColumnas);
    }

    //ABM
    export function Agregar()
    {
        let persona:Persona;

        persona = CrearPersona();
        
        listaPersonas.push(persona);//variable global

        CrearTabla(listaPersonas);
        
        $('#cmbFiltro option[value="Todos"]').prop('selected', true);

        FiltrarPorTipo();
    }

    export function Eliminar(event)
    {
        let fila = $(event.target).parent().parent();
        let legajo:string = $(fila.children()[2]).text(); //tomo el legajo de la columna legajo
        
        //Elimino la persona de la lista
        EliminarPersona(listaPersonas, legajo, fila.attr('data-persona-tipo'));
        
        fila.remove();
    }

    export function Modificar()
    {
        let tipo:string = String($("#cmbTipo").find('option:selected').text())
        let legajo:string = String($("#txtLegajo").val());
        let persona:Persona = CrearPersona();

        ModificarPersona(persona, legajo, tipo);

        CrearTabla(listaPersonas);
    }
    //Fin ABM

    //Crea a una persona a partir de los datos del inputTxt
    //Devuelve persona
    export function CrearPersona():Persona
    {
        let nombre:string = String($("#txtNombre").val()); //tengo que castear a string
        let apellido:string = String($("#txtApellido").val());    
        let tipo:string = String($("#cmbTipo").find('option:selected').text());//busco la opción seleccionada
        let persona:Persona;

        if(tipo === 'Alumno')
        {
            let legajo:string = String($("#txtLegajo").val());

            persona = new Alumno(nombre, apellido, legajo);            
        }
        else
        {
            let cuil:string = String($("#txtLegajo").val());

            persona = new Profesor(nombre, apellido, cuil);      
        }

        return persona;
    }

    ///Elimina a una persona por legajo
    //tipo, por si no hay id único (?)
    export function EliminarPersona(lista:Array<Persona>, legajo:string, tipo:string)
    {
        listaPersonas.forEach(function (persona, indice) {

            let auxPersona = persona;

            if(persona instanceof Alumno)
            {
                if((<Alumno>persona).getLegajo() == legajo && tipo == 'Alumno')
                {
                    listaPersonas.splice(indice, 1);//borro ese elemento del array
                }
            }
            else
            {
                if((<Profesor>persona).getCuil() == legajo && tipo == 'Profesor')
                {
                    listaPersonas.splice(indice, 1);
                }             
            } 
        });
    }

    //Modifica a la persona por legajo
    //Recibe la persona ya modificada
    export function ModificarPersona(persona:Persona, legajo:string, tipo:string)
    {
        listaPersonas.forEach(function (auxPersona, indice) {

            if(auxPersona instanceof Alumno)
            {
                if((<Alumno>auxPersona).getLegajo() == legajo && tipo == 'Alumno')
                {                   
                    listaPersonas[indice] = persona;
                }
            }
            else
            {
                if((<Profesor>auxPersona).getCuil() == legajo && tipo == 'Profesor')
                {
                    listaPersonas[indice] = persona;
                }          
            }          
        });
    }

    export function FiltrarPorTipo()
    {
        let filtro = $("#cmbFiltro").find('option:selected').text();
        let listaFiltrada:Array<Persona>;

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

        //Muestro tabla filtrada:
        CrearTabla(listaFiltrada);
    }
   
    export function FiltrarColumnas()
    {
        let filtro = $("input[name='filtro']:checked").val();

        if(filtro != undefined)
        {
            CrearTabla(listaPersonas);
        }
        else //si no está definido ningún valor, no muestro nada
        {
            $("#tabla").children().remove();
        }
    }

    export function Limpiar()
    {
        $("#txtNombre").val(''); 
        $("#txtApellido").val('');    
        $("#txtLegajo").val('');
    }

    export function CrearTabla(lista)
    {

        let tabla = $("#tabla");
        let opcionesMarcadas = $("input[type='checkbox']:checked").get();//para tomar los elementos del dom
        let listaDeColumnas:Array<string> = new Array();

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

    //Crea el thead
    //Recibe un array con los nomrbes de las columnas que va a crear
    export function CrearThead(titulosColumnas:Array<String>)
    {
        let tabla = $("#tabla");
        let thead = $("<thead>></thead>");
        let filahead = $("<tr></tr>");

        //Creo las columnas
        let columnasThead = titulosColumnas.map( function(valor:string) {

            let th = $("<th></th>");
            th.attr("scope", "col");
            th.append(valor);

            return th;

        });

        columnasThead.forEach(function(columna) {

            filahead.append(columna);
        });

        thead.append(filahead);
        tabla.append(thead);
    }

    //Crea un body a partir de una lista de objetos,
    //ubicando los datos en la columna correspondiente
    export function CrearBody(listaObjetos:Array<Persona>, listaColumnas:Array<String>)
    {
        let tabla = $("#tabla");
        let tBody = $("<tbody></tbody>");
        tBody.prop('id', 'tbody');

        listaObjetos.forEach( function(persona) {

            let fila = $("<tr></tr>");

            //Uso map para tomar el valor
            let columnasTbody = listaColumnas.map( function(valor) {

                let columna = $("<td></td>");//Creo la columna

                //Le paso el valor
                switch(valor)
                {
                    case 'Nombre': 
                    columna.append(persona.getNombre());
                    break;

                    case 'Apellido':
                    columna.append(persona.getApellido());
                    break;

                    case 'Legajo':                     
                    if(persona instanceof Alumno)
                    {
                        columna.append((<Alumno>persona).getLegajo());
                        fila.attr('data-persona-tipo', 'Alumno');//Agrego el tipo como un atributo
                    }
                    else
                    {
                        columna.append((<Profesor>persona).getCuil());
                        fila.attr('data-persona-tipo', 'Profesor');//Agrego el tipo como un atributo
                    }
                    break;
                
                    case 'Eliminar':                  
                    let botonEliminar = $("<input></input>");
                    botonEliminar.attr("type", "button");
                    botonEliminar.attr("value", "Eliminar");
                    botonEliminar.attr("class", "btn btn-danger");
                    botonEliminar.click(Eliminar);
                    columna.append(botonEliminar);
                    break;

                }
                
                return columna;
            });

            columnasTbody.forEach(function(columna) {

                fila.append(columna);
            });

            fila.dblclick(CompletarTxt);
            tBody.append(fila);
            tabla.append(tBody);

        });

    }

    //Completa el formulario para modificar
    export function CompletarTxt(event)
    {
        let fila = $(event.target).parent();
        let columnasTabla = fila.children();
        
        //autocompleto los txt del "formulario":
        $("#txtNombre").val($(columnasTabla[0]).html()); 
        $("#txtApellido").val($(columnasTabla[1]).html());    
        $("#txtLegajo").val($(columnasTabla[2]).html());

        //cambio la opción seleccionada:
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