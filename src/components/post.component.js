import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Item, Label, Button, Icon } from 'semantic-ui-react';
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
  deleted,
  numComments,
  commentsHidden,
  onUpvote,
  onDownvote,
}) => (
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
      {!commentsHidden && 
        <Item.Extra>
          <Link to={`/post/${id}`}>
            <Label>
              <Icon fitted name='comment'/>{numComments}
            </Label>
          </Link>
        </Item.Extra>
      }
    </Item.Content>
  </Item>

);

PostComponent.propTypes = {
  id: PropTypes.string.isRequired, 
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired, 
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
  numComments: PropTypes.number,
  commentsHidden: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
}

PostComponent.defaultProps = {
  numComments: 0,
  commentsHidden: false,
  bodyHidden: false,
}

export default PostComponent;