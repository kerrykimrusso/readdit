import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Button, Icon } from 'semantic-ui-react';
import { printDateOfPost } from '../utils';

const CommentComponent = ({
  id,
  parentId,
  timestamp,
  body,
  author,
  voteScore,	
  deleted,
  parentDeleted,
  onUpvote,
  onDownvote,
  children,
}) => (
  <Comment>
    <Comment.Avatar size='tiny'>
      <Button.Group vertical floated='right' size='mini'>
        <Button compact positive circular onClick={() => onUpvote(id)}>
          <Button.Content>
            <Icon fitted name='thumbs up'/>
          </Button.Content>
        </Button>
        <Button compact basic>
          <Button.Content>
            {voteScore}
          </Button.Content>
        </Button>
        <Button compact negative circular onClick={() => onDownvote(id)}>
          <Button.Content>
            <Icon fitted name='thumbs down'/>
          </Button.Content>
        </Button>
      </Button.Group>
    </Comment.Avatar>
    <Comment.Content>
      <Comment.Author as='span'>
        {author}
      </Comment.Author>
      <Comment.Metadata>
        <div>{printDateOfPost(timestamp, 6)}</div>
      </Comment.Metadata>
      <Comment.Text>
        {body}
      </Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
        <Comment.Action>Edit</Comment.Action>
        <Comment.Action>Delete</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
    {children}
  </Comment>

);

CommentComponent.propTypes = {
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number,
  deleted: PropTypes.bool,
  parentDeleted: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
}

CommentComponent.defaultProps = {
  voteScore: 0,
  deleted: false,
  parentDeleted: false,
}

export default CommentComponent;