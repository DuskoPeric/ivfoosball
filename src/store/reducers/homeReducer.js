import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    akcija: null,
    teamOrder: [],
    results: [],
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TABLE:
            return {
                ...state,
                teamOrder: action.obj
            }
        case actionTypes.SET_RESULTS:
            return {
                ...state,
                results: action.res
            }
        default:
            return state;
    }
}

export default homeReducer;