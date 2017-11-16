import * as R from 'ramda';

export const filterByPropEqualTo = R.curry(
    (lens, value) => R.filter(
      x => R.view(lens, x) === value
    )
  );

export const sortPostsByPropDesc = prop => R.sort(R.descend(R.prop(prop)));

export const sortPostsByVoteScore = sortPostsByPropDesc('voteScore');

export const countByProp = lens => R.pipe(
  R.map(R.view(lens)),
  R.countBy(R.identity),
);

export const filterByCategoryThenSortByVoteScore = propValue => R.pipe(
  filterByPropEqualTo(R.lensProp('category'))(propValue),
  sortPostsByPropDesc('voteScore'),
);

export const countCommentsPerPostId = comments => countByProp(R.lensProp('parentId'))(comments);

export const setNumCommentsForPosts = commentsCount => R.map(
  post => R.ifElse(post => R.has(post.id, commentsCount),
    R.set(R.lensProp('numComments'), commentsCount[post.id]),
    R.identity
  )(post)
);