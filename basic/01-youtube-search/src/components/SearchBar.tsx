import * as React from 'react';

interface SearchBarState {
  term: string;
}

interface SearchBarProps {
  onSearchTermChange: (term: string) => void;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = { term: '' };
  }

  public onSearchChange(term: string) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

  public render() {
    const handlerSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      this.onSearchChange(target.value);
    };

    return (
      <div className="search-bar">
        <input type="text"
          value={this.state.term}
          onChange={handlerSearchChange}/>
      </div>
    );
  }
}

export default SearchBar;