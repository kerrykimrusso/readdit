import React from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import { Button } from 'semantic-ui-react';
import PostForm from '../components/postForm.component';

const mapStateToProps = (state, ownProps) => {
  const categories = state.categories.map(cat => ({
    key: cat.path,
    text: cat.name,
    value: cat.path,
  }));

  return {
    categories,
    trigger: <Button content='New Post' labelPosition='left' icon='write' primary/>,
  }
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (post) => dispatch(Actions.Post.create(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);