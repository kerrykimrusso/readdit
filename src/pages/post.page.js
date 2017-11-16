import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../layouts/default.layout';
import Nav from '../organisms/Nav';
import ElementWithHeader from '../cells/ElementWithHeader';
import ListWithStat from '../cells/ListWithStat';
import Post from '../cells/Post';
import Comment from '../cells/Comment';

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
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired, 
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        numComments: PropTypes.number.isRequired,
      })).isRequired,

    onPostUpvote: PropTypes.func.isRequired,
    onPostDownvote: PropTypes.func.isRequired,
    onCommentUpvote: PropTypes.func.isRequired,
    onCommentDownvote: PropTypes.func.isRequired,
  }

  static defaultProps ={
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

    const nav = <Nav categories={categories}/>;

    const body =
      <section> 
        <article>
          <Post 
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
          />
        </article>
        <aside className='ui items'>
          <h3 className="ui dividing header">Comments</h3>
          {comments.map((comment) => (
            <Comment 
              key={comment.id}
              id={comment.id}
              timestamp={comment.timestamp}
              title={comment.title}
              body={comment.body} 
              author={comment.author}
              voteScore={comment.voteScore}
              category={comment.category}
              deleted={comment.deleted}
              numComments={comment.numComments}
              onUpvote={onCommentUpvote}
              onDownvote={onCommentDownvote}
            />
          ))}
        </aside>
      </section>;

    const categoryListWithPostCount = <ListWithStat className="ui list"
      items={categories} 
      itemClassNames='ui label'
      itemKeyPropertyName={'name'}
      itemDisplayNamePropertyName={'name'}
      itemStatPropertyName={'numPosts'}
      />
    const footer1 = <ElementWithHeader headerText='Top Categories' element={categoryListWithPostCount}/>;
    const footer2 = <ElementWithHeader headerText='Top Posts' element={null}/>;
    const footer3 = <ElementWithHeader headerText='About' element={null}/>;

    return (
      <DefaultLayout 
        nav={nav}
        body={body}
        footer1={footer1}
        footer2={footer2}
        footer3={footer3}
      />
    )
  }
}
