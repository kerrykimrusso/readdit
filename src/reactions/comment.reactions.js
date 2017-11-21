import * as CommentActions from '../actions/comment.actions';

const CommentReactions = {
  [CommentActions.Types.CREATE]: (state, payload) => {
    return [
      ...state,
      payload.comment
  ]},

  [CommentActions.Types.UPDATE]: (state, payload) => {
    const {id, body} = payload;
    if(!id && !body) throw new Error(`${CommentActions.Types.UPDATE} reaction requires id and body to not be empty`);

    return state.map(
      (comment) => {
        if(id !== comment.id) return comment;
        return Object.assign({}, comment, {body});
      });
  },

  [CommentActions.Types.REMOVE]: (state, id) => {
    return state.filter((comment) => {
      return id !== comment.id;
    });
  },

  [CommentActions.Types.UPVOTE]: (comments, id) => {
    return comments.map((comment) => {
      if(comment.id !== id) return comment;
      return Object.assign(
        {}, 
        comment, 
        {voteScore: comment.voteScore + 1}
      );
    });
  },

  [CommentActions.Types.DOWNVOTE]: (comments, id) => {
    return comments.map((comment) => {
      if(comment.id !== id) return comment;
      return Object.assign(
        {}, 
        comment, 
        {voteScore: comment.voteScore - 1}
      );
    });
  },
}

export default CommentReactions;