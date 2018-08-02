import * as _ from 'lodash';
import * as React from 'react';
// @ts-ignore 
import YTSearch from 'youtube-api-search';
// @ts-ignore
import youtubeAPI from './.config/youtube_api.json';

import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';

interface AppState {
  videos: any[];
  selectedVideo: any;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedVideo: null,
      videos: [],
    };

    YTSearch({ key: youtubeAPI.API_KEY, term: "surfboard" }, (videos: any[]) => {
      this.setState({
        selectedVideo: videos[0],
        videos,
      });
    });
  }

  public videoSearch(term: string) {
    YTSearch({key: youtubeAPI.API_KEY, term}, (videos: any[]) => {
      this.setState({
        selectedVideo: videos[0],
        videos,
      });
    });
  }

  public render() {
    const videoSearch = _.debounce((term: string) => this.videoSearch(term), 300);

    const handleVideoSelect = (selectedVideo: any) => this.setState({selectedVideo});

    return (
      <div className="App">
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={handleVideoSelect}
          videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
