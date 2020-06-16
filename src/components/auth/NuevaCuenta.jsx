import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

// Context --
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

export default function NuevaCuenta(props) {

    // extraer datos del context
    // extract data from context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlertaFn } = alertaContext;

    const authcontext = useContext(AuthContext);
    const { autenticado, mensaje, registrarUsuarioFn } = authcontext;

    // state de NuevaCuenta
    // NuevaCuenta's state
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    // destructuring a usuario
    // destructuring to usuario
    const { nombre, email, password, confirmar } = usuario;

    // detectar cambios en el formulario y agregarlos al state
    // detect changes in form and add to state
    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // mostrar u ocultar btn de envio
    // show or hide submit btn
    useEffect(() => {
        if( usuario.nombre === '' || usuario.email === '' || usuario.password === '' || usuario.confirmar === '') {
            // si uno de los campos está vacío, ocultar btn
            // if one of the parameters is empty, hide btn
            document.querySelector('.btn-dinamico').style.display = "none";

        }else {
            // si todos los campos están llenos, mostrar btn
            // if all the parameter are full, show btn
            document.querySelector('.btn-dinamico').style.display = "block";
        };
    }, [usuario])

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
        
        // Si los campos estan vacios, retornar null
        // If the field are empties, return null
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ) {
            mostrarAlertaFn('No dejes campos vacíos (Ej: " ").', 'alert-danger');
            return;
        };        
        
        // validar que la contraseña sea mas de 8 caracteres
        // validate the password has 8 characters min
        if (password.length < 8) {
            mostrarAlertaFn('Contraseña muy corta.', 'alert-danger');
            return;            
        }

        // validar que las contraseñas sean iguales
        // validate if the passwords are the same
        if (password !== confirmar) {
            mostrarAlertaFn('Las contraseñas no son iguales.', 'alert-danger');
            return;            
        }

        // pasarlo al action
        // pass it to action
        registrarUsuarioFn({
            nombre,
            email,
            password
        })
    }


    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                {alerta ? 
                    <div className={`alert ${alerta.categoria} alertas`}>
                        {alerta.msg}
                    </div> 
                : null}
                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <div className="form-icon">
                            <i className="far fa-user"></i>
                        </div>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre"
                            onChange={handleChange}
                            value={nombre}
                            placeholder="Tu nombre y primer apellido"/>
                    </div>
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
                            <i className="fas fa-unlock-alt"></i>                        </div>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={handleChange}
                            value={password}
                            placeholder="Tu contraseña"/>
                    </div>
                    <div className="campo-form">
                        <div className="form-icon">
                            <i className="fas fa-lock"></i>                        </div>
                        <input 
                            type="password" 
                            name="confirmar" 
                            id="confirmar"
                            onChange={handleChange}
                            value={confirmar}
                            placeholder="Confirma contraseña"/>
                    </div>

                    <input 
                        type="submit"  
                        className="btn-dinamico btn btn-primario btn-block"
                        value="Crear Cuenta"/>
                </form>

                <p className="enlace-cuenta text-muted">
                    Click 
                    <Link className="mx-2 font-weight-bold" to={'/'}>
                        Iniciar Sesión
                    </Link>
                    si ya tienes una.
                </p>
            </div>
        </div>
    )
}
