export const API_COMMAND = {
    BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:8090' : 'https://liftu-api.herokuapp.com',
    HEALTH: { method: 'GET', url: '/health' },

    SIGNIN:  { method: 'POST', url: '/auth/login' },
    SIGNOUT: { method: 'POST', url: '/signout' },
    REGISTER: { method: 'POST', url: '/auth/register' },


    POST_INDEX:  { method: 'GET',  url: '/posts' },
    POST_SHOW:   { method: 'GET',  url: '/posts/[postId]' },
    POST_CREATE: { method: 'POST', url: '/posts' },
    EDIT_POST:   { method: 'PUT', url: '/posts/[postId]' },

    COMMENT_INDEX:  { method: 'GET',  url: '/comments' },
    COMMENT_CREATE:  { method: 'POST',  url: '/comments' },
    COMMENT_UPDATE:  { method: 'PUT',  url: '/comments/[commentId]' },
    COMMENT_DELETE:  { method: 'DELETE',  url: '/comments/[commentId]' },

    STORAGE_CREATE:  { method: 'POST',  url: '/storage' },
}