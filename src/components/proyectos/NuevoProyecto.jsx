import React, {Fragment, useEffect, useState, useContext} from 'react';

// Context --
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareasContext from '../../context/tareas/tareasContext';
import AlertaContext from '../../context/alertas/alertaContext';

export default function NuevoProyecto() {

    // Obtener el state global mediante context
    // Get global State through context
    const proyectoStateContext = useContext(proyectoContext);
    const tareasContext = useContext(TareasContext);
    const alertaContext = useContext(AlertaContext);

    // Extraer los datos pasados por el Context
    // Get the data passed through the Context
    const {
        newProyectoForm,
        mensaje,
        proyectoActual,
        proyectoEditar,
        proyectoEditarFn,
        actualizarProyectoFn,
        mostrarFormularioFn, 
        ocultarFormularioFn,
        crearProyectoFn
    } = proyectoStateContext;

    const {alerta, mostrarAlertaFn} = alertaContext;

    const { obtenerTareasFn} = tareasContext;

    // establecer state
    // set State
    const [nuevoProyecto, setNuevoProyecto] = useState({
        nombre : ''
    });

    // destructuring al estado
    // destructuring to state
    const { nombre } = nuevoProyecto;

    // detectar cambio de proyecto y tareas
    // detect if the project and tasks changed
    useEffect(() => {
        if(proyectoActual) {
            // obtener datos a editar
            // get data to edit            
            setNuevoProyecto({
                nombre: proyectoActual.nombre
            });

            // get tasks when the project change
            obtenerTareasFn(proyectoActual._id);
        }
        // eslint-disable-next-line
    }, [proyectoActual]);

    useEffect(() => {
        if (mensaje) {
            mostrarAlertaFn(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje]);

    // Detectar cambios en el form y ver si tiene datos
    // detect changes in form and watch if there is data
    const handleChange = e => {
        // agregar datos al state
        // add data to state
        setNuevoProyecto({
            ...nuevoProyecto,
            [e.target.name] : e.target.value
        })

        if( e.target.value === '') {
            // si el campo está vacío, ocultar btn
            // if the parameter is empty, hide btn
            document.querySelector('.btn-dinamico').style.display = "none";
        }else {
            // si el campo está lleno, mostrar btn
            // if the parameter is full, show btn
            document.querySelector('.btn-dinamico').style.display = "block";
        };
    }

    // detectar si el form es enviado
    // detect if the form is submited
    const handleSubmit = e => {
        e.preventDefault();

        // validar form
        // validate form
        if(nombre.trim().length < 5 ) {
            mostrarAlertaFn('El nombre es muy corto!', 'alert-warning'
            );
            return;
        };        
        // si se para editar o crear
        // if is to edit or to create
        if (proyectoEditar) {            
            // actualizar proyecto
            // update project
            proyectoActual.nombre = nuevoProyecto.nombre; 
            actualizarProyectoFn(proyectoActual);

        } else {            
            // crear nuevo proyecto y agregarlo a la lista
            // create new project and add it to the list
            crearProyectoFn(nuevoProyecto);
        }
    }

    // Detectar click en el componente
    // Detect click in the component
    const handleClickForm = e => {
        e.preventDefault();
        // show form
        mostrarFormularioFn();
        // limpiar form
        // clean form
        setNuevoProyecto({
            nombre : ''
        });
        // resetear editar
        // reset edit
        proyectoEditarFn(false);
    }
    const handleClickCancel = e => {
        e.preventDefault();
        // hide form
        ocultarFormularioFn();
    }

    return (
        <Fragment>
            <button
                onClick={handleClickForm}
                type="button"
                className="btn btn-block btn-primario"
            >Nuevo proyecto <i className="fas fa-plus"></i></button>

            { newProyectoForm ? 
            (
                <form
                    onSubmit={handleSubmit}
                    className="formulario-nuevo-proyecto"
                >
                    <div className="row d-flex justify-content-center">
                        <input
                            type="text"
                            className="col-8 newProyecto input-text"
                            placeholder="Nombre del proyecto"
                            name="nombre"
                            onChange={handleChange}
                            value={nombre}
                            autoFocus
                            />
                        <button
                            onClick={handleClickCancel}
                            className="col-2 form-icon rounded-right"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <input 
                        type="submit"
                        className="btn-dinamico btn btn-primario btn-block"
                        value={
                            proyectoEditar? 
                            "Actualizar proyecto"
                            :"Agregar proyecto"}/>                    
                </form>
            ): null}

            {alerta?
            <div className={`alert ${alerta.categoria} alerta-responsive mt-2`}>{alerta.msg}</div>
            : null}
        </Fragment>
    )
}
