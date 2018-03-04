import {url} from './config';
import axios from 'axios';
import {
    GET_DATA_START,
    GET_DATA_FETCH,
    GET_DATA_FAIL
} from './types';

export function getDataFromDB() {
    return (dispatch) => {
        dispatch({type: GET_DATA_START});
        getDataFetch(dispatch);
    };
}

const getDataFetch = (dispatch) => {
    // const url = url;
    axios.get(url).then((response) => {
        dispatch({
            type: GET_DATA_FETCH,
            payload: response.data.data
        });
    }).catch((error) => {
        dispatch({
            type: GET_DATA_FAIL,
            payload: error.message
        })
    });
}