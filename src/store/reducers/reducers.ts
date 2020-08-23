import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer';
import themesReducer from './themes.reducers';
import sessionReducer from './session.reducer';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    session: sessionReducer,
});
