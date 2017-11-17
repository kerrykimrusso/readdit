export const Types = Object.freeze({
  CHANGE: 'sort/CHANGE',
});

export const change = (sortingProperty) => ({
  type: Types.CHANGE,
  payload: sortingProperty
});