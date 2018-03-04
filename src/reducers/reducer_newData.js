import _ from 'lodash';
// import axios from 'axios';
import {
    ADD_ROW,
    REMOVE_ROW,
    UPDATE_FIELD,
    SAVE_DATA,
    ADD_VALIDATED,
    REMOVE_VALIDATED,
    ENABLE_FIELD,
    DISABLE_FIELD,
    REMOVE_LAST
} from '../actions/types';


const INITIAL_STATE = {
    dataToSave: [],
    disabled: true,
    validated: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_ROW:
            return {...state, dataToSave: state.dataToSave.concat(action.payload)}
        case REMOVE_ROW:
            const data = state.dataToSave;
            data.pop();
            return {...state};
        case UPDATE_FIELD:
            const _id = action.payload.val;
            const keyObj = action.payload.key;
            const valueToSave = action.payload.field[keyObj];
            const index = _.findIndex(state.dataToSave, {_id});
            state.dataToSave[index].items[keyObj] = valueToSave;
            return {...state};
        case SAVE_DATA:
            return {...state, dataToSave: [], validated: [], disabled: true}
        case ADD_VALIDATED:
            if (!(_.includes(state.validated, action.payload))) {
                state.validated.push(action.payload);
            }
            return {...state}
        case REMOVE_VALIDATED:
            const idNew = action.payload;
            let arrayNew = state.validated;
            let indexNew = arrayNew.indexOf(idNew);
            if (indexNew > -1) {
                arrayNew.splice(indexNew, 1);
            }
            return {...state}
        case ENABLE_FIELD:
            return {...state, disabled: action.payload}
        case DISABLE_FIELD:
            return {...state, disabled: action.payload}
        case REMOVE_LAST:
            if (state.validated.indexOf(action.payload) !== -1) {
                let index = state.validated.indexOf(action.payload);
                state.validated.splice(index, 1);
            }
            return {...state}
        default:
            return state;
    }
}