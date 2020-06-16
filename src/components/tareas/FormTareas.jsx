import React, { useState, useContext, useEffect} from 'react';

// Context --
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareasContext';
import AlertaContext from '../../context/alertas/alertaContext';

export default function FormTareas() {

    // Obtener el state global mediante context
    // Get global State through context
    const proyectoStateContext = useContext(proyectoContext);
    const tareasStateContext = useContext(tareasContext);
    const alertaContext = useContext(AlertaContext);

    // Extraer los datos pasados por el Context
    // Get the data passed through the Context
    const { proyectoActual } = proyectoStateContext;
    const { 
        actualizarTareaFn,
        tareaEditar,
        agregarTareaFn,
        mensaje } = tareasStateContext;
    const { mostrarAlertaFn } = alertaContext;

    // Establecer State
    // Set state
    const [tarea, setTarea] = useState({
        nombre : ''
    })

    // detectar si se va a editar la tarea
    // watch if the task it will edit
    useEffect(() => {
        if (tareaEditar !== null) {
            setTarea(tareaEditar);
        } else {
            setTarea({
                nombre : ''
            })
        }
    }, [tareaEditar])

    // detectar notificaciones
    // detect notifications
    useEffect(() => {
        if (mensaje) {
            mostrarAlertaFn(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje]);

    // destructuring al state del form
    // destructuring to the form's state
    const { nombre } = tarea;

    // ver si hay un proyecto selecionado
    // see if there is a proyect selected
    if(proyectoActual === null ) 
    return <h2 className="text-white title mt-5">Seleciona un proyecto, <span className="font-weight-normal">para empezar.</span></h2>;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // validar form
        // validate form
        if( nombre.trim() === ''){
            mostrarAlertaFn("Nombre obligatorio.", "alert-warning");
            return null;
        }

        // detectar si se edita o se agrega nueva tarea
        // detect if is editing or adding a new task
        if (tareaEditar === null) {
            //----Tarea Nueva
            // Agregar al context
            // add to context
            tarea.proyecto = proyectoActual._id;
            agregarTareaFn(tarea);

        } else {
            //----Editando tarea
            actualizarTareaFn(tarea);
        }

        // resetear form
        // reset form
        setTarea({
            nombre : ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        onChange={handleChange}
                        type="text"
                        className="input-text text-muted"
                        placeholder="Nombrar tarea"
                        value={nombre}
                        name="nombre"/>
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaEditar ? "Editar tarea" : "Agregar tarea"}/>
                </div>
            </form>
        </div>
    )
}
