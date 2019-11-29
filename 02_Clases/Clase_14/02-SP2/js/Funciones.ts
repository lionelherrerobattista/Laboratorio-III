namespace Personas{

    var listaPersonas:Array<Persona>;

    $("document").ready(cargarPagina);

    export function cargarPagina():void{

        let btnAgregar = $("#btnAgregar");
        let btnEliminar = $("btnEliminar");

        listaPersonas = new Array();

        btnAgregar.click(agregar);

    }

    export function agregar()
    {
        let persona:Persona;

        persona = CrearPersona();
        
        listaPersonas.push(persona);//variable global

        console.log(listaPersonas);

        calcularPromedio();
        
    }

    export function CrearPersona():Persona
    {
        let persona:Persona;
        let nombre:string = String($("#txtNombre").val()); //tengo que castear a string
        let apellido:string = String($("#txtApellido").val());   
        let id:number = Number($("#txtId").val()); 
        let edad:number = Number($("#txtEdad").val()); 
        let sexo:string = String($("#selectSexo").find('option:selected').text());//busco la opción seleccionada
        

        if(id < 1000)
        {
            persona = new Alumno(nombre, apellido, edad, sexo, id);            
        }
        else
        {
            persona = new Profesor(nombre, apellido, edad, sexo, id);
        }

        return persona;
    }


    export function calcularPromedio()
    {
        let acumuladorEdad:number;
        let promedio:number;

        acumuladorEdad = listaPersonas.reduce(function(acumuladorEdad, persona) {
            return acumuladorEdad += persona.getEdad();
        }, 0);

        promedio = acumuladorEdad / listaPersonas.length;

        console.log(promedio);
    }

}