import * as React from 'react';

import SearchBar from '../containers/SearchBar';
import WeatherList from '../containers/WeatherList';

class App extends React.Component {
  public render() {
    return (
      <div className="App container">
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}

export default App;
