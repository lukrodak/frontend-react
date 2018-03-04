import {url} from './config';
import axios from 'axios';
import _ from 'lodash';
import {
    ADD_ROW,
    REMOVE_ROW,
    UPDATE_FIELD,
    SAVE_DATA,
    ADD_VALIDATED,
    REMOVE_VALIDATED,
    ENABLE_FIELD,
    DISABLE_FIELD,
    MIGRATE_DATA,
    REMOVE_LAST,
    ADD_DATA_FAIL
} from './types';


export function addRow() {
    const _id = Math.floor((Math.random() * 10000) + 1);
    return {
        type: ADD_ROW,
        payload: {
            _id,
            items: {
                partNumber: '',
                totalChecked: '',
                fromThisOk: 0,
                reworked: '',
                nok: '',
                totalOk: 0,
                remarks: '',
            }
        }
    };
}

export function removeRow() {
    return {
        type: REMOVE_ROW
    }
}

export function updateField(field, val) {
    const key = _.keys(field)[0];
    return {
        type: UPDATE_FIELD,
        payload: {
            key,
            field,
            val
        }
    }
}

export function addValidated(_id) {
    return {
        type: ADD_VALIDATED,
        payload: _id
    };
}

export function removeValidated(_id) {
    return {
        type: REMOVE_VALIDATED,
        payload: _id
    };
}

export function removeLast(id) {
    return {
        type: REMOVE_LAST,
        payload: id
    }
}

export function saveToDB(newData) {
    if (newData.length === 0) {
        return {
            type: DISABLE_FIELD,
            payload: true
        }
    } else {
        const tab = [];
        for (let i = 0; i < newData.length; i++) {
            tab.push(newData[i].items);
        }
        return (dispatch) => {
            dispatch({type: DISABLE_FIELD, payload: true});
            saveData(tab, dispatch);
        };
    }
}

const saveData = (tab, dispatch) => {
    axios.post(url, tab).then((response) => {
        console.log(response.status);
        if (response.status === 200) {
            dispatch({type: MIGRATE_DATA, payload: response.data});
            dispatch({type: SAVE_DATA});
        }
    }).catch((error) => {
        dispatch({type: ADD_DATA_FAIL});
    });
};

export function enableField() {
    return {
        type: ENABLE_FIELD,
        payload: false
    };
}

export function disableField() {
    return {
        type: DISABLE_FIELD,
        payload: true
    };
}