import { CHANGE_THEME, ThemeState, ChangeThemeAction } from '../actions/actions';

const initialState: ThemeState = {
    path: ''
}

const themesReducer = (state = initialState, action: ChangeThemeAction): ThemeState => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                path: action.path
            }
        default:
            return state;
    }
}

export default themesReducer;