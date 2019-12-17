import * as actionsTypes from './actionsTypes';

export const setToken = (token) => {
    return {
        type: actionsTypes.SET_TOKEN,
        obj: token
    }
}