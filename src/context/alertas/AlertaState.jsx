import React, { useReducer } from 'react';

// Crear Context y Reducer
// create Context and Reducer
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

// Crear Types
// Create Types
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = props => {

    // state inicial
    const initialState = {
        alerta : null
    }

    // --- Dispatch va a ejecutar los Types, ejecutando las funciones en el Reducer
    // --- Dispath going to run the Types, runing functions in the Reducer

    // ==== Nota/Note ====
    // Es como el useState, haciendo 'destructuring' obtiene un State y una funcion para cambiar el state, usando el hook de useReducer, pasas el Reducer y el State inicial como parametro del useReducer.
    // Is like useState, using 'destructuring' it get an State and function to change the state, using useReducer's hook, pass the Reducer and initial State as useReducer's parameters. 
    // ===================
    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // FUNCIONES / FUNCTIONS
    // ==== Nota/Note ===
    // El Dispatch conecta con el Reducer donde se ejecutan las funciones.
    // Dispatch connect to Reducer where it runs the functions.
    const mostrarAlertaFn = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })
        // Despues de 3s ocular alerta
        // After 3s hide alert
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }
    
    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlertaFn
            }}
        >
            {/* Para que los datos se puedan pasar por los todos los componentes hijos que tenga el Provider.  */}
            {/* For data may be able to pass through all the childrens components inside the Provider. */}
            {props.children}
        </alertaContext.Provider>
    );
}

export default AlertaState;