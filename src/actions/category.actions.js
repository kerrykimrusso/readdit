export const Types = Object.freeze({
    FETCH: 'category/FETCH',
});

export const fetch = (categories) => ({
    type: Types.FETCH,
    payload: {
        categories
    }
});