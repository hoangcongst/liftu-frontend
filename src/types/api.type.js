export const API_COMMAND = {
    HEALTH: { method: 'GET', url: '/health' },

    SIGNIN: { method: 'POST', url: '/login' },
    SIGNOUT: { method: 'POST', url: '/signout' },

    POST_READ: { method: 'GET', url: '/default/posts' },
    POST_CREATE: { method: 'POST', url: '/posts' },
}