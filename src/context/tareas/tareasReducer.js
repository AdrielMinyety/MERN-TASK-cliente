import { 
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    MOSTRAR_MENSAJE_TAREA,
    ELIMINAR_TAREA,
    EDITAR_TAREA,
    ACTUALIZAR_TAREA
} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case OBTENER_TAREAS:
            return {
                ...state,
                tareasProyecto : action.payload,
            }    
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto : [ action.payload , ...state.tareasProyecto ]
            }
        case MOSTRAR_MENSAJE_TAREA:
            return {
                ...state,
                mensaje : action.payload
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto : state.tareasProyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasProyecto : state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaEditar : null
            }
        case EDITAR_TAREA:
            return {
                ...state,
                tareaEditar : action.payload
            }
        default:
            return state;
    }
}