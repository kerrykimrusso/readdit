import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import BasePage from './base.page';
import Post from '../components/PostComponent';

export default class HomePage extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }),).isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired, 
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired, 
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        numComments: PropTypes.number,
      })).isRequired,
    onPostUpvote: PropTypes.func.isRequired,
    onPostDownvote: PropTypes.func.isRequired,
  }

  static defaultProps = {
    categories: [],
    posts: [],
  }

  render() {
    const { 
      categories,
      posts,
      onPostUpvote,
      onPostDownvote,
    } = this.props;

    return (
      <BasePage categories={categories}>
        <Item.Group>
        {posts.map((post) => (
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
          />
        ))}
        </Item.Group>
      </BasePage>
    )
  }
}
