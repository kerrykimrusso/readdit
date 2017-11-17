import { combineReducers } from 'redux';
import Actions from '../actions';
import Reactions from '../reactions';

const categoriesReducer = (state = [], action) => {
    switch(action.type) {
        case Actions.Category.Types.FETCH:
            return action.payload.categories;
        default:
            return state;
    }
}

const commentsReducer = (state = [], action) => {
    if(!(action.type in Reactions.Comment)) return state;
    return Reactions.Comment[action.type](state, action.payload);
}

const postsReducer = (state = [], action) => {
    if(!(action.type in Reactions.Post)) return state;
    return Reactions.Post[action.type](state, action.payload);
}

const sortReducer = (state = '', action) => {
    switch(action.type) {
        case Actions.Sort.Types.CHANGE:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    categories: categoriesReducer,
    comments: commentsReducer,
    posts: postsReducer,
    sortBy: sortReducer,
});