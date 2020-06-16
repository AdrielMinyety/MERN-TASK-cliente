import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';

// Context --
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareasContext from '../../context/tareas/tareasContext';

// react transition group
// import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function ListadoTareas() {

    // Obtener el state global mediante context
    // Get global State through context
    const proyectoStateContext = useContext(proyectoContext);
    const tareasStateContext = useContext(tareasContext);
    // Extraer los datos pasados por el Context
    // Get the data passed through the Context
    const { proyectoActual, eliminarProyectoFn } = proyectoStateContext;
    const { tareasProyecto } = tareasStateContext;

    // ver si hay un proyecto selecionado
    // see if there is a proyect selected
    if(proyectoActual === null ) return null;

    // Destructuring a los datos de proyectoActual 
    // Destructuring to the proyectoActual's data
    const { nombre, _id } = proyectoActual;

    const handleClickEliminar = () => {
        if(window.confirm('¿Seguro que quieres eliminar este proyecto?'))
        eliminarProyectoFn(_id);
    }

    return (
        <Fragment>
            <h2 className="color3 mb-5">
                Proyecto: <span>{nombre} <i className="fas fa-tasks"></i></span>
            </h2>

            <ul className="listado-tareas overflow-auto pr-3" style={{height: '30vh'}}>
                { tareasProyecto === null || tareasProyecto.length === 0 
                ? (<p className="font-weight-bold text-muted text-center bg-light">No hay tareas</p>)
                : 
                    tareasProyecto.map(tarea => (
                        <Tarea 
                            key={tarea._id}
                            tarea={tarea}
                        />
                    ))
                    // <TransitionGroup>
                    //     {tareasProyecto.map(tarea => (
                    //         <CSSTransition
                    //             key={tarea._id}
                    //             timeout={400}
                    //             classNames="tarea"
                    //         >
                    //             <Tarea
                    //                 tarea={tarea}
                    //             />
                    //         </CSSTransition>
                    //     ))}
                    // </TransitionGroup>
                }
            </ul>

            <button 
                onClick={handleClickEliminar}
                className="btn btn-eliminar btn-primario btn-block">Eliminar proyecto <i className="fas fa-trash"></i></button>
        </Fragment>
    )
}
