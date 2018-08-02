import * as React from 'react';
import { connect } from 'react-redux';
import { Book } from '../types';

interface BookDetailProps {
  book: Book;
}

class BookDetail extends React.Component<BookDetailProps> {
  public render() {
    if(!this.props.book) {
      return <div>Select a book to get started</div>;
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    book: state.activeBook,
  };
}

export default connect(mapStateToProps)(BookDetail);