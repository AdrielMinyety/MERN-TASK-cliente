import React, { useReducer } from 'react';

// Crear Context y Reducer
// create Context and Reducer
import authContext from './authContext';
import authReducer from './authReducer';

// Crear Types
// Create Types
import { 
    REGISTRO_EXITO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

// AXIOS
import clienteAxios from '../../config/axios';
import authToken from '../../config/authToken';

const AuthState = props => {

    // state inicial
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    // --- Dispatch va a ejecutar los Types, ejecutando las funciones en el Reducer
    // --- Dispath going to run the Types, runing functions in the Reducer

    // ==== Nota/Note ====
    // Es como el useState, haciendo 'destructuring' obtiene un State y una funcion para cambiar el state, usando el hook de useReducer, pasas el Reducer y el State inicial como parametro del useReducer.
    // Is like useState, using 'destructuring' it get an State and function to change the state, using useReducer's hook, pass the Reducer and initial State as useReducer's parameters. 
    // ===================
    const [state, dispatch] = useReducer(authReducer, initialState);

    // funciones
    // ==== Nota/Note ===
    // El Dispatch conecta con el Reducer donde se ejecutan las funciones.
    // Dispatch connect to Reducer where it runs the functions.
    const registrarUsuarioFn = async datos => {
        try {

            // consultar BD
            // request DB
            const respuesta = await clienteAxios.post('api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITO,
                payload: respuesta.data
            });
            
            // get authenticated user
            ObtenerUsuarioAutenticadoFn();

        } catch (error) {
            console.log(error);

            // crear Alerta que sera mostrado
            // create alert to be shown
            const alerta = {
                msg: error.response.data.errores[0].msg,
                categoria: 'alert-danger',
                value: error.response.data.errores[0].value
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // get authenticated user
    const ObtenerUsuarioAutenticadoFn = async () => {
        // obtener token del LS
        // get token from LS
        const token = localStorage.getItem('token');

        if(token) {
            // enviar token al backend por headers
            // send token to backend throu header
            authToken(token);
        }

        try {
            // obtener datos del usuario
            // get user's data
            const respuesta = await clienteAxios.get('/api/auth');

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const iniciarSesionFn = async datos => {
        try {
            // consultar BD
            // request DB
            const respuesta = await clienteAxios.post('api/auth', datos);

            dispatch({
                type: LOGIN_EXITO,
                payload: respuesta.data
            });

            // get authenticated user
            ObtenerUsuarioAutenticadoFn();

        } catch (error) {
            console.log(error);

            // crear Alerta que sera mostrado
            // create alert to be shown
            const alerta = {
                msg: error.response.data.errores[0].msg,
                categoria: 'alert-danger',
                value: error.response.data.errores[0].value
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    // log out
    const cerrarSesionFn = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuarioFn,
                ObtenerUsuarioAutenticadoFn,
                iniciarSesionFn,
                cerrarSesionFn
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}

export default AuthState;