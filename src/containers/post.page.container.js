import {connect} from 'react-redux';
import PostPage from '../pages/post.page';
import Actions from '../actions';
import { unflatten } from 'un-flatten-tree';

const mapStateToProps = (state, ownProps) => {
  const { categories, posts, comments } = state;
  const { id: postId } = ownProps.match.params;
  
  const post = posts.find(post => post.id === postId);
  const commentTree = unflatten(
    comments, 
    (node, parent) => node.parentId === parent.id,
    (node, parent) => parent.children.push(node),
    node => Object.assign({}, node, { children: [] }),
  );
  const commentsForPost = commentTree.filter(comment => comment.parentId === postId);

  return {
    categories,
    post,
    comments: commentsForPost
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostUpvote: (id) => dispatch(Actions.Post.upvote(id)),
  onPostDownvote: (id) => dispatch(Actions.Post.downvote(id)),
  onCommentUpvote: (id) => dispatch(Actions.Comment.upvote(id)),
  onCommentDownvote: (id) => dispatch(Actions.Comment.downvote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
