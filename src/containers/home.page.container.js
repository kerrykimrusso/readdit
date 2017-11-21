import { connect } from 'react-redux';
import HomePage from '../pages/home.page';
import Actions from '../actions';
import { 
  filterDeleted,
  filterByCategoryThenSortByVoteScore, 
  sortPostsByPropDesc, 
  countCommentsPerPostId, 
  setNumCommentsForPosts 
} from '../utils';

const mapStateToProps = (state, ownProps) => {
  const { categories, posts, comments, sortBy } = state;
  const { category } = ownProps.match.params;


  let filteredPosts = filterDeleted(posts);

  filteredPosts = category ? 
    filterByCategoryThenSortByVoteScore(category)(filteredPosts) : 
    sortPostsByPropDesc(sortBy)(filteredPosts);
  
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
  onPostEdit: (post) => dispatch(Actions.Post.update(post)),
  onPostDelete: (id) => dispatch(Actions.Post.remove(id)),
  onSortChange: (sortBy) => dispatch(Actions.Sort.change(sortBy)),
  onNewPostSubmit: (post) => dispatch(Actions.Post.create(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);