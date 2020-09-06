export const LOGIN = 'hcd/session/login';
export const LOGOUT = 'hcd/session/logout';
export const INFO_USER = 'hcd/session/info_user';
export const UPDATE_USER = 'hcd/session/update_user';
export const UPDATE_TOKEN = 'hcd/session/update_token';
export const RENEW_TOKEN = 'hcd/session/renew_token';
export const SET_REDIRECT_URL = 'hcd/session/redirect';

export const LOGIN_SUCCESS=0
export const LOGIN_FAILED=1

export interface Session {
    token: string,
    user: Object,
    exprired: string,
}

interface LoginAction {
    type: typeof LOGIN,
    exprired: string
}

interface UserInfoAction {
    type: typeof INFO_USER,
    user: Object
}


interface LogoutAction {
    type: typeof LOGOUT,
    logout: Object
}

interface SetRedirectAction {
    type: typeof SET_REDIRECT_URL,
    url: string
}

export type SessionAction = LoginAction | LogoutAction | SetRedirectAction | UserInfoAction

export function loginAction(exprired: string): SessionAction {
    return { type: LOGIN, exprired };
}

export function userInfoAction(user: Object): SessionAction {
    
    console.info('@WTF')
    return { type: INFO_USER, user };
}

export function logoutAction(logout: Object): SessionAction {
    return { type: LOGOUT, logout };
}

//get url of a guest access to site and set to state.redirectUrl
export function setRedirect(url: string) {
    return {
        type: SET_REDIRECT_URL,
        url
    }
}