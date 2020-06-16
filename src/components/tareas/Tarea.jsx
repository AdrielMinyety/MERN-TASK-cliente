import React, {useContext} from 'react';

// Context --
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareasContext';

export default function Tarea({tarea}) {

    // Obtener el state global mediante context
    // Get global State through context
    const proyectoStateContext = useContext(proyectoContext);
    const tareasStateContext = useContext(tareasContext);
    // Extraer los datos pasados por el Context
    // Get the data passed through the Context
    const { proyectoActual } = proyectoStateContext;
    const { actualizarTareaFn, obtenerTareaEditarFn, eliminarTareaFn } = tareasStateContext;

    const handleClickEditar = tarea => {
        obtenerTareaEditarFn(tarea);
    }
    
    const handleClickEliminar = id => {
        // delete task
        eliminarTareaFn(id, proyectoActual._id);
    }

    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;            
        }
        actualizarTareaFn(tarea);
    }
    
    return (
        <li className="tarea sombra">
           <p className="m-0 font-weight-bold text-muted">{tarea.nombre}</p>

           <div className="estado">
                {tarea.estado
                ?
                    (
                        <button
                            type="button"
                            onClick={() => cambiarEstado(tarea)}
                            className="completo"
                        >completo
                        </button>
                    )    
                :
                    (
                        <button
                            type="button"
                            onClick={() => cambiarEstado(tarea)}
                            className="incompleto"
                        >Incompleto
                        </button>
                    )    
                }
           </div>

           <div className="acciones">
                <button
                    onClick={() => handleClickEditar(tarea)}
                    type="button"
                    className="btn btn-primario"
                ><i className="fas fa-pencil-alt"></i></button>

                <button
                    onClick={() => handleClickEliminar(tarea._id)}
                    type="button"
                    className="btn btn-secundario"
                ><i className="fas fa-eraser"></i></button>
           </div>
        </li>
    )
}
