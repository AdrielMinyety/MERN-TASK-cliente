import React from 'react';
import Sidebar from '../layout/Sidebar';
import BarraHeader from '../layout/BarraHeader';
import FormTareas from '../tareas/FormTareas';
import ListadoTareas from '../tareas/ListadoTareas';

// Context --
// import AuthContext from "../../context/auth/authContext";

export default function MisProyectos() {

    // ESCRIBIR ESTE CODIGO DONDE QUIERAS TENER LA INFO DISPONIBLE
    // // extraer datos del context
    // // extract data from context
    // const authcontext = useContext(AuthContext);
    // const { ObtenerUsuarioAutenticadoFn } = authcontext;

    // useEffect(() => {
    //     ObtenerUsuarioAutenticadoFn();
    //     // eslint-disable-next-line
    // }, [])

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <BarraHeader />
                <main>
                    <FormTareas />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    )
}
