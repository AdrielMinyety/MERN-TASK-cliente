import clienteAxios from './axios';

const authToken = token => {
    // si hay token
    // if there is token
    if (token) {
        // asignar token al header
        // asign token to header
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // eliminar token del header
        // delete token from header
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default authToken;