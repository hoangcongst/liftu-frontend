import { CHANGE_OG_HEADER, ChangeOgHeader, OgHeader } from '../actions/actions';
import { BASE_URL } from '../../components/Common/constants';

export const initialState: OgHeader = {
    title: 'LiftU',
    description: 'Let it fuck them up',
    image: BASE_URL + "/img/logo.png",
    url: "/"
}

const ogHeaderReducer = (state: OgHeader = initialState, action: ChangeOgHeader): OgHeader => {
    switch (action.type) {
        case CHANGE_OG_HEADER:
            return {
                title: action.title,
                description: action.description,
                image: action.image,
                url: action.url
            }
        default:
            return state;
    }
}

export default ogHeaderReducer;