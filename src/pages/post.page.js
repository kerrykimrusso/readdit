import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Item, Divider } from 'semantic-ui-react';
import BasePage from './base.page';
import Post from '../components/post.component';
import CommentsGroup from '../components/commentsGroup.component';
import { Redirect } from 'react-router-dom';

export default class PostPage extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })).isRequired,
    post: PropTypes.shape({
        id: PropTypes.string.isRequired, 
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired, 
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        numComments: PropTypes.number,
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
        children: PropTypes.array.isRequired,
      })).isRequired,
    onPostUpvote: PropTypes.func.isRequired,
    onPostDownvote: PropTypes.func.isRequired,
    onPostEdit: PropTypes.func.isRequired,
    onPostDelete: PropTypes.func.isRequired,
    onCommentUpvote: PropTypes.func.isRequired,
    onCommentDownvote: PropTypes.func.isRequired,
    onNewPostSubmit: PropTypes.func.isRequired,
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
      onPostEdit,
      onPostDelete,
      onCommentUpvote,
      onCommentDownvote,
      onNewPostSubmit,
    } = this.props;

    if(post.deleted) return <Redirect to='/'/>;
    
    return (
      <BasePage 
        categories={categories} 
        category={post.category}
        onNewPostSubmit={onNewPostSubmit}
      >
        <Item.Group>
          <Post 
            key={post.id}
            id={post.id}
            timestamp={post.timestamp}
            title={post.title}
            body={post.body} 
            author={post.author}
            voteScore={post.voteScore}
            category={post.category}
            categories={categories}
            deleted={post.deleted}
            numComments={post.numComments}
            onUpvote={onPostUpvote}
            onDownvote={onPostDownvote}
            onEdit={onPostEdit}
            onDelete={onPostDelete}
            isDetailView
          />
        </Item.Group>
        
        <Divider horizontal>Comments ({comments.length})</Divider>

        <Form reply>
          <Form.TextArea />
          <Button primary content='Add Comment' labelPosition='left' icon='edit'/>
        </Form>

        <CommentsGroup children={comments} onUpvote={onCommentUpvote} onDownvote={onCommentDownvote}/>
      </BasePage>
    )
  }
}