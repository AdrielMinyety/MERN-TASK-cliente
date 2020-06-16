import { ELIMINAR_PROYECTO, CREAR_PROYECTO, EDITAR_PROYECTO, PROYECTO_ACTUALIZADO,PROYECTO_SELECCIONADO, MOSTRAR_MENSAJE, OBTENER_PROYECTOS, MOSTRAR_FORMULARIO_PROYECTO, OCULTAR_FORMULARIO_PROYECTO } from "../../types";

export default (state, action) => {
    switch (action.type) {
        // Dependiendo de qué Type se ejecuto, se cambia el state.
        // Depending what Type is fired, the state change.
        case MOSTRAR_FORMULARIO_PROYECTO:
            return {
                ...state,
                newProyectoForm : true,
                mensaje: null
            };
        case OCULTAR_FORMULARIO_PROYECTO:
            return {
                ...state,
                newProyectoForm : false,
                proyectoEditar : false
            }
        case OBTENER_PROYECTOS: 
            return{
                ...state,
                proyectos : action.payload
            };
        case MOSTRAR_MENSAJE: 
            return {
                ...state,
                mensaje: action.payload
            }
        case CREAR_PROYECTO: 
            return {
                ...state,
                proyectos: [action.payload, ...state.proyectos],
                proyectoActual : action.payload,
                newProyectoForm : false
            }
        case EDITAR_PROYECTO:
            return {
                ...state,
                proyectoEditar: action.payload,
                newProyectoForm: true,
                mensaje: null
            }
        case PROYECTO_ACTUALIZADO:
            return {
                ...state,
                newProyectoForm: false,
                proyectoEditar: false
            }
        case PROYECTO_SELECCIONADO:
            return {
                ...state,
                proyectoActual : action.payload,
                newProyectoForm : false,
                mensaje: null
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyectoActual : null,
                newProyectoForm : false,
                proyectoEditar : false,
                mensaje: null
            }
        default:
            return state;
    }
}