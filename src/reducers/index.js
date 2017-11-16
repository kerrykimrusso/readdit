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
    if(!(action.type in Reactions.Comments)) return state;
    Reactions.Comments[action.type](state, action.payload);
}

const postsReducer = (state = [], action) => {
    const {id, title, body} = action.payload || {};
    switch(action.type) {
        case Actions.Post.Types.CREATE:
            return [
                ...state,
                action.payload.post
            ];
        case Actions.Post.Types.UPDATE:
            return state.map(
                (post) => {
                    if(post.id !== id) return post;
                    return Object.assign({title, body}, post);
                });
        case Actions.Post.Types.REMOVE:
            return state.filter(
                (post) => {
                    return id !== post.id;
                });
        default:
            return state;
    }
}

export default combineReducers({
    categories: categoriesReducer,
    comments: commentsReducer,
    posts: postsReducer,
});