var vehiculos;
(function (vehiculos) {
    var listaVehiculos;
    $("document").ready(cargarPagina);
    function cargarPagina() {
        var btnAgregar = $("#btnAgregar");
        var btnPromedio = $("#btnPromedio");
        var txtMarca = $("#txtMarca");
        var cmbFiltro = $("#cmbFiltro");
        listaVehiculos = new Array();
        btnAgregar.click(agregar);
        btnPromedio.click(calcular);
        txtMarca.on("input", filtrado);
        cmbFiltro.change(filtrarLista);
    }
    vehiculos.cargarPagina = cargarPagina;
    function agregar() {
        var vehiculo;
        vehiculo = crearVehiculo();
        listaVehiculos.push(vehiculo); //variable global
        CrearTabla(listaVehiculos);
        console.log(listaVehiculos);
        crearSelect();
    }
    vehiculos.agregar = agregar;
    function crearVehiculo() {
        var vehiculo;
        var marca = String($("#txtMarca").val());
        var modelo = String($("#txtModelo").val());
        var precio = Number($("#txtPrecio").val());
        var id = calcularId();
        if ($("#cuatroXcuatro").is(':checked')) {
            vehiculo = new vehiculos.Camioneta(id, marca, modelo, precio, true);
        }
        else {
            var cantidadPuertas = Number($("#txtPuertas").val());
            vehiculo = new vehiculos.Auto(id, marca, modelo, precio, cantidadPuertas);
        }
        return vehiculo;
    }
    vehiculos.crearVehiculo = crearVehiculo;
    function calcularId() {
        var acumulador;
        acumulador = listaVehiculos.reduce(function (acumulador, persona) {
            return acumulador + 1;
        }, 0);
        return acumulador + 1;
    }
    vehiculos.calcularId = calcularId;
    function CrearTabla(lista) {
        var tabla = $("#tabla");
        // let opcionesMarcadas = $("input[type='checkbox']:checked").get();//para tomar los elementos del dom
        var listaDeColumnas = new Array();
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
    vehiculos.CrearTabla = CrearTabla;
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
    vehiculos.CrearThead = CrearThead;
    //Crea un body a partir de una lista de objetos,
    //ubicando los datos en la columna correspondiente
    function CrearBody(listaObjetos, listaColumnas) {
        var tabla = $("#tabla");
        var tBody = $("<tbody></tbody>");
        tBody.prop('id', 'tbody');
        listaObjetos.forEach(function (vehiculo) {
            var fila = $("<tr></tr>");
            //Uso map para tomar el valor
            var columnasTbody = listaColumnas.map(function (valor) {
                var columna = $("<td></td>"); //Creo la columna
                //Le paso el valor
                switch (valor) {
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
                        if (vehiculo instanceof vehiculos.Auto) {
                            columna.append(String(vehiculo.getCantidadPuertas()));
                        }
                        else {
                            columna.append("-");
                        }
                        break;
                }
                return columna;
            });
            columnasTbody.forEach(function (columna) {
                fila.append(columna);
            });
            tBody.append(fila);
            tabla.append(tBody);
        });
    }
    vehiculos.CrearBody = CrearBody;
    function calcular() {
        var acumuladorPrecio;
        var promedio;
        acumuladorPrecio = listaVehiculos.reduce(function (acumuladorPrecio, vehiculo) {
            return acumuladorPrecio += vehiculo.getPrecio();
        }, 0);
        promedio = acumuladorPrecio / listaVehiculos.length;
        console.log(promedio);
        alert("El promedio de los precios es: " + promedio);
    }
    vehiculos.calcular = calcular;
    function filtrado() {
        var txtMarca = String($("#txtMarca").val());
        console.log(txtMarca);
        var listaFiltrada = listaVehiculos.filter(function (vehiculo) {
            if (vehiculo.getMarca() == txtMarca) {
                return vehiculo;
            }
        });
        CrearTabla(listaFiltrada);
    }
    vehiculos.filtrado = filtrado;
    function crearSelect() {
        var select = $("#cmbSelect");
        var listaMarcas = new Array();
        listaVehiculos.forEach(function (vehiculo) {
            listaMarcas.push(vehiculo.getMarca());
        });
        listaMarcas = listaMarcas.filter(function (marca) {
            return marca;
        });
        console.log(listaMarcas);
        listaMarcas.forEach(function (marca) {
            var option = $("<option></option>");
            console.log(marca);
            option.append(marca);
            option.prop('value', marca);
            select.append(option);
        });
    }
    vehiculos.crearSelect = crearSelect;
    function filtrarLista() {
        var filtro = $("#cmbFiltro").find('option:selected').text();
        var listaFiltrada;
        if (filtro == 'Todos') {
            listaFiltrada = listaVehiculos;
        }
        else {
            listaFiltrada = listaVehiculos.filter(function (vehiculo) {
                if (vehiculo.getMarca() == filtro) {
                    return vehiculo;
                }
            });
        }
        $('#tbody').children().remove();
        //Muestro tabla filtrada:
        CrearTabla(listaFiltrada);
    }
    vehiculos.filtrarLista = filtrarLista;
    // export function mostrarPopup(){
    //     let popup = document.getElementById("popup");
    //     $("#popup").prop('data-show', true);
    // }
})(vehiculos || (vehiculos = {}));
