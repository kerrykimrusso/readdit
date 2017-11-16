import { connect } from 'react-redux';
import HomePage from '../pages/home.page';
import Actions from '../actions';
import * as R from 'ramda';

const mapStateToProps = (state, ownProps) => {
  const { categories, posts, comments } = state;
  const { id } = ownProps.match.params;

  const filterBy = lens => propValue => R.filter(x => R.view(lens, x) === propValue);
  const sortPostsByPropDesc = propName => R.sortBy(R.descend(R.prop(propName)));
  const filterByCategoryThenSortByVoteScore = propValue => R.pipe(
    filterBy(R.lensProp('category'))(propValue),
    sortPostsByPropDesc('voteScore'),
  );

  const postsToDisplay = R.isNil(id) ? 
    sortPostsByPropDesc('voteScore')(posts) :
    filterByCategoryThenSortByVoteScore(id)(posts);

  const countByProp = lens => R.pipe(
    R.map(R.view(lens)),
    R.countBy(R.identity),
  );

  const commentParentIdLens = R.lensProp('parentId');
  
  const numCommentsByPostId = countByProp(commentParentIdLens)(comments);
  
  const setNumCommentsForPosts = R.map(
    x => R.ifElse(y => y.id in numCommentsByPostId,
      R.set(R.lensProp('numComments'), numCommentsByPostId[x.id]),
      R.identity
    )(x)
  );

  return {
    categories,
    posts: setNumCommentsForPosts(postsToDisplay),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostUpvote: (id) => dispatch(Actions.Post.upvote(id)),
  onPostDownvote: (id) => dispatch(Actions.Post.downvote(id)),
  onPostLinkClicked: (post) => dispatch(Actions.Post.clickLink(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);