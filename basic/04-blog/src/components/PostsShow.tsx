import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPostById } from '../actions/posts';

interface PostsShowProps {
  fetchPostById: (id: number) => void;
  match: any;
  post: any;
}

class PostsShow extends React.Component<PostsShowProps> {
  public componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPostById(id);
  }

  public render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }: any, ownProps: any) {
  // tslint:disable-next-line:no-console
  console.log(posts);
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPostById})(PostsShow);