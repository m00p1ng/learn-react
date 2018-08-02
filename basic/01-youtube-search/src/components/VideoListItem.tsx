import * as React from 'react';

interface VideoListItem {
  video: any;
  onVideoSelect: (video: any) => void;
}

const VideoListItem: React.SFC<VideoListItem> = ({video, onVideoSelect}) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  const handleClick = () => onVideoSelect(video);

  return (
    <li onClick={handleClick} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img src={imageUrl} className="media-object" />
        </div>

        <div className="media-body">
          <div className="media-heading">
            {video.snippet.title}
          </div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;