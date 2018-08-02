import * as React from 'react';

import BookDetail from '../containers/BookDetail';
import BookList from '../containers/BookList';

class App extends React.Component {
  public render() {
    return (
      <div className="App container">
        <BookList />
        <BookDetail />
      </div>
    );
  }
}

export default App;
