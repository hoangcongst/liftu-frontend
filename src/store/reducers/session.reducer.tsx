import {
    LOGIN,
    LOGOUT,
    Session,
    SessionAction,
    SET_REDIRECT_URL
} from '../actions/session.actions'
import CommonHelper from "../../helpers/common.helper";

const login = (state: any, action: any) => {
    const { token } = action;
    if (token) {
        CommonHelper.setToken(token);
        return {
            ...state,
        };
    } else return state
}

const logout = (state: any, action: any) => {
    return state
}

const initialState: Session = {
    token: ''
}

const redirectLogin = (state: any, action: any) => {
    const { url } = action;
    return {
        ...state,
        redirectUrl: url,
    };
}


const sessionReducer = (state: Session = initialState, action: SessionAction): any => {
    switch (action.type) {
        case LOGIN:
            return login(state, action)
        case LOGOUT:
            return logout(state, action)
        case SET_REDIRECT_URL:
            return redirectLogin(state, action)
        default:
            return state;
    }
}

export default sessionReducer;


//     [UPDATE_USER]: (state, action: any) => {
//       sessionService.saveUser(setUserAdvancedData(action.payload));
//
//       return state;
//     },
//
//     [UPDATE_TOKEN]: (state, action: any) => {
//       const { token, userId } = action.payload;
//
//       CommonHelper.setCookie('userId', userId);
//       CommonHelper.setToken(token);
//       sessionService.saveSession(token);
//
//       return StorageHelper.save('session', {
//         ...state,
//         tokenHash: CommonHelper.getTokenHash(token)
//       });
//     },
//
//     [RENEW_TOKEN]: (state) => {
//       const renewDate = new Date();
//       renewDate.setHours(renewDate.getHours()+1);
//
//       return StorageHelper.save('session', {
//         ...state,
//         tokenHash: {
//           ...state.tokenHash,
//           ...{
//             ed: renewDate.toISOString()
//           }
//         }
//       });
//     }
//   },
//   initialState
// );
