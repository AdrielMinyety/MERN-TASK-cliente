import React, { useReducer } from "react";

import tareasContext from "./tareasContext";
import tareasReducer from "./tareasReducer";

// cliente axios
import clienteAxios from "../../config/axios";

import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    MOSTRAR_MENSAJE_TAREA,
    ELIMINAR_TAREA,
    EDITAR_TAREA,
    ACTUALIZAR_TAREA
} from "../../types";

const TareasState = props => {
    // establecer state inicial
    // set initial state
    const initialState = {
        tareasProyecto : [],
        mensaje : null,
        tareaEditar : null
    }

    // Dispatch para ejecutar las acciones
    // Dispatch to run the actions
    
    // --- Dispatch va a ejecutar los Types, ejecutando las funciones en el Reducer
    // --- Dispath going to run the Types, runing functions in the Reducer

    // ==== Nota/Note ====
    // Es como el useState, haciendo 'destructuring' obtiene un State y una funcion para cambiar el state, usando el hook de useReducer, pasas el Reducer y el State inicial como parametro del useReducer.
    // Is like useState, using 'destructuring' it get an State and function to change the state, using useReducer's hook, pass the Reducer and initial State as useReducer's parameters. 
    // ===================
    const [state, dispatch] = useReducer(tareasReducer, initialState);

    // funciones para el CRUD
    // ==== Nota/Note ===
    // El Dispatch conecta con el Reducer donde se ejecutan las funciones.
    // Dispatch connect to Reducer where it runs the functions.
    // ==================
    // get tasks
    const obtenerTareasFn = async proyecto => {
        try {
            
            // obtener tareas de la BD
            // get tasks from DB
            const respuestas = await clienteAxios.get('/api/tareas', {params: { proyecto }})

            dispatch({
                type : OBTENER_TAREAS,
                payload : respuestas.data.tareas
            });    
        } catch (error) {
            console.log(error.response);
        }
    }
    // add task
    const agregarTareaFn = async tarea => {
        try {

            // guardar tarea a la BD
            // save tasks in the DB
            const respuesta = await clienteAxios.post('/api/tareas', tarea);
            
            dispatch({
                type : AGREGAR_TAREA,
                payload : respuesta.data.tarea
            });

            // crear alerta
            // create alert
            const alerta = {
                msg: respuesta.data.msg + ".",
                categoria: "alert-success"
            }

            // show message
            mostrarMensajeFn(alerta);

        } catch (error) {
            console.log(error.response);
        }
    }
    // delete task
    const eliminarTareaFn = async (tareaId, proyecto) => {
        try {

            // eliminar tarea de la BD
            // delete tasks in the DB
            const respuesta = await clienteAxios.delete(`/api/tareas/${tareaId}`, {params : {proyecto}});

            dispatch({
                type : ELIMINAR_TAREA,
                payload : tareaId
            });

            // crear alerta
            // create alert
            const alerta = {
                msg: respuesta.data.msg + ".",
                categoria: "alert-danger"
            }

            // show message
            mostrarMensajeFn(alerta);

        } catch (error) {
            console.log(error.response)
        }
    }
    // update task
    const actualizarTareaFn = async tarea => {
        try {

            // actualizar tarea en BD
            // update task in DB
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

            dispatch({
                type : ACTUALIZAR_TAREA,
                payload : respuesta.data.tarea
            });

            // crear alerta
            // create alert
            const alerta = {
                msg: respuesta.data.msg + ".",
                categoria: "alert-info"
            }

            // show message
            mostrarMensajeFn(alerta);

        } catch (error) {
            console.log(error.response);
        }
    }
    // get task
    const obtenerTareaEditarFn = tarea => {
        dispatch({
            type : EDITAR_TAREA,
            payload : tarea
        })
    }
    // show message
    const mostrarMensajeFn = alerta => {
        dispatch({
            type: MOSTRAR_MENSAJE_TAREA,
            payload: alerta
        });
    }

    return (
        <tareasContext.Provider
            value={{
                tareasProyecto : state.tareasProyecto,
                mensaje : state.mensaje,
                tareaEditar : state.tareaEditar,
                obtenerTareasFn,
                agregarTareaFn,
                eliminarTareaFn,
                obtenerTareaEditarFn,
                actualizarTareaFn
            }}
        >
            {props.children}
        </tareasContext.Provider>
    )
}

export default TareasState; 