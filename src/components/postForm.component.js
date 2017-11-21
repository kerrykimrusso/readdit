import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'semantic-ui-react';
import serialize from 'form-serialize';

class PostFormComponent extends Component {
  static propTypes = {
    header: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
    trigger: PropTypes.element.isRequired,
  };

  static defaultProps = {
    header: 'Write a Post',
    title: '',
    body: '',
    author: '',
    category: '',
  }

  categorySelectValue = this.props.category;

  onCategorySelectChanged = (e, data) => {
    this.categorySelectValue = data.value;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: this.props.id,
      ...serialize(e.target, {hash: true}),
      category: this.categorySelectValue,
    };
    this.props.onSubmit(newPost);
  };

  render() {
    const {
      header,
      author,
      title,
      body,
      trigger, 
      category,
      categories,
    } = this.props;

    return (
      // <Modal dimmer='blurring' trigger={trigger}>
      <Modal trigger={trigger}>
        <Modal.Header>
          {header}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input required readOnly={author.length > 0} label='Author' name='author' placeholder='Who are you?' defaultValue={author}/>
            <Form.Input required label='Title' name='title' placeholder='Something clickbaity' defaultValue={title}/>
            <Form.Select required label='Category' options={categories} defaultValue={category} placeholder='Category' onChange={this.onCategorySelectChanged}>
            </Form.Select>
            <Form.TextArea required label='So...' name='body' placeholder='What do you need the whole world to know?' defaultValue={body}/>
            <Form.Button primary>Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default PostFormComponent;