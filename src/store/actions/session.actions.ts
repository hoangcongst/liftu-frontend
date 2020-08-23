export const LOGIN = 'hcd/session/login';
export const LOGOUT = 'hcd/session/logout';
export const UPDATE_USER = 'hcd/session/update_user';
export const UPDATE_TOKEN = 'hcd/session/update_token';
export const RENEW_TOKEN = 'hcd/session/renew_token';

export const LOGIN_SUCCESS=0
export const LOGIN_FAILED=1

export interface Session {
    authenticated: boolean,
    token: string
}

export interface ResponseLogin {
    status: number,
    token?: string
}

interface LoginAction {
    type: typeof LOGIN,
    response: ResponseLogin
}

interface LogoutAction {
    type: typeof LOGOUT,
    name: string
}

export type SessionAction = LoginAction | LogoutAction

export function loginAction(response: ResponseLogin): SessionAction {
    return { type: LOGIN, response };
}

export function logoutAction(name: string): SessionAction {
    return { type: LOGOUT, name };
}