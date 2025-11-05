import React from 'react';

// noo
const VideoPlayer = () => {
  return (
    <div className="w-full h-full mt-5 rounded-md">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/iEpJwprxDdk?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=iEpJwprxDdk&mute=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ minHeight: '280px' }}
        className='rounded-md'
      ></iframe>
    </div>
  );
};

export default VideoPlayer;