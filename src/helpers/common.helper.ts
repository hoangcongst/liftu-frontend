import _ from 'underscore';
import moment from 'moment';
import swal from "sweetalert";
const CommonHelper = {
  setCookie(name: string, value: any, min?: any) {
    const date = new Date();
    let expires = '';

    if (min) {
      date.setTime(date.getTime() + min * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }

    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },

  setCookieByDate(name: string, value: any, date: Date) {
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },

  getCookie(name: string) {
    const nameEQ = name + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  },

  deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  setToken(token: string, expired: string) {
    return this.setCookieByDate('Access-token', token, new Date(expired));
  },

  getToken() {
    return this.getCookie('Access-token');
  },

  clearToken() {
    return this.deleteCookie('Access-token');
  },

  getTokenHash(token: string) {
    return _.isEmpty(token) ? {} : JSON.parse(atob(token.split('.')[1]));
  },

  sendMessage(message: any, target?: any) {
    (target || window).postMessage(message, '*');
  },

  setPathParams(url: string, params: any) {
    if (params) {
      Object.keys(params).forEach(key => {
        const pathParam = `[${key}]`;
        if (url.includes(pathParam)) {
          url = url.replace(pathParam, params[key]);
          delete params[key];
        }
      });
    }

    return url;
  },

  convertToSlug(str: string) {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      ;
  },

  formatDate(input: string): string {
    return moment(new Date(input)).format('YYYY-MM-DD HH:mm')
  },

  _getErrorRequest(err: any) {
    let msg = '';
    let arrMSg = err.response.data.message.split(',').map((str: any) => str.split(':')).reduce((prev: any, [key, value]: any) => {
      prev[key.trim()] = value.trim();
      return prev;
    }, {});
    for (const index in arrMSg) {
      msg += index.split('.')[2] + ': ' + arrMSg[index] + '\n';
    }
    swal(msg).then(r => console.log(r));
  }
};

export default CommonHelper;
