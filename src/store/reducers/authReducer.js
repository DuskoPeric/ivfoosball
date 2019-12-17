import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    token: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}

export default authReducer;