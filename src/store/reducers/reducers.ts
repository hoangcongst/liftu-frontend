import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer';
import themesReducer from './themes.reducers';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
});
