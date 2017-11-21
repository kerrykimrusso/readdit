import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SUIComment } from 'semantic-ui-react';
import Comment from './comment.component';

const CommentsGroupComponent = ({
  children: comments, 
  onUpvote, 
  onDownvote,
}) => (
  <SUIComment.Group>
  {comments.map(comment => (
    <Comment 
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
      onUpvote={() => onUpvote(comment.id)}
      onDownvote={() => onDownvote(comment.id)}
    >
      {comment.children.length > 0 && 
        <CommentsGroupComponent 
          children={comment.children} 
          onUpvote={onUpvote} 
          onDownvote={onDownvote}
        />
      }
    </Comment>
  ))}
  </SUIComment.Group>
);

CommentsGroupComponent.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      parentId: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      voteScore: PropTypes.number,
      deleted: PropTypes.bool,
      parentDeleted: PropTypes.bool,
      children: PropTypes.array,
    }), 
  ).isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

CommentsGroupComponent.defaultProps = {
  children: [],
}

export default CommentsGroupComponent;