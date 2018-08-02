import * as React from 'react';

interface VideoProps {
  video: any;
}

const VideoDetail: React.SFC<VideoProps> = ({video}) => {
  if(!video) {
    return <div>Loading...</div>;
  }

  const videoId: string = video.id.videoId;
  const url: string = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url} />
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;