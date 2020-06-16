import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

// Context --
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

export default function Login(props) {

    // extraer datos del context
    // extract data from context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlertaFn } = alertaContext;

    const authcontext = useContext(AuthContext);
    const { autenticado, mensaje, iniciarSesionFn } = authcontext;

    // state de login
    // login's state
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    // destructuring a usuario
    // destructuring to usuario
    const { email, password } = usuario;

    // detectar cambios en el formulario y agregarlos al state
    // detect changes in form and add to state
    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if(usuario.email === '' || usuario.password === '') {
            // si uno de los campos está vacío, ocultar btn
            // if one of the parameters is empty, hide btn
            document.querySelector('.btn-dinamico').style.display = "none";
        }else {
            // si todos los campos están llenos, mostrar btn
            // if all the parameter are full, show btn
            document.querySelector('.btn-dinamico').style.display = "block";
        };
    }, [usuario]);

    // Mostrar alertas
    // show alerts
    useEffect(() => {
        if(autenticado) {
            props.history.push('/mis-proyectos');
        }
        if(mensaje) {
            mostrarAlertaFn( `${mensaje.msg}. (${mensaje.value})` , mensaje.categoria );
        }
        // eslint-disable-next-line
    }, [autenticado, mensaje, props.history]);

    // si los datos estan listos, enviar
    // if the data are ready, submit
    const handleSubmit = e => {
        e.preventDefault();

        // validar datos, if estan vacios
        // validate data, if there are empties
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlertaFn('No dejes campos vacíos (Ej: " ").', 'alert-danger');
            return;
        };

        // log in
        iniciarSesionFn({
            email,
            password
        });
    }


    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                {alerta ? 
                    <div className={`alert ${alerta.categoria} alertas`}>
                        {alerta.msg}
                    </div> 
                : null}
                <form onSubmit={handleSubmit}>
                <div className="campo-form">
                        <div className="form-icon">
                            <i className="far fa-envelope"></i>                            
                        </div>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            onChange={handleChange}
                            value={email}
                            placeholder="Tu correo"/>
                    </div>
                    <div className="campo-form">
                        <div className="form-icon">
                            <i className="fas fa-lock"></i>                        </div>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={handleChange}
                            value={password}
                            placeholder="Tu contraseña"/>
                    </div>

                    <input 
                        type="submit"  
                        className="btn btn-dinamico btn-primario btn-block"
                        value="Iniciar Sesión"/>
                </form>

                <p className="enlace-cuenta text-muted">
                    Click 
                    <Link className="mx-2 font-weight-bold" to={'/nueva-cuenta'}>
                        Crear cuenta
                    </Link>
                    si no tienes una.
                </p>
            </div>
        </div>
    )
}
