import * as PostActions from '../actions/post.actions';

const postReactions = {
  [PostActions.Types.CREATE]: (state, post) => [
    ...state,
    post
  ],

  [PostActions.Types.UPDATE]: (state, post) => {
    const {id, body} = post;
    if(!id && !body) throw new Error(`${PostActions.Types.UPDATE} reaction requires id and body to not be empty`);

    return state.map(
      (post) => {
        if(id !== post.id) return post;
        return Object.assign({body}, post);
      });
  },

  [PostActions.Types.REMOVE]: (state, id) => {
    return state.filter((post) => {
      return id !== post.id;
    });
  },

  [PostActions.Types.UPVOTE]: (state, id) => {
    return state.map((post) => {
      if(post.id !== id) return post;
      
      return Object.assign(
        {}, 
        post, 
        {voteScore: post.voteScore + 1}
      );
    });
  },

  [PostActions.Types.DOWNVOTE]: (state, id) => {
    return state.map((post) => {
      if(post.id !== id) return post;

      return Object.assign(
        {}, 
        post, 
        {voteScore: post.voteScore - 1}
      );
    });
  },
}

export default postReactions;