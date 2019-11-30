namespace vehiculos{

    var listaVehiculos:Array<Vehiculo>;

    $("document").ready(cargarPagina);

    export function cargarPagina():void{

        let btnAgregar = $("#btnAgregar");
        let btnPromedio = $("#btnPromedio");
        let txtMarca = $("#txtMarca");
        let cmbFiltro = $("#cmbFiltro")
        listaVehiculos = new Array();
  
        btnAgregar.click(agregar);
        btnPromedio.click(calcular);
        txtMarca.on("input", filtrado);
        cmbFiltro.change(filtrarLista);


    }

    export function agregar()
    {
        let vehiculo:Vehiculo;

        vehiculo = crearVehiculo();
        
        listaVehiculos.push(vehiculo);//variable global

        CrearTabla(listaVehiculos);

        console.log(listaVehiculos);

        crearSelect();

        
    }

    export function crearVehiculo():Vehiculo
    {
        let vehiculo:Vehiculo;
        let marca:string = String($("#txtMarca").val()); 
        let modelo:string = String($("#txtModelo").val());
        let precio:number = Number($("#txtPrecio").val());
        let id:number = calcularId();

        if($("#cuatroXcuatro").is(':checked'))
        {
            vehiculo = new Camioneta(id, marca, modelo, precio, true);
        }
        else
        {
            let cantidadPuertas:number = Number($("#txtPuertas").val());

            vehiculo = new Auto(id, marca, modelo, precio, cantidadPuertas);
        }


        return vehiculo;
    }

    export function calcularId():number
    {
        let acumulador:number;

        acumulador = listaVehiculos.reduce(function(acumulador, persona) {
            return acumulador + 1;
        }, 0);

        return acumulador + 1;
    }

    export function CrearTabla(lista)
    {

        let tabla = $("#tabla");
        // let opcionesMarcadas = $("input[type='checkbox']:checked").get();//para tomar los elementos del dom
        let listaDeColumnas:Array<string> = new Array();

        //Limpio la tabla anterior:
        tabla.children().remove();

        //Agrego la columna eliminar a la lista
        listaDeColumnas.push("Id");
        listaDeColumnas.push("Marca");
        listaDeColumnas.push("Modelo");
        listaDeColumnas.push("Precio");
        listaDeColumnas.push("Puertas");

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
    export function CrearBody(listaObjetos:Array<Vehiculo>, listaColumnas:Array<String>)
    {
        let tabla = $("#tabla");
        let tBody = $("<tbody></tbody>");
        tBody.prop('id', 'tbody');

        listaObjetos.forEach( function(vehiculo) {

            let fila = $("<tr></tr>");

            //Uso map para tomar el valor
            let columnasTbody = listaColumnas.map( function(valor) {

                let columna = $("<td></td>");//Creo la columna
        
                //Le paso el valor
                switch(valor)
                {
                    case 'Id': 
                    columna.append(String(vehiculo.getId()));
                    break;

                    case 'Marca':
                    columna.append(vehiculo.getMarca());
                    break;

                    case 'Modelo':                     
                    columna.append(vehiculo.getModelo());
                    break;
                
                    case 'Precio':                  
                    columna.append(String(vehiculo.getPrecio()));
                    break;

                    case 'Puertas':                  
                    if(vehiculo instanceof Auto)
                    {
                    columna.append(String((<Auto>vehiculo).getCantidadPuertas()));
                    }
                    else
                    {
                        columna.append("-"); 
                    }
                    break;

                }
                
                return columna;
            });

            columnasTbody.forEach(function(columna) {

                fila.append(columna);
            });

            tBody.append(fila);
            tabla.append(tBody);

        });

    }

    export function calcular()
    {
        let acumuladorPrecio:number;
        let promedio:number;

        acumuladorPrecio = listaVehiculos.reduce(function(acumuladorPrecio, vehiculo) {
            return acumuladorPrecio += vehiculo.getPrecio();
        }, 0);

        promedio = acumuladorPrecio / listaVehiculos.length;

        console.log(promedio);

        alert("El promedio de los precios es: " + promedio );
       
    }

   
    export function filtrado()
    {
        let txtMarca:string = String($("#txtMarca").val());

        console.log(txtMarca);

        let listaFiltrada = listaVehiculos.filter(function (vehiculo) {
                        
                if(vehiculo.getMarca() == txtMarca)
                {
                    return vehiculo;
                }                  
        });

        CrearTabla(listaFiltrada);              
    }

    export function crearSelect(){
        
        let select = $("#cmbSelect");
        
        let listaMarcas:Array<string> = new Array();

        listaVehiculos.forEach(function (vehiculo) {
  
            listaMarcas.push(vehiculo.getMarca());
         
        });

    
        listaMarcas = listaMarcas.filter(function (marca) {
                
            return marca
                       
        });

        console.log(listaMarcas);

        listaMarcas.forEach(function (marca) {
  
            let option = $("<option></option>");
            
            console.log(marca);

            option.append(marca);
    
            option.prop('value', marca);
    
            select.append(option);  
         
        });        
                  
    }



    export function filtrarLista()
    {
        let filtro = $("#cmbFiltro").find('option:selected').text();

        let listaFiltrada:Array<Vehiculo>;

        if(filtro == 'Todos')
        {

            listaFiltrada = listaVehiculos;
        }
        else
        {
            listaFiltrada = listaVehiculos.filter(function (vehiculo) {
                
                if(vehiculo.getMarca() == filtro)
                {
                    return vehiculo;
                }                  
            });
        }

        $('#tbody').children().remove();

        //Muestro tabla filtrada:
        CrearTabla(listaFiltrada);
    }

    



    // export function mostrarPopup(){
    //     let popup = document.getElementById("popup");
        
    //     $("#popup").prop('data-show', true);
    // }



}