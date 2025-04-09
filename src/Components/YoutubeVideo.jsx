import React from "react";



const YoutubeVideo = () => (
    <div className="my-8 px-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Video Section</h2>
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg border">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/AFEZzf9_EHk?si=j4c7sJhRlfWYWM-J"
          title="YouTube video"
          allow="encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
export default YoutubeVideo;
  