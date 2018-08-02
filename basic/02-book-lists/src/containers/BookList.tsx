import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { selectBook } from '../actions/index';

import { Book } from '../types';

interface BookProps {
  books: Book[];
  selectBook: (book: Book) => void;
}

class BookList extends React.Component<BookProps> {
  public renderList() {
    return this.props.books.map((book: Book) => {
        const handleClick = () => this.props.selectBook(book);

        return (
          <li
            onClick={handleClick}
            key={book.title}
            className="list-group-item">{book.title}</li>
        );
    });
  }

  public render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    books: state.books,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ selectBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);