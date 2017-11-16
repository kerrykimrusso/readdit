import {connect} from 'react-redux';
import PostPage from '../components/pages/post.page';
import Actions from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { id: selectedPostId } = ownProps.match.params;
  
  const comments = [];
  state.comments.forEach((comment) => {
    if(comment.parentId === selectedPostId) {
      comments.push(comment);
    }
  });

  return {
    post: state.posts.find((post) => post.id === selectedPostId),
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
