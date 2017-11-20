import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Item, Button, Icon } from 'semantic-ui-react';
import PostForm from '../components/postForm.component';
import { printDateOfPost } from '../utils';

const PostComponent = ({
  id, 
  timestamp,
  title, 
  body, 
  bodyHidden,
  author,
  voteScore,
  category,
  categories,
  deleted,
  numComments,
  isDetailView,
  onUpvote,
  onDownvote,
  onEdit,
  onDelete,
}) => {
  const categoryDropdownOptions = categories.map(cat => ({
    key: cat.path,
    text: cat.name,
    value: cat.path,
  }));

  return (
    <Item>
      <Item.Image size='tiny'>
        <Button.Group vertical floated='right' size='mini'>
          <Button basic compact onClick={() => onUpvote(id)}>
            <Button.Content>
              <Icon fitted name='thumbs up' color='olive' size='large'/>
            </Button.Content>
          </Button>
          <Button compact basic className="voteScore">
            <Button.Content>
              {voteScore}
            </Button.Content>
          </Button>
          <Button basic compact onClick={() => onDownvote(id)}>
            <Button.Content>
              <Icon fitted name='thumbs down' size='large'/>
            </Button.Content>
          </Button>
        </Button.Group>
      </Item.Image>
      <Item.Content>
        <Item.Header>
          <Link to={`${category}/${id}`}>{title}</Link>
        </Item.Header>
        <Item.Meta>
          <span>Submitted {printDateOfPost(timestamp, 6)} by {author} to <Link to={`/${category}`}>{category}</Link></span>
        </Item.Meta>
        {!bodyHidden && 
          <Item.Description>
            {body}
          </Item.Description>
        }
        {!isDetailView && 
          <Item.Extra>
            <Link to={`/post/${id}`}>
              <Button icon='comment' content={numComments}/>
            </Link>
            </Item.Extra>
        }
        {isDetailView && 
          <Item.Extra>
            <PostForm 
              trigger={<Button compact size='mini' icon='write' content='Edit'/>}
              header='Edit Post'
              id={id}
              title={title}
              author={author}
              body={body}
              category={category}
              categories={categoryDropdownOptions}
              onSubmit={onEdit}
            />
            <Button compact size='mini' icon='delete' content='Delete'/>
          </Item.Extra>
        }
        
      </Item.Content>
    </Item>
  )
};

PostComponent.propTypes = {
  id: PropTypes.string.isRequired, 
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired, 
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  deleted: PropTypes.bool.isRequired,
  numComments: PropTypes.number,
  commentsHidden: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
}

PostComponent.defaultProps = {
  numComments: 0,
  isDetailView: false,
  bodyHidden: false,
}

export default PostComponent;