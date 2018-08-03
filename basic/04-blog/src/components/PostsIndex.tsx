import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../actions/posts';
import { Error, Post } from '../types';

interface PostsIndexProps {
  fetchAllPosts: () => any;
  posts: {
    data: Post[];
    error: Error;
    loading: boolean;
  };
}

class PostsIndex extends React.Component<PostsIndexProps> {
  public componentDidMount() {
    this.props.fetchAllPosts();
  }

  public renderPosts() {
    return _.map(this.props.posts.data, (post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  public render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts Index</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, {
  fetchAllPosts,
})(PostsIndex);