import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { createPost } from '../actions/posts';

interface PostsNewProps extends InjectedFormProps {
  createPost: (value: any, callback: any) => void;
  history: any;
}

class PostsNew extends React.Component<PostsNewProps> {
  public renderField(field: any) {
    const { meta: { touched, error } } = field;
    const className= `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input} />
          <div className="text-help">
            {touched ? error : ''}
          </div>
      </div>
    );
  }

  public onSubmit(values: any) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  public render() {
    const { handleSubmit } = this.props;
    this.onSubmit = this.onSubmit.bind(this);

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values: any) {
  const errors: any = {};

  if(!values.title) {
    errors.title = "Enter a title!";
  }

  if(!values.categories) {
    errors.categories = "Enter some categories";
  }

  if(!values.content) {
    errors.content = 'Enter some content please';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate,
})(
  connect(null, {createPost})(PostsNew)
);