import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RutaPrivada from './components/rutas/RutaPrivada';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import MisProyectos from './components/proyectos/MisProyectos';

// Context ----
import ProyectoState from './context/proyectos/ProyectoState';
import TareasState from './context/tareas/TareasState';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/auth/AuthState';

// config
import authToken from './config/authToken';

// ver si hay token
// watch if there is token
const token = localStorage.getItem('token');
if (token) {
  // si hay token, enviar al header
  // if there is token, send to header
  authToken(token);
}

function App() {

  return (
    <ProyectoState>
      <TareasState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/mis-proyectos" component={MisProyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareasState>
    </ProyectoState>
  );
}

export default App;
