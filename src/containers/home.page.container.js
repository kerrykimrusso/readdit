import { connect } from 'react-redux';
import HomePage from '../pages/home.page';
import Actions from '../actions';
import { 
  filterByCategoryThenSortByVoteScore, 
  sortPostsByVoteScore, 
  countCommentsPerPostId, 
  setNumCommentsForPosts 
} from '../utils';

const mapStateToProps = (state, ownProps) => {
  const { categories, posts, comments } = state;
  const { category } = ownProps.match.params;

  const filteredPosts = category ? 
    filterByCategoryThenSortByVoteScore(category)(posts) : 
    sortPostsByVoteScore(posts);
  
  const numCommentsPerPostId = countCommentsPerPostId(comments);
  
  return {
    categories,
    posts: setNumCommentsForPosts(numCommentsPerPostId)(filteredPosts),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostUpvote: (id) => dispatch(Actions.Post.upvote(id)),
  onPostDownvote: (id) => dispatch(Actions.Post.downvote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);