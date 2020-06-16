import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

// context --
import AuthContext from '../../context/auth/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    // extraer datos del context
    // extract data from context
    const authcontext = useContext(AuthContext);
    const { autenticado, cargando, ObtenerUsuarioAutenticadoFn } = authcontext;

    useEffect(() => {
        ObtenerUsuarioAutenticadoFn();
        // eslint-disable-next-line
    }, [])

    return (
        <Route
            // Si no esta autenticado y si no esta cargando, redireccionar
            // If is not authenticated or if is not loading, redirect 
            {...props} render={ props => !autenticado && !cargando ? (
                <Redirect to="/" />
            ): (
                <Component {...props} />
            )}
        />
    );
}

export default RutaPrivada;
