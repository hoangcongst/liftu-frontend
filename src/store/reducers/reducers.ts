import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer';
import themesReducer from './themes.reducers';
import sessionReducer from './session.reducer';
import ogHeaderReducer from './ogheader.reducers';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    session: sessionReducer,
    ogheader: ogHeaderReducer
});
