import { connect } from 'react-redux';
import HomePage from '../pages/home.page';
import Actions from '../actions';
import { 
  filterByCategoryThenSortByVoteScore, 
  sortPostsByPropDesc, 
  countCommentsPerPostId, 
  setNumCommentsForPosts 
} from '../utils';

const mapStateToProps = (state, ownProps) => {
  const { categories, posts, comments, sortBy } = state;
  const { category } = ownProps.match.params;

  const filteredPosts = category ? 
    filterByCategoryThenSortByVoteScore(category)(posts) : 
    sortPostsByPropDesc(sortBy)(posts);
  
  const numCommentsPerPostId = countCommentsPerPostId(comments);
  
  return {
    categories,
    posts: setNumCommentsForPosts(numCommentsPerPostId)(filteredPosts),
    sortOptionSelected: sortBy || 'voteScore',
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostUpvote: (id) => dispatch(Actions.Post.upvote(id)),
  onPostDownvote: (id) => dispatch(Actions.Post.downvote(id)),
  onSortChange: (sortBy) => dispatch(Actions.Sort.change(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);