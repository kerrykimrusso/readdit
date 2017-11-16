export const Types = Object.freeze({
    REMOVE: 'comment/REMOVE',
    CREATE: 'comment/CREATE',
    UPDATE: 'comment/UPDATE',
    UPVOTE: 'comment/UPVOTE',
    DOWNVOTE: 'comment/DOWNVOTE',
});

export const create = (id, body, author, parentId) => ({ 
    type: Types.CREATE,
    payload: {
        id, 
        body,
        author,
    }
});

export const update = (id, body) => ({ 
    type: Types.UPDATE,
    payload: {
        id,
        body,
    }
});

export const remove = (id) => ({ 
    type: Types.REMOVE,
    payload: {
        id,
    }
});

export const upvote = (id) => ({
    type: Types.UPVOTE,
    payload: {
        id,
    }
});

export const downvote = (id) => ({
    type: Types.DOWNVOTE,
    payload: {
        id,
    }
});