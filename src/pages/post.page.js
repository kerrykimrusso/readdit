import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment, Divider } from 'semantic-ui-react';
import BasePage from './base.page';
import Post from '../components/post.component';
import CommentComp from '../components/comment.component';

export default class PostPage extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),).isRequired,
    post: PropTypes.shape({
        id: PropTypes.string.isRequired, 
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired, 
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        numComments: PropTypes.number.isRequired,
      }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        parentId: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number,
        deleted: PropTypes.bool,
        parentDeleted: PropTypes.bool,
      })).isRequired,
    onPostUpvote: PropTypes.func.isRequired,
    onPostDownvote: PropTypes.func.isRequired,
    onCommentUpvote: PropTypes.func.isRequired,
    onCommentDownvote: PropTypes.func.isRequired,
  }

  static defaultProps = { 
    categories: [],
    comments: [],
  }

  render() {
    const {
      categories, 
      post, 
      comments, 
      onPostUpvote, 
      onPostDownvote,
      onCommentUpvote,
      onCommentDownvote,
    } = this.props;

    return (
      <BasePage categories={categories}>
        <Post 
          key={post.id}
          id={post.id}
          timestamp={post.timestamp}
          title={post.title}
          body={post.body} 
          author={post.author}
          voteScore={post.voteScore}
          category={post.category}
          deleted={post.deleted}
          numComments={post.numComments}
          onUpvote={onPostUpvote}
          onDownvote={onPostDownvote}
          commentsHidden
        />
        
        <Divider horizontal>Comments ({post.numComments})</Divider>

        <Comment.Group>
          {comments.map(comment => (
            <CommentComp 
              key={comment.id}
              id={comment.id}
              parentId={comment.parentId}
              timestamp={comment.timestamp}
              body={comment.body} 
              author={comment.author}
              voteScore={comment.voteScore}
              deleted={comment.deleted}
              parentDeleted={comment.parentDeleted}
              numComments={comment.numComments}
              onUpvote={onCommentUpvote}
              onDownvote={onCommentDownvote}
            />
          ))}
        </Comment.Group>
      </BasePage>
    )
  }
}