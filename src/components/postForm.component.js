import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'semantic-ui-react';
import serialize from 'form-serialize';

class PostFormComponent extends Component {
  static propTypes = {
    title: PropTypes.string,
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
    title: 'Write a Post',
  }

  categorySelectValue = null;

  onCategorySelectChanged = (e, data) => {
    this.categorySelectValue = data.value;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...serialize(e.target, {has: true}),
      category: this.categorySelectValue,
    };
    this.props.onSubmit(newPost);
  };

  render() {
    const {
      title,
      trigger, 
      categories,
    } = this.props;

    return (
      <Modal dimmer='blurring' trigger={trigger}>
        <Modal.Header>
          {title}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input required label='Author' name='author' placeholder='Who are you?'/>
            <Form.Input required label='Title' name='title' placeholder='Something clickbaity'/>
            <Form.Select required label='Category' options={categories} placeholder='Category' onChange={this.onCategorySelectChanged}>
            </Form.Select>
            <Form.TextArea required label='' name='body' placeholder='What do you need the whole world to know?'/>
            <Form.Button primary>Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default PostFormComponent;