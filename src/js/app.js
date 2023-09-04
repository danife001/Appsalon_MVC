let paso = 1;
const pasoInicial=  1;
const pasoFinal =3;

const cita ={
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}


document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
})

function iniciarApp(){
    mostrarSeccion();
    tabs(); // cambia la seccion
    botonesPaginador(); // agrega o quita los botones  
    paginaSiguiente();
    paginaAnterior();

    consultarAPI();

    idCliente();
    nombreCliente();
    seleccionarFecha();
    seleccionarHora();

    mostrarResumen(); // muestra el resumen de la cita
}

function mostrarSeccion(){
    // ocu;tar la seccion
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){

       seccionAnterior.classList.remove('mostrar');
    }

    // seleccionar la seccion con paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    // quita la clase actual 
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior){

        tabAnterior.classList.remove('actual')
    }


    // resalta la seccion actual 
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton=>{
        boton.addEventListener('click',function(e){
            paso= parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();


        })
    })
}

function botonesPaginador(){
    const paginaAnterior  = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1){
        paginaAnterior.classList.add('ocultar')
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso === 3 ){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');

    }
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior')
    paginaAnterior.addEventListener('click',function(){
        
        if(paso<= pasoInicial) return;
        paso --;
        botonesPaginador();
        mostrarSeccion();
    })
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente')
    paginaSiguiente.addEventListener('click',function(){
        
        if(paso>= pasoFinal) return;
        paso ++;
        botonesPaginador();
        mostrarSeccion();
    })
}

async function consultarAPI(){

    try {
        const url='/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();

        mostrarServicios(servicios);
        
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio=>{
        const{id, nombre, precio} = servicio;
    
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;


        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}`;


        const servicioDiv = document.createElement('div');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id ;
        servicioDiv.onclick = function(){ seleccionarServicio(servicio)
            
        }
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        
        document.querySelector('#servicios').appendChild(servicioDiv);
    })
}

function seleccionarServicio(servicio){
    
    const { id } = servicio;   
    const {servicios} = cita;


    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`)

    if(servicios.some(agregado => agregado.id === id )){
        // eliminarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    }else{
        cita.servicios = [...servicios,servicio];
        divServicio.classList.add('seleccionado');
    }
}

function idCliente(){
    cita.id = document.querySelector('#id').value; 
}

function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value;
   
}

function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input',function(e){

        const dia = new Date(e.target.value).getUTCDay();
        if([6,0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos','error','.formularios');
        }else{
            cita.fecha = e.target.value;
        }
    })
}
function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input',function(e){
        

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0]
        if(hora<10|| hora>18){
            e.target.value= '';
            mostrarAlerta('Hora no valida','error','.formularios')
        }else{
            cita.hora = e.target.value 
            
        }
    })
}

function mostrarAlerta(mensaje, tipo, elemento,desaparece=true){
    // EVITAR QUE SE GENERE MAS DE UNA ALERTA 
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const formulario = document.querySelector(elemento);
    formulario.appendChild(alerta);
    if(desaparece){

        setTimeout(()=>{
            alerta.remove();
        },3000);
    }
}

function mostrarResumen(){
     const resumen = document.querySelector('.contenido-resumen');

    //  limpiar contenido resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
     
     if(Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('faltan datos de serivios','error','.contenido-resumen',false)
     
        return;
    }

    // formatear el div resumen

     const {nombre, fecha, hora, servicios}= cita;

    
    // headin para servicios
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);


    servicios.forEach(servicio =>{

        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio= document.createElement('P');
        textoServicio.textContent = nombre;
        
        
        const precioServicio= document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span>$ ${precio}`;

        contenedorServicio.appendChild(textoServicio)
        contenedorServicio.appendChild(precioServicio)

        resumen.appendChild(contenedorServicio);
    })

    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);


    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML= `<span>Nombre:</span> ${nombre}`;
    // formatear la fecha 
    const fechaObj  = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate()+ 2;
    const year = fechaObj.getFullYear();
    
    const fechaUtc = new Date(Date.UTC(year, mes, dia));
    const opciones = {weekday: 'long' , year: 'numeric' ,month: 'long' ,day: 'numeric'}

    const fechaFormateada = fechaUtc.toLocaleDateString('es-CO',opciones);

    const fechaCliente = document.createElement('P');
    fechaCliente.innerHTML= `<span>Fecha:</span> ${fechaFormateada} `;

    const horaCliente = document.createElement('P');
    horaCliente.innerHTML= `<span>hora:</span> ${hora} Horas`;
// boton para crear una cita 

    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent =  'Reservar Cita';
    botonReservar.onclick = reservarCita;



     resumen.appendChild(nombreCliente);
     resumen.appendChild(fechaCliente);
     resumen.appendChild(horaCliente);
    resumen.appendChild(botonReservar);
     
}

async function reservarCita(){

    const {nombre, fecha, hora, servicios, id} = cita
    const idServicios = servicios.map( servicio => servicio.id);

    

    const datos = new FormData();

    datos.append('fecha',fecha);
    datos.append('hora',hora);
    datos.append('usuarioId',id);
    datos.append('servicios',idServicios);
    // console.log([...datos]);
    try {
        const url = `${Location.origin}/api/citas`


    const respuesta = await fetch(url,{
        method: 'POST',
        body: datos  
    });


    const resultado = await respuesta.json();
    console.log(resultado);
    // console.log([...data]);  para ver los datos del form data
    if (resultado.resultado){
        Swal.fire({
            icon: 'success',
            title: 'Cita Creada',
            text: 'Tu cita fue creada',
            footer: ''
          }).then(()=>{
            setTimeout(()=>{
            window.location.reload();
          },3000);
    })
    }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'hubo un error al guardar la cita',
            
          })
    }
    
}