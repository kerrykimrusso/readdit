export const Types = Object.freeze({
    REMOVE: 'post/REMOVE',
    CREATE: 'post/CREATE',
    UPDATE: 'post/UPDATE',
    UPVOTE: 'post/UPVOTE',
    DOWNVOTE: 'post/DOWNVOTE',
    CLICK_LINK: 'post/CLICK_LINK'
});

export const create = (id, title, body, author, category) => ({ 
    type: Types.CREATE,
    payload: {
        id,
        title, 
        body,
        author,
        category,
    }
});

export const update = (id, title, body) => ({ 
    type: Types.UPDATE,
    payload: {
        id,
        title,
        body,
    }
});

export const remove = (id) => ({ 
    type: Types.REMOVE,
    payload: id,
});

export const upvote = (id) => ({
    type: Types.UPVOTE,
    payload: id,
});

export const downvote = (id) => ({
    type: Types.DOWNVOTE,
    payload: id,
});

export const clickLink = (post) => ({
    type: Types.CLICK_LINK,
    payload: post,
});