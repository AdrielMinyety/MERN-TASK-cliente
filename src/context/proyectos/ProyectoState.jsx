import React, { useReducer } from 'react';

// Crear Context y Reducer
// create Context and Reducer
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

// Crear Types
// Create Types
import { CREAR_PROYECTO, EDITAR_PROYECTO, PROYECTO_SELECCIONADO, PROYECTO_ACTUALIZADO, ELIMINAR_PROYECTO, MOSTRAR_MENSAJE, OBTENER_PROYECTOS, MOSTRAR_FORMULARIO_PROYECTO, OCULTAR_FORMULARIO_PROYECTO } from "../../types";

// Cliente Axios
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    // establecer state inicial
    // set initial state
    const initialState = {
        proyectos : [],
        proyectoActual : null,  
        newProyectoForm : false,
        proyectoEditar : false,
        mensaje : null
    }

    // Dispatch para ejecutar las acciones
    // Dispatch to run the actions
    
    // --- Dispatch va a ejecutar los Types, ejecutando las funciones en el Reducer
    // --- Dispath going to run the Types, runing functions in the Reducer

    // ==== Nota/Note ====
    // Es como el useState, haciendo 'destructuring' obtiene un State y una funcion para cambiar el state, usando el hook de useReducer, pasas el Reducer y el State inicial como parametro del useReducer.
    // Is like useState, using 'destructuring' it get an State and function to change the state, using useReducer's hook, pass the Reducer and initial State as useReducer's parameters. 
    // ===================
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // funciones para el CRUD
    // ==== Nota/Note ===
    // El Dispatch conecta con el Reducer donde se ejecutan las funciones.
    // Dispatch connect to Reducer where it runs the functions-
    // ==================
    // show form
    const mostrarFormularioFn = () => {
        // se le pasa el Type
        dispatch({
            type : MOSTRAR_FORMULARIO_PROYECTO
        })
        // ---- Cuando se ejecute esta función, el Type muestra qué state cambiar, atraves del Reducer.
        // ---- When it runs this function, the Type show what state change, through the Reducer.
    }
    // hide form
    const ocultarFormularioFn = () => {
        dispatch({
            type : OCULTAR_FORMULARIO_PROYECTO
        })
    }
    // get project
    const obtenerProyectosFn = async () => {
        try {

            // obtener datos de la BD
            // Get data from DB
            const respuesta = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload : respuesta.data.proyectos
            })
        } catch (error) {
            // console.log(error);
            // crear alerta
            // create alert
            const alerta = {
                msg: error.response.data.errores[0].msg + ".",
                categoria: 'alert-danger'
            }
            // show alert
            mostrarMensajeFn(alerta);            
        }
    }
    // create project
    const crearProyectoFn = async nuevoProyecto => {
        try {
            // insertar datos a la BD
            // insert data to DB
            const respuesta = await clienteAxios.post('/api/proyectos', nuevoProyecto);
            
            dispatch({
                type: CREAR_PROYECTO,
                payload : respuesta.data.proyecto
            });
            // crear alerta
            // create alert
            const alerta = {
                msg: respuesta.data.msg + ".",
                categoria: 'alert-success'
            }
            // show alert
            mostrarMensajeFn(alerta);
        } catch (error) {
            // console.log(error.response.data.errores[0]);
            // crear alerta
            // create alert
            const alerta = {
                msg: error.response.data.errores[0].msg + ".",
                categoria: 'alert-danger'
            }
            // show alert
            mostrarMensajeFn(alerta);
        }
    }
    // edit project
    const proyectoEditarFn = YesOrNot => {
        dispatch({
            type: EDITAR_PROYECTO,
            payload: YesOrNot
        })
    }
    // update project
    const actualizarProyectoFn = async proyecto => {
        try {

            // actualizar en BD
            // update in DB
            const respuesta = await clienteAxios.put(`/api/proyectos/${proyecto._id}`, proyecto);

            dispatch({
                type: PROYECTO_ACTUALIZADO,
                payload: proyecto
            });

            // get the project updated 
            obtenerProyectosFn();

            // crear alerta
            // create alert
            const alerta = {
                msg: respuesta.data.msg + ".",
                categoria: 'alert-info'
            }
            // show alert
            mostrarMensajeFn(alerta);            
        } catch (error) {
            // console.log(error.response);
            // crear alerta
            // create alert
            const alerta = {
                msg: error.response.data.errores[0].msg + ".",
                categoria: 'alert-danger'
            }
            // show alert
            mostrarMensajeFn(alerta);            
        }
    }
    // show message
    const mostrarMensajeFn = alerta => {
        dispatch({
            type: MOSTRAR_MENSAJE,
            payload: alerta
        })
    }
    // get selected project
    const proyectoActualFn = proyecto => {
        dispatch({
            type : PROYECTO_SELECCIONADO,
            payload : proyecto
        })
    }
    const eliminarProyectoFn = async proyectoId => {
        try {

            // eliminar de BD
            // delete in DB
            const respuesta = await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type : ELIMINAR_PROYECTO,
                payload : proyectoId
            });
            // crear alerta
            // create alert
            const alerta = {
                msg: respuesta.data.msg + ".",
                categoria: 'alert-danger'
            }
            // show alert
            mostrarMensajeFn(alerta);            
        } catch (error) {
            console.log(error.response);
            // crear alerta
            // create alert
            const alerta = {
                msg: "Hubo un error al eliminar.",
                categoria: 'alert-danger'
            }
            // show alert
            mostrarMensajeFn(alerta);            
        }
    }


    return (
        // pasar por value, mediante un Objeto, los datos que estaran disponibles dentro del Provider.
        // Pass through value, as Object, the data that going to be able inside the Provider.
        <proyectoContext.Provider
            value={{
                newProyectoForm : state.newProyectoForm,
                proyectoEditar : state.proyectoEditar,
                proyectos : state.proyectos,
                proyectoActual : state.proyectoActual,
                mensaje : state.mensaje,
                mostrarFormularioFn, ocultarFormularioFn,
                obtenerProyectosFn,
                crearProyectoFn,
                proyectoEditarFn,
                actualizarProyectoFn,
                proyectoActualFn,
                eliminarProyectoFn
            }}
        >
            {/* Para que los datos se puedan pasar por los todos los componentes hijos que tenga el Provider.  */}
            {/* For data may be able to pass through all the childrens components inside the Provider. */}
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;