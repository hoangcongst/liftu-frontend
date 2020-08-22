import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import middlewares from './middlewares/middlewares'

import { SettingState } from './actions/settings.actions';
import { ThemeState } from './actions/themes.actions';

import { updateTheme } from './middlewares/themes.middleware';

import { persistedState, saveState } from './persisted.store';

export interface ApplicationState {
    settings: SettingState,
    theme: ThemeState
}

export default function configureStore() {

    const store = createStore(
        reducers,
        persistedState, // second argument overrides the initial state
        applyMiddleware(
            ...middlewares
        )
    );

    // add a listener that will be invoked on any state change
    store.subscribe(() => {
        saveState(store.getState());
    });

    // Update the initial theme
    updateTheme(store.getState())

    return store;

}