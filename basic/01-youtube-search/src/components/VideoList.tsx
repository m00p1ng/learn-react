import * as React from 'react';
import VideoListItem from './VideoListItem';

interface VideoListItemProps {
  videos: any[];
  onVideoSelect: (e: any) => void;
}

const VideoList: React.SFC<VideoListItemProps> = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect}
        key={video.etag}
        video={video} />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;
