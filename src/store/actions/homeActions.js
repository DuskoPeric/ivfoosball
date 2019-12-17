import * as actionsTypes from './actionsTypes';

export const setTable = (obj) => {
    return {
        type: actionsTypes.SET_TABLE,
        obj: obj
    }
}
export const setResults = (res) => {
    return {
        type: actionsTypes.SET_RESULTS,
        res: res
    }
}