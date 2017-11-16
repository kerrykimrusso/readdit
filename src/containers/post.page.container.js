import {connect} from 'react-redux';
import PostPage from '../pages/post.page';
import Actions from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { categories, posts, comments } = state;
  const { id: postId } = ownProps.match.params;
  
  const curPostComments = [];
  comments.forEach((comment) => {
    if(comment.parentId === postId) {
      curPostComments.push(comment);
    }
  });

  const curPost = posts.find(post => post.id === postId);
  curPost.numComments = curPostComments.length;

  return {
    categories,
    post: curPost,
    comments
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostUpvote: (id) => dispatch(Actions.Post.upvote(id)),
  onPostDownvote: (id) => dispatch(Actions.Post.downvote(id)),
  onCommentUpvote: (id) => dispatch(Actions.Comment.upvote(id)),
  onCommentDownvote: (id) => dispatch(Actions.Comment.downvote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
