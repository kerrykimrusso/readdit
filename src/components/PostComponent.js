import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Item, Label, Button, Icon } from 'semantic-ui-react';
import { distanceInWordsToNow } from 'date-fns';

const PostComponent = ({
  id, 
  timestamp,
  title, 
  body, 
  author,
  voteScore,
  category,
  deleted,
  numComments,

  onUpvote,
  onDownvote,
}) => (
  <Item>
    <Item.Image size='tiny'>
      <Button.Group vertical floated='right' size='mini'>
        <Button compact positive circular>
          <Button.Content>
            <Icon fitted name='thumbs up'/>
          </Button.Content>
        </Button>
        <Button compact basic>
          <Button.Content>
            {voteScore}
          </Button.Content>
        </Button>
        <Button compact negative circular>
          <Button.Content>
            <Icon fitted name='thumbs down'/>
          </Button.Content>
        </Button>
      </Button.Group>
    </Item.Image>
    <Item.Content>
      <Item.Header>
        <Link to={`post/${id}`}>{title}</Link>
      </Item.Header>
      <Item.Meta>
        <span>Submitted {distanceInWordsToNow(timestamp, {includeSeconds: true})} ago by {author} to <Link to={`category/${category}`}>{category}</Link></span>
      </Item.Meta>
      <Item.Extra>
        <Label>
          <Link to={`/post/${id}`}>
            <i className="comment icon"></i> {numComments}
          </Link>
        </Label>
      </Item.Extra>
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
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
}

PostComponent.defaultProps = {
  numComments: 0,
}

export default PostComponent;