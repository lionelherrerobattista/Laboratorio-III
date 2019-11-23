namespace personas
{
    var listaPersonas:Array<Persona> = new Array<Persona>();

    $("document").ready(CargarPagina);

    export function CargarPagina():void{

        
        let btnAgregar = $("#btnAgregar");

        btnAgregar.click(agregar);
    }


    export function agregar()
    {

        console.log("btnagregaer");

        let nombre:string = String($("#txtNombre").val()); //tengo que castear a string
        let apellido:string = String($("#txtApellido").val());    
        let tipo:string = String($("#cmbTipo").find('option:selected').text());
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

        
        let tBody = $("#tbody");
        let fila = $("<tr></tr>");

        let columnaNombre = $("<td></td>");
        columnaNombre.append(persona.getNombre());

        let columnaApellido = $("<td></td>");
        columnaApellido.append(persona.getApellido());


        let columnaLegajo = $("<td></td>");
        if(tipo === 'Alumno')
        {
            columnaLegajo.append((<Alumno>persona).getLegajo());
        }
        else
        {
            columnaLegajo.append((<Profesor>persona).getCuil());
        }

        fila.append(columnaNombre);
        fila.append(columnaApellido);
        fila.append(columnaLegajo);
        tBody.append(fila);

        console.log(listaPersonas);

    }



    export function eliminar()
    {

    }
    
    export function filtrar()
    {

    }
}