import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

export default (state, action) => {
    // Dependiendo de qué Type se ejecuto, se cambia el state.
    // Depending what Type is fired, the state change.
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }
        default:
            return state;
    }
}