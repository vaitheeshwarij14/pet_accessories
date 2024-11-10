// src/components/VideoBackground.js

import React from 'react';
import './VideoBackground.css'; // Add your video background styles here

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="D:\3yr\academic\Mini_project_hr\ordering\ordering_V2\pet_accessories\frontend\src\Components\Background\vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
