export const API_COMMAND = {
    HEALTH: { method: 'GET', url: '/health' },

    SIGNIN:  { method: 'POST', url: '/login' },
    SIGNOUT: { method: 'POST', url: '/signout' },

    POST_INDEX:  { method: 'GET',  url: '/posts' },
    POST_SHOW:   { method: 'GET',  url: '/posts/[postId]' },
    POST_CREATE: { method: 'POST', url: '/posts' },
    EDIT_POST:   { method: 'PUT', url: '/posts/[postId]' },
}