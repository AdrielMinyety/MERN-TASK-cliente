import React, {useContext} from 'react';

// Context --
import proyectoContext from '../../context/proyectos/proyectoContext';

export default function Proyecto({proyecto}) {

    // Obtener el state global mediante context
    // Get global State through context
    const proyectoStateContext = useContext(proyectoContext);
    // Extraer los datos pasados por el Context
    // Get the data passed through the Context
    const { proyectoActualFn, proyectoEditarFn } = proyectoStateContext;

    const handleClick = () => {
        // se le pasa el objeto de proyecto
        // it pass the proyecto's objet
        proyectoActualFn(proyecto);
    }

    const handleClickEdit = () => {
        // seleccionar proyecto
        // select project
        proyectoActualFn(proyecto);
        // actualizar Proyecto
        // update project
        proyectoEditarFn(true);
    }

    return (
        <li className="row m-0">
            <button
                onClick={handleClick}
                type="button"
                className="btn btn-blank col-10 text-left p-3"
            >
            {proyecto.nombre}
            </button>
            <button
                onClick={handleClickEdit}
                type="button"
                className="col-2 p-1 border-0" >
                <i className="fas fa-pencil-alt"></i>
            </button>
        </li>
    )
}
