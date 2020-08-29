export const API_COMMAND = {
    HEALTH: { method: 'GET', url: '/health' },

    SIGNIN: { method: 'POST', url: '/login' },
    SIGNOUT: { method: 'POST', url: '/signout' },

    POST_INDEX: { method: 'GET', url: '/posts' },
    POST_SHOW: { method: 'GET', url: '/default/posts/[postId]' },
    POST_CREATE: { method: 'POST', url: '/posts' },
}