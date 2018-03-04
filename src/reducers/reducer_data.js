import _ from 'lodash';
import {
    GET_DATA_START,
    GET_DATA_FETCH,
    GET_DATA_FAIL,
    MIGRATE_DATA,
    UPDATE_OLD_FIELD,
    ADD_OLD_VALIDATED,
    REMOVE_OLD_VALIDATED,
    SAVE_UPDATED,
    UPDATE_DATA_FAIL,
    ADD_DATA_FAIL,
    DELETE_DATA_FAIL,
    DELETE_ONE
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    data: [],
    updated: [],
    validatedOld: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DATA_START:
            return {...state, loading: true, data: null};
        case GET_DATA_FETCH:
            return {...state, data: action.payload, loading: false};
        case GET_DATA_FAIL:
            return {...state, error: 'Cannot get data from DB', loading: false};
        case UPDATE_DATA_FAIL:
            return {...state, error: 'Cannot update data', loading: false};
        case ADD_DATA_FAIL:
            return {...state, error: 'Cannot add data', loading: false};
        case DELETE_DATA_FAIL:
            return {...state, error: 'Cannot delete data', loading: false};
        case MIGRATE_DATA:
            return {...state, data: state.data.concat(action.payload)};
        case UPDATE_OLD_FIELD:
            const _id = action.payload.val;
            const keyObj = action.payload.key;
            const valueToSave = action.payload.field[keyObj];
            const index = _.findIndex(state.data, {_id});
            const sth = state.data[index];
            sth[keyObj] = valueToSave;
            if (!(_.find(state.updated, {_id}))) {
                state.updated.push(sth);
            }
            return {...state};
        case ADD_OLD_VALIDATED:
            if (!(_.includes(state.validatedOld, action.payload))) {
                state.validatedOld.push(action.payload);
            }
            return {...state}
        case REMOVE_OLD_VALIDATED:
            const idOld = action.payload;
            let arrayOld = state.validatedOld;
            let indexOld = arrayOld.indexOf(idOld);
            if (indexOld > -1) {
                arrayOld.splice(indexOld, 1);
            }
            return {...state}
        case SAVE_UPDATED:
            return {...state, updated: [], validatedOld: []}
        case DELETE_ONE:
            const id = action.payload;
            _.remove(state.data, {
                _id: id
            });
            return {...state}
        default:
            return state;
    }
}