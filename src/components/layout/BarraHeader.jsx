import React, { useContext } from 'react';

// Context --
import AuthContext from "../../context/auth/authContext";

export default function BarraHeader() {

    // extraer datos del context
    // extract data from context
    const authcontext = useContext(AuthContext);
    const { usuario, cerrarSesionFn } = authcontext;

    return (
        <header className="app-header sombra">
            <p className="nombre-usuario">
                Hola
                <span className="text-capitalize">
                    {usuario? " "+usuario.nombre : null}
                </span>
            </p>

            <nav className="nav-principal">
                <button className="cerrar-sesion" onClick={() => cerrarSesionFn()}>
                    <span className="d-none d-md-block float-left mr-2">
                        Cerrar Sesión
                    </span>
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </nav>
        </header>
    )
}
