import React, { useEffect, useContext} from 'react';
import Proyecto from './Proyecto';

// Context --
import proyectoContext from '../../context/proyectos/proyectoContext';

// React Transition Group
// import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function ListadoProyectos() {

    // Obtener el state global mediante context
    // Get global State through context
    const proyectoStateContext = useContext(proyectoContext);
    // Extraer los datos pasados por el Context
    // Get the data passed through the Context
    const { proyectos, obtenerProyectosFn } = proyectoStateContext;

    // Obtener proyectos de la BD
    // Get data from the DB
    useEffect(() => {
        obtenerProyectosFn();
        // eslint-disable-next-line
    }, []);

    return (
        // si no hay proyectos, mostrar mensaje
        proyectos.length === 0 
        ? (
            <p className="text-center text-muted">No tienes proyectos</p>
        )
        : (
            <ul className="listado-proyectos overflow-auto" style={{height: '30vh'}}>
                    {proyectos.map(proyecto => (
                        <Proyecto
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                    ))}

                {/* <TransitionGroup>
                    {proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto.id}
                            timeout={400}
                            classNames="proyecto"
                        >
                            <Proyecto
                                proyecto={proyecto}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup> */}
            </ul>
        )
    )
}
