export const CHANGE_THEME = 'CHANGE_THEME';

export interface ChangeThemeAction {
    type: typeof CHANGE_THEME,
    path: string // payload
}

export interface ThemeState {
    path: string
}

/**
 * Change current theme path
 */
export function changeTheme(path: string): ChangeThemeAction {
    return { type: CHANGE_THEME, path };
}
