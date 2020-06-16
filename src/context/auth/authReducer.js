import {
    REGISTRO_EXITO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {
    // Dependiendo de qué Type se ejecuto, se cambia el state.
    // Depending what Type is fired, the state change.
    switch (action.type) {
        case REGISTRO_EXITO:
        case LOGIN_EXITO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                autenticado: null,
                usuario: null,
                mensaje: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}