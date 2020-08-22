import { createAction, handleActions } from 'redux-actions';
// @ts-ignore
import { sessionService } from 'redux-react-session';
import CommonHelper from "../../helpers/common.helper";
import StorageHelper from "../../helpers/storage.helper";

const initialState = StorageHelper.init('session', {
  tokenHash: {}
});

const LOGIN = 'hcd/session/login';
const LOGOUT = 'hcd/session/logout';
const UPDATE_USER = 'hcd/session/update_user';
const UPDATE_TOKEN = 'hcd/session/update_token';
const RENEW_TOKEN = 'hcd/session/renew_token';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const updateUser = createAction(UPDATE_USER);
export const updateToken = createAction(UPDATE_TOKEN, (token: string, userId: number) => ({ token, userId }));
export const renewToken = createAction(RENEW_TOKEN);

const setUserAdvancedData = (userData: any) => {
  userData.isSuperAdmin = ['SYSTEM', 'SUPERVISOR'].indexOf(userData.role) !== -1;
  userData.isAdmin = ['SYSTEM', 'SUPERVISOR', 'MANAGER'].indexOf(userData.role) !== -1;
  userData.isManager = userData.role === 'MANAGER';

  return userData;
};

export default handleActions(
  {
    [LOGIN]: (state, action: any) => {
      const { token, userData, saveId, callback } = action.payload;
      StorageHelper.clear();
      if (saveId) {
        StorageHelper.set('saveId', saveId);
      }

      CommonHelper.setCookie('userId', userData.userId);
      CommonHelper.setToken(token);
      // Promise.all([sessionService.saveSession({ token }), sessionService.saveUser(setUserAdvancedData(userData))])
      //     .then(() => {
      //       if (callback) {
      //         callback();
      //       }
      //     });

      return StorageHelper.save('session', {
        ...state,
        tokenHash: CommonHelper.getTokenHash(token)
      });
    },

    [LOGOUT]: (state, action: any) => {
      sessionService.deleteUser().then(() => {
        sessionService.deleteSession().then(() => {
          const saveId = StorageHelper.get('saveId');

          CommonHelper.clearToken();

          StorageHelper.clear();

          if (saveId) {
            StorageHelper.set('saveId', saveId);
          }

          const { callback } = action.payload;
          if (callback) {
            callback();
          }
        });
      });

      return StorageHelper.save('session', {
        ...state,
        tokenHash: {}
      });
    },

    [UPDATE_USER]: (state, action: any) => {
      sessionService.saveUser(setUserAdvancedData(action.payload));

      return state;
    },

    [UPDATE_TOKEN]: (state, action: any) => {
      const { token, userId } = action.payload;

      CommonHelper.setCookie('userId', userId);
      CommonHelper.setToken(token);
      sessionService.saveSession(token);

      return StorageHelper.save('session', {
        ...state,
        tokenHash: CommonHelper.getTokenHash(token)
      });
    },

    [RENEW_TOKEN]: (state) => {
      const renewDate = new Date();
      renewDate.setHours(renewDate.getHours()+1);

      return StorageHelper.save('session', {
        ...state,
        tokenHash: {
          ...state.tokenHash,
          ...{
            ed: renewDate.toISOString()
          }
        }
      });
    }
  },
  initialState
);
