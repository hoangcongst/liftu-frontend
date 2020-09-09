import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import _ from 'underscore';
import CommonHelper from './common.helper';
import { API_COMMAND } from '../types/api.type';

interface apiCmd {
  method: string;
  url: string;
}

axios.defaults.baseURL = API_COMMAND.BASE_URL
axios.defaults.timeout = 10000;

let $loading: any;
const ApiHelper = {
  request(cmd: apiCmd, params?: any, requestConfig?: any, pathVariable?: any) {
    const token = CommonHelper.getToken();
    if (requestConfig && !requestConfig['content-type']) {
      axios.defaults.headers.common['Content-Type'] = 'application/vnd.hbot.v1+json';
    }

    if (cmd !== API_COMMAND.SIGNIN && token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    $loading = document.getElementById('loading');

    const cmdUrl = CommonHelper.setPathParams(cmd.url, pathVariable);
    const isLoading: boolean = requestConfig && requestConfig.isLoading && $loading !== null;

    if (isLoading && $loading) {
      $loading.style.display = 'block';
      delete requestConfig.isLoading;
    }

    return new Observable((observer: any) => {
      this._getMethod(cmd.method, cmdUrl, params, requestConfig)
        .then((response: any) => {
          if (response && response.headers && response.headers.authorization) {
            CommonHelper.setToken(response.headers.authorization, "");
          }

          isLoading && this._hideLoading();
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          isLoading && this._hideLoading();
          if (error.response) {
            this._checkExpired(error.response);
            if (!error.response.status || (error.response.status && error.response.status !== 500)) {
              observer.error(error);
            }

            if (error.response.status === 500 && cmd === API_COMMAND.HEALTH) {
              observer.error(error);
            }
          } else {
            observer.error(error);
          }
        });
    });
  },

  _checkExpired(response: any) {
    const { status, message } = response;
    let errorCode: string = 'serverError';

    if (_.isEmpty(response)) {
      return errorCode;
    }

    if (status === 401) {
      return message
    }

    return errorCode;
  },

  _hideLoading() {
    if ($loading !== null) {
      $loading.style.display = 'none';
    }
  },

  _getMethod(method: string, url: string, params?: any, config?: any): Promise<AxiosResponse> {
    if (method === 'POST') {
      return axios.post(url, params, config);
    } else if (method === 'PUT') {
      return axios.put(url, params, config);
    } else if (method === 'PATCH') {
      return axios.patch(url, params, config);
    } else if (method === 'DELETE') {
      return axios.delete(url, { params, ...config });
    } else if (method === 'OPTIONS') {
      return axios.request({
        url: url,
        method: method,
        data: params
      });
    }

    return axios.get(url, { params, ...config });
  }
};

export default ApiHelper;
