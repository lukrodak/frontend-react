import {url} from './config';
import axios from 'axios';
import _ from 'lodash';

import {
    UPDATE_OLD_FIELD,
    ADD_OLD_VALIDATED,
    REMOVE_OLD_VALIDATED,
    DELETE_ONE,
    DELETE_DATA_FAIL,
    SAVE_UPDATED,
    DISABLE_FIELD,
    SAVE_DATA,
    UPDATE_DATA_FAIL
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

export function deleteOne(_id) {
    return (dispatch) => {
        deleteById(_id, dispatch);
    }
}

const deleteById = (_id, dispatch) => {
    axios.delete(`${url}/${_id}`,).then((response) => {
        if (response.status === 200) {
            dispatch({type: DELETE_ONE, payload: _id});
        }
    }).catch((error) => {
        dispatch({
            type: DELETE_DATA_FAIL
        });
    });
};

export function saveUpdatedDataToDB(updatedData) {
    if (updatedData.length === 0) {
        return {
            type: SAVE_UPDATED
        }
    } else {
        return (dispatch) => {
            dispatch({type: SAVE_UPDATED});
            dispatch({type: DISABLE_FIELD, payload: true});
            saveUpdated(updatedData, dispatch);
        }
    }
}

const saveUpdated = (updatedData, dispatch) => {
    axios.patch(url, updatedData).then((response) => {
        if (response.status === 200) {
            dispatch({type: SAVE_DATA});
        }
    }).catch((error) => {
        dispatch({
            type: UPDATE_DATA_FAIL
        });
    });
}