import {combineReducers} from 'redux';
import dataReducer from './reducer_data';
import saveReducer from './reducer_newData';

const rootReducer = combineReducers({
    data: dataReducer,
    dataToSave: saveReducer
});

export default rootReducer;