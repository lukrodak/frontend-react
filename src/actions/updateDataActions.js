import _ from 'lodash';
import {
    UPDATE_OLD_FIELD,
    ADD_OLD_VALIDATED,
    REMOVE_OLD_VALIDATED
} from './types';


export function updateOldField(field, val) {
    const key = _.keys(field)[0];
    return {
        type: UPDATE_OLD_FIELD,
        payload: {
            key,
            field,
            val
        }
    }
}

export function addOldValidated(_id) {
    return {
        type: ADD_OLD_VALIDATED,
        payload: _id
    }
}

export function removeOldValidated(_id) {
    return {
        type: REMOVE_OLD_VALIDATED,
        payload: _id
    }
}