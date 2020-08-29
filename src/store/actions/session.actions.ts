export const LOGIN = 'hcd/session/login';
export const LOGOUT = 'hcd/session/logout';
export const UPDATE_USER = 'hcd/session/update_user';
export const UPDATE_TOKEN = 'hcd/session/update_token';
export const RENEW_TOKEN = 'hcd/session/renew_token';
export const SET_REDIRECT_URL = 'hcd/session/redirect';

export const LOGIN_SUCCESS=0
export const LOGIN_FAILED=1

export interface Session {
    authenticated: boolean,
    token: string
}

interface LoginAction {
    type: typeof LOGIN,
    token: string
}

interface LogoutAction {
    type: typeof LOGOUT,
    name: string
}

interface SetRedirectAction {
    type: typeof SET_REDIRECT_URL,
    url: string
}

export type SessionAction = LoginAction | LogoutAction | SetRedirectAction

export function loginAction(token: string): SessionAction {
    return { type: LOGIN, token };
}

export function logoutAction(name: string): SessionAction {
    return { type: LOGOUT, name };
}

//get url of a guest access to site and set to state.redirectUrl
export function setRedirect(url: string) {
    return {
        type: SET_REDIRECT_URL,
        url
    }
}