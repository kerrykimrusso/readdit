import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import BasePage from './base.page';
import Post from '../components/post.component';
import Dropdown from '../components/dropdownInline.component';

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
    sortOptions: PropTypes.array,
    sortOptionSelected: PropTypes.string,
    onPostUpvote: PropTypes.func.isRequired,
    onPostDownvote: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    categories: [],
    posts: [],
    sortOptions: [
      {
        key: 'votes',
        text: 'Votes',
        value: 'voteScore',
        content: 'Votes (Highest)',
      },
      {
        key: 'date',
        text: 'Date',
        value: 'timestamp',
        content: 'Date (Newest)',
      },
    ]
  }

  render() {
    const { 
      categories,
      posts,
      sortOptions,
      sortOptionSelected,
      onPostUpvote,
      onPostDownvote,
      onSortChange,
    } = this.props;

    const sortByDefaultIndex = sortOptions.findIndex(option => option.value === sortOptionSelected);

    return (
      <BasePage categories={categories}>
        <Dropdown pretext='Sort By' options={sortOptions} defaultIndex={sortByDefaultIndex} onChange={onSortChange}/>
        <Item.Group>
        {posts.map(post => (
          <Post 
            key={post.id}
            id={post.id}
            timestamp={post.timestamp}
            title={post.title}
            body={post.body}
            bodyHidden
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
